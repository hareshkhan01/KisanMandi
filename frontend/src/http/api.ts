import axios from 'axios'
import useTokenStore from './store';

const api = axios.create({
    baseURL: 'http://localhost:3300',
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
  
  export const createUser = async (data: { name: string; email: string; password: string }) => {
    try {
      const response = await api.post('/api/users/register', data);
      return response.data;
    } catch (error) {
      console.error('User creation failed:', error);
      throw error;
    }
  };
  
