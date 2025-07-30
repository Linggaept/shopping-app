"use client";

import { useEffect, useState } from "react";
import { useCategory } from "@/store/useCategories";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Container from "@/components/container";
import { Navbar1 } from "@/components/navbar";
import Link from "next/link";
import Image from "next/image";

interface CategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { selectedCategory, fetchCategoriesById, loading, error } =
    useCategory();
  const [categoryId, setCategoryId] = useState<string | null>(null);

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setCategoryId(resolvedParams.id);
    };
    
    getParams();
  }, [params]);

  useEffect(() => {
    const fetchData = async () => {
      if (categoryId) {
        try {
          await fetchCategoriesById(Number(categoryId));
        } catch (err) {
          console.error("Error fetching category:", err);
        }
      }
    };
    
    fetchData();
  }, [categoryId, fetchCategoriesById]);

  if (loading) return (
    <Container>
      <Navbar1 />
      <div className="py-6">Loading...</div>
    </Container>
  );

  if (error)
    return (
      <Container>
        <Navbar1 />
        <div className="py-6">Error: {error}</div>
      </Container>
    );

  if (!selectedCategory)
    return (
      <Container>
        <Navbar1 />
        <div className="py-6">Category not found</div>
      </Container>
    );

  return (
    <Container>
      <Navbar1 />
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6">{selectedCategory.name}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {selectedCategory.products?.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="w-full max-w-sm"
            >
              <Card
                key={product.id}
                className="w-full max-w-sm overflow-hidden rounded-lg border shadow-sm"
              >
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={600}
                  height={400}
                  className="h-64 w-full object-cover"
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{product.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {product.description}
                      </p>
                    </div>
                    <span className="text-2xl font-bold">${product.price}</span>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4">
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}