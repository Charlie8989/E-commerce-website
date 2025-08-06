import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendURL } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestSeller, setbestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendURL + "/api/product/add",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-30 cursor-pointer"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              type="file"
              onChange={(e) => setImage1(e.target.files[0])}
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-30 cursor-pointer"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              type="file"
              onChange={(e) => setImage2(e.target.files[0])}
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-30 cursor-pointer"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              type="file"
              onChange={(e) => setImage3(e.target.files[0])}
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-30 cursor-pointer"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              type="file"
              onChange={(e) => setImage4(e.target.files[0])}
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Type Here"
          required
          className="w-full max-w-[500px] px-3 py-2 "
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          placeholder="Write Content Here"
          required
          className="w-full max-w-[500px] px-3 py-2 "
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Sub-Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Topwear">TopWear</option>
            <option value="BottomWear">BottomWear</option>
            <option value="WinterWear">WinterWear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            className="w-full px-3 py-2 sm:w-[120px]"
            placeholder="99"
            required
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("S") ? "bg-[#504b38] text-white" : "bg-slate-200"
              } px-4 text-md py-2 cursor-pointer`}
            >
              S
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "M"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("M") ? "bg-[#504b38] text-white" : "bg-slate-200"
              } px-4 text-md py-2 cursor-pointer`}
            >
              M
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "L"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("L") ? "bg-[#504b38] text-white" : "bg-slate-200"
              } px-4 text-md py-2 cursor-pointer`}
            >
              L
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "XL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XL")
                  ? "bg-[#504b38] text-white"
                  : "bg-slate-200"
              } px-4 text-md py-2 cursor-pointer`}
            >
              XL
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "XXL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XXL")
                  ? "bg-[#504b38] text-white"
                  : "bg-slate-200"
              } px-4 text-md py-2 cursor-pointer`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>

      <div className="flex mt-2 gap-2">
        <input
          type="checkbox"
          id="bestSeller"
          onChange={() => setbestSeller((prev) => !prev)}
          checked={bestSeller}
        />
        <label className="cursor-pointer" htmlFor="bestSeller">
          Add To BestSeller
        </label>
      </div>

      <button
        type="submit"
        className="bg-[#504B38] border text-white px-8 py-2 rounded-sm"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
