import { axiosInstance } from "./api";

export const fetchCategory = async () => {
  try {
    const response = await axiosInstance.get(`/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchCategoriesById = async (id: number) => {
  try {
    // First get category details
    const categoryResponse = await axiosInstance.get(`/categories/${id}`);
    const category = categoryResponse.data;
    
    // Then get products for this category
    const productsResponse = await axiosInstance.get(`/categories/${id}/products`);
    
    return {
      ...category,
      products: productsResponse.data
    };
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};