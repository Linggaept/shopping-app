import { fetchCategory } from "@/services/category-service";
import { create } from "zustand";

interface Categories {
  id: number;
  name: string;
  slug: string;
  image: string;
}

interface CategoryState {
  categories: Categories[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
}

export const useCategory = create<CategoryState>((set) => ({
  categories: [],
  loading: false,
  error: null,
  fetchCategories: async () => {
    try {
      set({ loading: true });
      const response = await fetchCategory();
      set({
        categories: response,
        loading: false,
      });
    } catch (error) {
      set({
        error: "Failed to fetch",
        loading: false,
      });
    }
  },
}));