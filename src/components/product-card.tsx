"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/store/useProduct";
import { useEffect } from "react";
import Link from "next/link";
import { PaginationComponent } from "./pagination";
import Image from "next/image";

export default function ProductCard() {
  const { products, fetchProducts, loading, error } = useProduct();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading)
    return (
      <div className="absolute top-0 left-0 right-0 bottom-0 min-h-screen flex items-center justify-center w-full">
        Loading...
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(
            (item: {
              id: number;
              title: string;
              description: string;
              slug: string;
              price: number;
              images: string[];
            }) => (
              <Link
                key={item.id}
                href={`/product/${item.slug}`}
                className="w-full max-w-sm"
              >
                <Card
                  key={item.id}
                  className="w-full max-w-sm overflow-hidden rounded-lg border shadow-sm"
                >
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="h-64 w-full object-cover"
                    style={{ aspectRatio: "600/400", objectFit: "cover" }}
                  />
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <span className="text-2xl font-bold">${item.price}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t p-4">
                    <Button className="w-full">Add to Cart</Button>
                  </CardFooter>
                </Card>
              </Link>
            )
          )}
        </div>
        {loading ? null : <PaginationComponent />}
      </div>
    </>
  );
}
