"use client"
import { useProduct } from "@/store/useProduct";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const ProductDetailPresenter = (slug: string) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { fetchProductBySlug, products, loading } = useProduct();
  const router = useRouter();

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  // Handle authentication and product loading
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }

    if (slug) {
      fetchProductBySlug(slug);
    }
    // When the slug changes, we should reset the selected image to let the logic below pick the new default.
    setSelectedImage(null);
  }, [slug, fetchProductBySlug, router]);

  const product = products[0];

  // Derived state for the currently displayed image.
  // It's either the one the user clicked, or the first one from the product data, or null.
  const currentImage = selectedImage || product?.images?.[0] || null;

  return {
    currentImage,
    product,
    loading,
    handleImageClick,
  };
};
