"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteCategoriesById } from "@/services/admin/categories-service";
import { useCategory } from "@/store/useCategories";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";

const CategoriesTable = () => {
  const { categories, loading, error, fetchCategories } = useCategory();
  const [_, setSelectedProduct] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    if (categories.length === 0) {
      setIsLoading(true);
      fetchCategories();
      setIsLoading(false);
    }
  }, [categories, fetchCategories]);

  const handleEdit = (category: string) => {
    setSelectedProduct(category);

    router.push(`/admin/category-manage/edit/${category}`);
  };

  const handleDelete = async (categoryId: number) => {
    try {
      setIsLoading(true);
      console.log("Deleting category with ID:", categoryId);
      await deleteCategoriesById(categoryId);
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setIsLoading(false);
      fetchCategories();
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
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No categories available.
              </TableCell>
            </TableRow>
          ) : (
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.id}</TableCell>
                <TableCell className="font-medium">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={100}
                    height={100}
                  />
                </TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell className="text-right space-x-2 ">
                  <button
                    className="btn px-2 py-1 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
                    onClick={() => handleEdit(category.slug)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn px-2 py-1 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600"
                    onClick={() => handleDelete(category.id)}
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

export default CategoriesTable;
