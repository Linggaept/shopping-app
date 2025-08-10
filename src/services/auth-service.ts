import { axiosInstance } from "./api";


export const loginService = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(`/auth/login`, 
      {
        email,
        password,
      }
    );

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const getProfileService = async (token: string) => {
  try {
    const response = await axiosInstance.get(`/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  
  }
}