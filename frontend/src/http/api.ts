import axios from "axios";
import useTokenStore from "./store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const logIn = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post("/api/users/login", data);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const createUser = async (data: {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}) => {
  try {
    const response = await api.post("/api/users/register", data);
    return response.data;
  } catch (error) {
    console.error("User creation failed:", error);
    throw error;
  }
};

export const createAuction = async (data: {
  product: string;
  category: string;
  description: string;
  quality: string;
  unit: string;
  pickupLocation: string;
  startingBid: number;
  harvestDate: string;
  minBidIncrement: number;
  quantity: number;
  duration: number;
  images: string[];
}) => {
  try {
    const response = await api.post("/api/auctions/create", data);
    return response.data;
  } catch (error) {
    console.error("Auction creation failed:", error);
    throw error;
  }
};

export const updateAuction = async (
  id: string,
  data: {
    product: string;
    category: string;
    description: string;
    quality: string;
    unit: string;
    pickupLocation: string;
    startingBid: number;
    quantity: number;
    duration: number;
  }
) => {
  try {
    const response = await api.put(`/api/auctions/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Auction update failed:", error);
    throw error;
  }
};

export const getAuctions = async () => {
  try {
    const response = await api.get("/api/auctions");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch auctions:", error);
    throw error;
  }
};

export const getAuctionById = async (id: string) => {
  try {
    const response = await api.get(`/api/auctions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch auction:", error);
    throw error;
  }
};

export const getFarmerById = async (id: string) => {
  try {
    const response = await api.get(`/api/users/farmers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch farmer:", error);
    throw error;
  }
};

export const updateStatus = async (id: string) => {
  try {
    const response = await api.put(`/api/auctions/updatestatus/${id}`, {"status": "closed"});
    return response.data;
  } catch (error) {
    console.error("Failed to update status:", error);
    throw error;
  }
};
