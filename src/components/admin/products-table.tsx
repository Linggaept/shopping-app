"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteProductService } from "@/services/admin/product-service";
import { useProduct } from "@/store/useProduct";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";
// import Loading from "../loading";

const ProductsTable = () => {
  const { products, loading, error, fetchProducts } = useProduct();
  const [_, setSelectedProduct] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    if (products.length === 0) {
      setIsLoading(true);
      fetchProducts();
      setIsLoading(false);
    }
  }, [products, fetchProducts]);

  const handleEdit = (product: string) => {
    setSelectedProduct(product);

    router.push(`/admin/product-manage/edit/${product}`);
  };

  const handleDelete = async (productId: number) => {
    try {
      setIsLoading(true);
      console.log("Deleting product with ID:", productId);
      await DeleteProductService(productId);
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsLoading(false);
      fetchProducts();
    }
  };

  return (
    <>
      {loading && <Loading />}
      <Table className={`w-full ${loading ? "hidden" : ""}`}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID Product</TableHead>
            <TableHead className="">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="">Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No products available.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell className="font-medium">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    width={100}
                    height={100}
                  />
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell className="text-right font-semibold">
                  ${product.price}
                </TableCell>
                <TableCell className="text-right space-x-2 ">
                  <button
                    className="btn px-2 py-1 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
                    onClick={() => handleEdit(product.slug)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn px-2 py-1 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600"
                    onClick={() => handleDelete(product.id)}
                    disabled={isLoading}
                  >
                    {isLoading ? "Deleting..." : "Delete"}
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default ProductsTable;
