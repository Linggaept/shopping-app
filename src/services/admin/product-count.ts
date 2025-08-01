import { axiosInstance } from "../api";

export const getCountProduct = async () => { 
    try {
        const response = await axiosInstance.get('/products')
        const totalCount = response.data.length;
        return totalCount;
    } catch (error) {
        console.error('Error fetching product count:', error);
        throw error;
    }
}