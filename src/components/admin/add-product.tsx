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
import { Textarea } from "@/components/ui/textarea"; // Import Textarea untuk description
import { AddProductService } from "@/services/admin/product-service";
import { useCategory } from "@/store/useCategories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function AddProductDialog() {
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
    title: z.string().min(1, "Title is required"),
    price: z.number({}).min(0, "Price must be a positive number"),
    description: z.string().min(1, "Description is required"),
    // ✅ Category sebagai number (categoryId) sesuai API
    categoryId: z.number({}).min(1, "Please select a category"),
    // ✅ Images sebagai array string
    images: z
      .array(z.string().url("Each image must be a valid URL"))
      .min(1, "At least one image URL is required"),
  });

  // ✅ DEFAULT VALUES YANG KONSISTEN
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      categoryId: 0, // Number 0 sebagai default (akan di-validate sebagai invalid)
      images: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log("Submitting product data:", data);
      await AddProductService(
        data.title,
        data.price,
        data.description,
        data.categoryId,
        data.images
      );
      // console.log("Product added successfully:", response);
      setOpen(false); // Close dialog on success
      form.reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Product</Button>
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product title" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a clear and descriptive product title.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ✅ PRICE FIELD - FIXED */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Enter price (e.g., 299.99)"
                        {...field}
                        onChange={(e) => {
                          // ✅ Handle number conversion dengan benar
                          const value = e.target.value;
                          if (value === "") {
                            field.onChange(0);
                          } else {
                            const numValue = parseFloat(value);
                            field.onChange(isNaN(numValue) ? 0 : numValue);
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the product price in your currency.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ✅ DESCRIPTION FIELD - Improved */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter product description"
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a detailed description of the product.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ✅ CATEGORY FIELD - FIXED untuk API */}
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        onChange={(e) => {
                          // ✅ Convert string ke number untuk categoryId
                          const value = e.target.value;
                          field.onChange(
                            value === "" ? 0 : parseInt(value, 10)
                          );
                        }}
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormDescription>
                      Select the appropriate category for this product.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ✅ IMAGES FIELD - COMPLETELY FIXED */}
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URLs</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        {field.value.map((url, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              placeholder={`Image URL ${index + 1}`}
                              value={url}
                              onChange={(e) => {
                                const newImages = [...field.value];
                                newImages[index] = e.target.value;
                                field.onChange(newImages);
                              }}
                            />
                            {field.value.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newImages = field.value.filter(
                                    (_, i) => i !== index
                                  );
                                  field.onChange(newImages);
                                }}
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            field.onChange([...field.value, ""]);
                          }}
                        >
                          Add Image URL
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Add one or more image URLs for the product.
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
                {loading ? "Saving..." : "Save Product"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
