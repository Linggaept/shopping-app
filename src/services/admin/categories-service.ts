import { axiosInstance } from "../api";

export const addCategoriesService = async (name: string, image: string) => {
  try {
    const response = await axiosInstance.post("categories", {
      name,
      image,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to add category");
  }
};
export const editCategoriesService = async (
  id: number,
  name: string,
  image: string
) => {
  try {
    const response = await axiosInstance.patch(`categories/${id}`, {
      name,
      image,
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to edit category");
  }
};

export const fetchCategoriesBySlug = async (slug: string) => {
  try {
    const response = await axiosInstance.get(`categories/slug/${slug}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch category");
  }
};

export const deleteCategoriesById = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`categories/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete category");
  }
};
