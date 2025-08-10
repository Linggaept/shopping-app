"use client";

import { AddProductDialog } from "@/components/admin/add-product";
import ProductsTable from "@/components/admin/products-table";
import Container from "@/components/container";
import { PaginationComponent } from "@/components/pagination";
import { useProduct } from "@/store/useProduct";
import { useEffect, useState } from "react";
const ProductManagePage = () => {
  const { products, fetchProducts } = useProduct();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products, fetchProducts]);
  return (
    <>
      <Container className="py-10">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <p className="text-gray-600 mb-4">
          Here you can manage your products, including adding, editing, and
          deleting products.
        </p>
        <AddProductDialog />
        <ProductsTable />
        <PaginationComponent />
      </Container>
    </>
  );
};
export default ProductManagePage;
