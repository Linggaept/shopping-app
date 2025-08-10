import { axiosInstance } from "../api";

export const getAllUser = async () => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchUserById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const addUserService = async (
  name: string,
  email: string,
  password: string,
  avatar: string
) => {
  try {
    const response = await axiosInstance.post("/users", {
      name,
      email,
      password,
      avatar,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const editUserService = async (
  id: number,
  name: string,
  email: string,
) => {
  try {
    const response = await axiosInstance.put(`/users/${id}`, {
      name,
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Error editing user:", error);
    throw error;
  }
};
