"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useProduct } from "@/store/useProduct";
import { EditProductService } from "@/services/admin/product-service";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  price: z.number().min(0, {
    message: "Price must be a positive number.",
  }),
});

interface DetailProductProps {
  params: Promise<{ slug: string }>;
}

export default function EditForm({ params }: DetailProductProps) {
  const { fetchProductBySlug, products, loading } = useProduct();
  const router = useRouter();

  const product = products[0];

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
    },
  });

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      console.log(resolvedParams.slug);
      if (resolvedParams.slug) {
        try {
          await fetchProductBySlug(resolvedParams.slug);
        } catch (error) {
          console.error("Error loading product:", error);
        }
      }
    };

    getParams();
  }, [params, fetchProductBySlug]);

  // Reset form values when product data is loaded
  useEffect(() => {
    if (product) {
      form.reset({
        title: product.title || "",
        price: product.price || 0,
      });
    }
  }, [product, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!product || !product.id) {
      console.error("Product ID is not available");
      return;
    }

    try {
      // Send product ID along with the form data
      await EditProductService(product.id, data.title, data.price);
      console.log("Product updated successfully:", {
        id: product.id,
        title: data.title,
        price: data.price,
      });

      // You might want to show a success message or redirect
      router.push("admin/product-manage");
    } catch (error) {
      console.error("Error updating product:", error);
      // You might want to show an error message to the user
    }
  };

  // Show loading state while product is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error state if product is not found
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className="px-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title..." {...field} />
                  </FormControl>
                  <FormDescription>This is your product title.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="100"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>This is your product price.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
