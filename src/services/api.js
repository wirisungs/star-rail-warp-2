import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('API - Adding token to request:', config.url);
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.log('API - No token found for request:', config.url);
    }
    return config;
  },
  (error) => {
    console.error('API - Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API - Response error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });

    if (error.response?.status === 401) {
      console.log('API - Unauthorized access, clearing session data');
      // Clear invalid session but don't redirect
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Let the component handle the redirect
    }
    return Promise.reject(error);
  }
);

export { api };
export default api;

export const authService = {
  register: async (username, password, email) => {
    try {
      const response = await api.post('/auth/register', {
        username,
        password,
        email
      });

      if (response.data.token) {
        console.log('API - Setting token after registration');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      throw error;
    }
  },

  login: async (username, password) => {
    try {
      const response = await api.post('/auth/login', {
        username,
        password
      });

      if (response.data.token) {
        console.log('API - Setting token after login');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },

  logout: () => {
    console.log('API - Clearing session data on logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userStr || !token) {
      console.log('API - No user or token found in storage');
      return null;
    }

    try {
      const user = JSON.parse(userStr);
      console.log('API - Retrieved user from storage:', user);
      return user;
    } catch (error) {
      console.error('API - Error parsing user data:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return null;
    }
  }
};

export const inventoryService = {
  getInventory: async () => {
    const response = await api.get('/inventory');
    return response.data;
  },

  getInventoryStats: async () => {
    const response = await api.get('/inventory/stats');
    return response.data;
  },

  updateItemQuantity: async (itemId, quantity) => {
    const response = await api.put('/inventory/item', { itemId, quantity });
    return response.data;
  }
};
