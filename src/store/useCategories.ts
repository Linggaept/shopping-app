import { create } from "zustand";
import { fetchCategory, fetchCategoriesById } from "@/services/category-service";

interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
    slug: string;
    image: string;
  };
}

interface Categories {
  id: number;
  name: string;
  slug: string;
  image: string;
  products?: Product[];
}

interface CategoryState {
  categories: Categories[];
  selectedCategory: Categories | null;
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  fetchCategoriesById: (id: number) => Promise<void>;
}

export const useCategory = create<CategoryState>((set) => ({
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
  fetchCategories: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetchCategory();
      set({
        categories: response,
        loading: false
      });
    } catch (error) {
      set({
        error: "Failed to fetch categories",
        loading: false
      });
    }
  },
  fetchCategoriesById: async (id: number) => {
    try {
      set({ loading: true, error: null });
      const categoryWithProducts = await fetchCategoriesById(id);
      set({ 
        selectedCategory: categoryWithProducts,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: "Failed to fetch category and products",
        loading: false,
        selectedCategory: null
      });
    }
  },
}));