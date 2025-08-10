import { fetchProduct, fetchProductBySlug } from "@/services/product-service";
import { create } from "zustand";

interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    slug: string;
    image: string;
  };
  images: string[];
}
interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  limit: number;
  fetchProducts: (page?: number) => Promise<void>;
  fetchProductBySlug: (slug: string) => Promise<void>;
  setPage: (page: number) => void;
}

export const useProduct = create<ProductState>((set) => ({
  products: [],
  loading: false,
  error: null,
  currentPage: 0,
  totalPages: 0,
  limit: 10,
  setPage: (page) => set({ currentPage: page }),
  fetchProducts: async (page = 0) => {
    try {
      set({ loading: true });
      const limit = 10;
      const result = await fetchProduct(page * limit, limit);
      if (!result) return;
      const { products, totalCount } = result;
      set({
        products,
        loading: false,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
      });
    } catch (error) {
      set({
        error: "Failed to fetch",
        loading: false,
      });
    }
  },
  fetchProductBySlug: async (slug: string) => {
    try {
      set({ loading: true });
      const response = await fetchProductBySlug(slug);
      set({ products: [response], loading: false });
    } catch (error) {
      set({
        error: "Failed to fetch",
        loading: false,
      });
    }
  },
}));