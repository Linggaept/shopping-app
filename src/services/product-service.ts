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

export const fetchProductBySlug = async (slug: string) => {
    try {
        const response = await axiosInstance.get(`/products/slug/${slug}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product by slug:", error);
        throw error;
    }
}