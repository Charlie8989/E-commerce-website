import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItems from "../components/ProductItems";

const Collection = () => {
  const { products, search, showsearch } = useContext(ShopContext);
  const [showFiter, setshowFilter] = useState(false);
  const [filterproducts, setfilterproducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setsortType] = useState("Relevant");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilters = () => {
    let productsCopy = products.slice();
    if (showsearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory
          .map((i) => i.toLowerCase())
          .includes(item.subCategory?.toLowerCase())
      );
    }
    setfilterproducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterproducts.slice();
    switch (sortType) {
      case "Low-High":
        setfilterproducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "High-Low":
        setfilterproducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilters();
        break;
    }
  };

  useEffect(() => {
    applyFilters();
    // console.log(subCategory)
  }, [category, subCategory, search, showsearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  // used in applyfilters logic
  // useEffect(() => {
  //   setfilterproducts(products);
  // }, []);

  // useEffect(() => {
  //   console.log(subCategory);
  // }, [subCategory]);

  return (
    <>
      <div className=" flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
        {/* Filters */}
        <div className="min-w-60">
          <p
            onClick={() => {
              if (window.innerWidth < 640) {
                setshowFilter((prev) => !prev);
              }
            }}
            className=" px-2 sm:px-0  flex items-center my-2 gap-2 text-xl cursor-pointer text-[#504B38]"
          >
            {window.innerWidth < 640 ? "FILTERS ??" : "FILTERS"}
          </p>
          <div
            className={`border sm:mx-0 mx-5 border-[#504B38] pl-5 py-3 my-6 ${
              showFiter ? "" : "hidden"
            } sm:block`}
          >
            <p className="text-[#504B38] mb-3 text-sm font-medium">
              CATEGORIES
            </p>
            <div className="text-[#504B38] flex flex-col gap-2 text-sm font-light">
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3 accent-[#504B38]"
                  value={"Men"}
                  onChange={toggleCategory}
                />
                Men
              </p>
            </div>
            <div className="text-[#504B38] flex flex-col gap-2 text-sm font-light">
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3 accent-[#504B38]"
                  value={"Women"}
                  onChange={toggleCategory}
                />
                Women
              </p>
            </div>
            <div className="text-[#504B38] flex flex-col gap-2 text-sm font-light">
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3 accent-[#504B38]"
                  value={"Kids"}
                  onChange={toggleCategory}
                />
                Kids
              </p>
            </div>
          </div>
          <div
            className={`border border-[#504B38] pl-5 py-3 my-6 sm:mx-0 mx-5 ${
              showFiter ? "" : "hidden"
            } sm:block`}
          >
            <p className="text-[#504B38] mb-3 text-sm font-medium">TYPE</p>
            <div className="text-[#504B38] flex flex-col gap-2 text-sm font-light">
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3 accent-[#504B38]"
                  value={"TopWear"}
                  onChange={toggleSubCategory}
                />
                TopWear
              </p>
            </div>
            <div className="text-[#504B38] flex flex-col gap-2 text-sm font-light">
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3 accent-[#504B38]"
                  value={"BottomWear"}
                  onChange={toggleSubCategory}
                />
                BottomWear
              </p>
            </div>
            <div className="text-[#504B38] flex flex-col gap-2 text-sm font-light">
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3 accent-[#504B38]"
                  value={"WinterWear"}
                  onChange={toggleSubCategory}
                />
                WinterWear
              </p>
            </div>
          </div>
        </div>
        <div className="w-full">
          {" "}
          <div className="w-full flex sm:text-2xl text-base justify-between">
            <div className="sm:ml-15 ml-0 px-2 sm:px-0 flex-1 items-start gap-2 mb-1">
              <div className="text-[#504B38]">
                <p>All Collections</p>
                <div className="sm:mt-2 mt-0 w-[60px] h-[1px] bg-[#504B38]"></div>
              </div>
            </div>
            <div>
              <select
                onChange={(e) => setsortType(e.target.value)}
                className="text-[#504B38] sm:mx-0 py-3 px-2 mx-3 text-sm border rounded-sm outline-none border-[#504B38] "
              >
                <option value="Relevant">Sort By:Relevant</option>
                <option value="Low-High">Sort By:Low To High</option>
                <option value="High-Low">Sort By:High To Low</option>
              </select>
            </div>
          </div>
          <div className="w-full">
            <div className=" mx-2 sm:mx-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 mb-7">
              {filterproducts.map((item, index) => (
                <ProductItems
                  key={index}
                  name={item.name}
                  image={item.image}
                  id={item._id}
                  price={item.price}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;