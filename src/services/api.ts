import axios from "axios";

export const API_URL = 'https://api.escuelajs.co/api/v1';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});