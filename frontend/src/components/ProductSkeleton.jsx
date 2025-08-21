const ProductSkeleton = () => {
  return (
    <div className="animate-pulse p-4 border rounded-xl shadow-sm">
      <div className="h-40 w-full bg-gray-300 rounded-md mb-4"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
};

export default ProductSkeleton;