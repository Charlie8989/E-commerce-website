import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import razorpay from "razorpay";
import crypto from "crypto";

//global variables
const currency = "inr";
const delivery_fee = 10;
const couponDiscountPercent = 20;

//gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayKeyId =
  process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_TEST_KEY_ID;
const razorpayKeySecret =
  process.env.RAZORPAY_KEY_SECRET ||
  process.env.RAZORPAY_SECRET_KEY ||
  process.env.RAZORPAY_TEST_KEY_SECRET;

const razorpayInstance = new razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret,
});

const calculateOrderPricing = async (userId, items, couponCode) => {
  const subtotal = items.reduce(
    (total, item) => total + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );
  let discount = 0;
  let coupon = null;

  if (couponCode) {
    const user = await userModel.findById(userId).select("coupons");
    coupon = user?.coupons?.find(
      (item) =>
        item.code === couponCode && new Date(item.expiresAt) > new Date()
    );

    if (!coupon) {
      throw new Error("Coupon is invalid or expired");
    }

    discount = Math.round((subtotal * couponDiscountPercent) / 100);
  }

  return {
    amount: subtotal === 0 ? 0 : subtotal - discount + delivery_fee,
    coupon: coupon
      ? {
          code: coupon.code,
          discount,
          discountPercent: couponDiscountPercent,
        }
      : null,
  };
};

const removeUsedCoupon = async (userId, couponCode) => {
  if (!couponCode) return;
  await userModel.findByIdAndUpdate(userId, {
    $pull: { coupons: { code: couponCode } },
  });
};

const placeOrder = async (req, res) => {
  try {
    const { userId, items, address, couponCode } = req.body;
    const pricing = await calculateOrderPricing(userId, items, couponCode);
    const orderData = {
      userId,
      items,
      amount: pricing.amount,
      coupon: pricing.coupon,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
      address,
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    await removeUsedCoupon(userId, pricing.coupon?.code);

    res.json({
      success: true,
      message: "Order Placed",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address, couponCode } = req.body;
    const { origin } = req.headers;
    const pricing = await calculateOrderPricing(userId, items, couponCode);

    const orderData = {
      userId,
      items,
      amount: pricing.amount,
      coupon: pricing.coupon,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
      address,
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: delivery_fee * 100,
      },
      quantity: 1,
    });

    const stripeCoupon = pricing.coupon
      ? await stripe.coupons.create({
          amount_off: pricing.coupon.discount * 100,
          currency,
          duration: "once",
          name: pricing.coupon.code,
        })
      : null;

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      discounts: stripeCoupon ? [{ coupon: stripeCoupon.id }] : undefined,
      mode: "payment",
    });

    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      const order = await orderModel.findByIdAndUpdate(
        orderId,
        { payment: true },
        { new: true }
      );
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      await removeUsedCoupon(userId, order?.coupon?.code);
      res.json({
        success: true,
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const placeOrderRazorPay = async (req, res) => {
  try {
    const { userId, items, address, couponCode } = req.body;

    if (!razorpayKeyId || !razorpayKeySecret) {
      return res.json({
        success: false,
        message: "Razorpay keys are not configured on the server",
      });
    }

    const pricing = await calculateOrderPricing(userId, items, couponCode);

    const orderData = {
      userId,
      items,
      amount: pricing.amount,
      coupon: pricing.coupon,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
      address,
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
      amount: pricing.amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };
    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({
          success: false,
          message: error,
        });
      }
      res.json({
        success: true,
        order,
        key_id: razorpayKeyId,
      });
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const {
      userId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const expectedSignature = crypto
      .createHmac("sha256", razorpayKeySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.json({
        success: false,
        message: "Payment signature verification failed",
      });
    }

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    const order = await orderModel.findByIdAndUpdate(
      orderInfo.receipt,
      { payment: true },
      { new: true }
    );
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    await removeUsedCoupon(userId, order?.coupon?.code);

    res.json({
      success: true,
      message: "Payment Successful",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//All Order Data For Admin
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//All Order Data For User
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { userId, orderId } = req.body;

    const order = await orderModel.findOne({ _id: orderId, userId });

    if (!order) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.status === "Cancelled") {
      return res.json({
        success: false,
        message: "Order is already cancelled",
      });
    }

    if (!["Order placed", "Processing"].includes(order.status)) {
      return res.json({
        success: false,
        message: "This order can no longer be cancelled",
      });
    }

    await orderModel.findByIdAndUpdate(orderId, { status: "Cancelled" });

    res.json({
      success: true,
      message: "Order cancelled",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({
      success: true,
      message: "Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  placeOrder,
  placeOrderRazorPay,
  placeOrderStripe,
  updateStatus,
  allOrders,
  userOrders,
  cancelOrder,
  verifyStripe,
  verifyRazorpay,
};
