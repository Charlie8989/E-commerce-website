import React from "react";

const SkeletonProduct = () => (
  <div className="animate-pulse my-3">
    <div className="bg-gray-200 h-40 w-full rounded-2xl mb-3" />
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-1/2" />
  </div>
);

export default SkeletonProduct;
