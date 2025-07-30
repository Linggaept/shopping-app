import { PaginationComponent } from "@/components/pagination";
import ProductCard from "@/components/product-card";

const ProductList = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard />
      </div>
      <PaginationComponent />
    </div>
  );
};

export default ProductList;
