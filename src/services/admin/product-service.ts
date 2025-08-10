import { axiosInstance } from "../api";

export const AddProductService = async (
  title: string,
  price: number,
  description: string,
  categoryId: number,
  images: string[]
) => {
  try {
    const response = await axiosInstance.post("/products", {
      title,
      price,
      description,
      categoryId,
      images,
    });
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Add product failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error in AddProductService:", error);
    throw error;
  }
};

export const EditProductService = async (
  id: number,
  title: string,
  price: number
) => {
  try {
    const response = await axiosInstance.put(`/products/${id}`, {
      title,
      price,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Edit product failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error in EditProductService:", error);
    throw error; // Re-throw error so it can be handled by the calling function
  }
};

export const DeleteProductService = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Delete product failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error in DeleteProductService:", error);
    throw error;
  }
};
