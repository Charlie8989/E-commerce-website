import { transporter } from "../config/EmailConfig.js";
import { nanoid } from "nanoid";
import userModel from "../models/userModel.js";

const nanocode = nanoid(5).toUpperCase();
const discountCode = `TRENDORA-${nanocode}`;
// console.log("Discount Code :", discountCode);

export const sendDiscountEmail = async (req, res) => {
  const { email } = req.body;
  // console.log("email func called",email)
  try {
    const user = await userModel.findOne({ email: email });
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    if (user) {
      user.coupons.push({ code: discountCode, expiresAt });
      await user.save();
    }

    const info = await transporter.sendMail({
      from: '"Trendora :" <trendora.charlie@gmail.com>',
      to: email,
      subject: "Your Exclusive Trendora Discount Code",
      html: `
 <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F8F3D9; padding: 20px 0; text-align: center;">
  <div style="max-width: 600px; background: #ffffff; margin: auto; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); overflow: hidden;">
    
    <!-- Header -->
    <div style="background-color: #504B38; padding: 20px;">
      <h1 style="color: #F8F3D9; margin: 0; font-size: 24px; line-height: 1.3;">Thank You for Shopping with Trendora!</h1>
    </div>
    
    <!-- Body -->
    <div style="padding: 20px;">
      <p style="font-size: 16px; color: #504B38; margin-bottom: 15px;">
        We're thrilled to have you as part of the <strong>Trendora family</strong> ✨
      </p>
      <p style="font-size: 16px; color: #504B38; margin-bottom: 15px;">
        Here’s a special <strong>exclusive discount code</strong> just for you:
      </p>

      <!-- Discount Code -->
      <div style="margin: 20px 0; text-align: center;">
  <span style="font-size: 22px; font-weight: bold; background-color: #F8F3D9; color: #504b38; padding: 12px 25px; border-radius: 8px; letter-spacing: 2px; display: inline-block; border: 2px dashed #504B38;">
    ${discountCode}
  </span>
</div>

      <p style="font-size: 15px; color: #504B38; margin-bottom: 20px;">
        Apply this code at checkout to enjoy your special discount on your next purchase.
      </p>

      <!-- CTA Button -->
      <a href="https://trendora-by-charlie.vercel.app" 
         style="display: inline-block; margin-top: 15px; background-color: #504B38; color: #F8F3D9; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: bold; font-size: 16px;">
        Shop Now 
      </a>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

      <p style="font-size: 13px; color: #777;">
        This offer is valid for a limited time only. Don’t miss out!
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #F0F0F0; padding: 15px;">
      <p style="font-size: 12px; color: #504B38; margin: 0;">
        Code By CHARLIE ❤️
      </p>
    </div>
  </div>
</div>

`,
    });

    res.status(200).json({ message: "Email sent successfully", info });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ message: "Failed to send email", error });
  }
};

//logic to see the code is expired or not import { createSelector } from 'reselect'

// const coupon = user.coupons.find(c => c.code === enteredCode);
// if (!coupon) {
//   return "Invalid code";
// }
// if (new Date() > new Date(coupon.expiresAt)) {
//   return "Code expired";
// }
