import { axiosInstance } from "./api";

export const fetchProduct = async (offset: number, limit: number) => {
    try {
        // Get total count first
        const countResponse = await axiosInstance.get('/products');
        const totalCount = countResponse.data.length;
        
        // Get paginated data
        const response = await axiosInstance.get(`/products?offset=${offset}&limit=${limit}`);
        
        return {
            products: response.data,
            totalCount
        };
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};