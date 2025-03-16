import axios from 'axios'
import useTokenStore from './store';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        "Content-Type" :'application/json',
    }
})

api.interceptors.request.use((config) => {
    const token = useTokenStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export const logIn = async (data: { email: string; password: string }) => {
    try {
      const response = await api.post('/api/users/login', data);
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };
  
  export const createUser = async (data: { name: string; email: string; password: string; role: string }) => {
    try {
      const response = await api.post('/api/users/register', data);
      return response.data;
    } catch (error) {
      console.error('User creation failed:', error);
      throw error;
    }
  };


 
  export const createAuction = async (data: { product: string;category:string; description: string;quality: string;unit:string;pickupLocation: string ;currentBid: number; quantity: number }) => {
    try {
      const response = await api.post('/api/auctions/create', data);
      return response.data;
    } catch (error) {
      console.error('Auction creation failed:', error);
      throw error;
    }
  };

 
  export const updateAuction = async (id: string, data: { product: string;category:string; description: string;quality: string;unit:string;pickupLocation: string ;currentBid: number; quantity: number }) => {
    try {
      const response = await api.put(`/api/auctions/update/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Auction update failed:', error);
      throw error;
    }
  };

  export const getAuctions = async () => {
    try {
      const response = await api.get('/api/auctions');
      // console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Failed to fetch auctions:', error);
      throw error;
    }
  };
  
