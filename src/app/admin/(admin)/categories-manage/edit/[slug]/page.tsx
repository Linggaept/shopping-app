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
import { useCategory } from "@/store/useCategories";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { editCategoriesService } from "@/services/admin/categories-service";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  image: z.string().min(2, {
    message: "Image URL must be at least 2 characters.",
  }),
});

interface DetailProductProps {
  params: Promise<{ slug: string }>;
}

export default function EditFormCategories({ params }: DetailProductProps) {
  const { fetchCategoryBySlug, categories, loading } = useCategory();
  const router = useRouter();


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      console.log(resolvedParams.slug);
      if (resolvedParams.slug) {
        try {
          await fetchCategoryBySlug(resolvedParams.slug);
        } catch (error) {
          console.error("Error loading category:", error);
        }
      }
    };

    getParams();
  }, [params, fetchCategoryBySlug]);

  // Reset form values when category data is loaded
  useEffect(() => {
    if (categories) {
      form.reset({
        name: categories[0].name || "",
        image: categories[0].image || "",
      });
    }
  }, [categories, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!categories || !categories[0].id) {
      console.error("Category ID is not available");
      return;
    }

    try {
      await editCategoriesService(categories[0].id, data.name, data.image);
      console.log("Category updated successfully:", {
        id: categories[0].id,
        name: data.name,
        image: data.image,
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
  if (!categories) {
    return <div>Categories not found</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name..." {...field} />
              </FormControl>
              <FormDescription>This is your category name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Image URL..."
                  {...field}
                />
              </FormControl>
              <FormDescription>This is your category image URL.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
}
