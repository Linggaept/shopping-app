"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/store/useProduct";
import { useEffect } from "react";

export default function ProductCard() {
  const { products, fetchProducts, loading, error } = useProduct();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {products.map((item: { id: number; title: string; description: string; price: number; images: string[] }) => (
        <Card className="w-full max-w-sm overflow-hidden rounded-lg border shadow-sm">
          <img
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
      ))}
    </>
  );
}
