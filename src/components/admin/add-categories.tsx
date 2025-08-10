"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import { addCategoriesService } from "@/services/admin/categories-service";
import { useCategory } from "@/store/useCategories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function AddCategoriesDialog() {
  const { fetchCategories, categories } = useCategory();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      fetchCategories();
      console.log("Categories loaded:", categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, [fetchCategories]);

  // ✅ SCHEMA YANG BENAR - Sesuai dengan API requirement
  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    image: z.string({}).min(1, "Image URL is required"),
  });

  // ✅ DEFAULT VALUES YANG KONSISTEN
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      console.log("Submitting category data:", data);
      const response = await addCategoriesService(data.name, data.image);
      console.log("Category added successfully:", response);
      setOpen(false); // Close dialog on success
      form.reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Categories</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
              <DialogDescription>
                Add a new product to your inventory. Fill in all required
                fields.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {/* ✅ TITLE FIELD - Sudah benar */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a clear and descriptive category name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ✅ IMAGE FIELD - FIXED */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter image URL"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the URL of the category image.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Category"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}