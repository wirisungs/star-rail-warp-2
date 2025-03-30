import { api } from './api';

export const warpService = {
  // Lấy lịch sử roll
  getWarpHistory: async () => {
    try {
      console.log('Fetching warp history...');
      const response = await api.get('/warp/history');
      console.log('Warp history response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching warp history:', error);
      if (error.response) {
        // Server trả về lỗi
        console.error('Server error:', error.response.data);
        throw new Error(error.response.data.message || 'Failed to fetch warp history');
      } else if (error.request) {
        // Không nhận được response
        console.error('No response from server');
        throw new Error('No response from server. Please check your connection.');
      } else {
        // Lỗi khi tạo request
        console.error('Request error:', error.message);
        throw new Error('Error creating request. Please try again.');
      }
    }
  },

  // Thêm một lần roll mới
  addWarpHistory: async (warpData) => {
    try {
      console.log('Adding warp history:', warpData);
      const response = await api.post('/warp/history', warpData);
      console.log('Add warp history response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding warp history:', error);
      if (error.response) {
        console.error('Server error:', error.response.data);
        throw new Error(error.response.data.message || 'Failed to add warp history');
      } else if (error.request) {
        console.error('No response from server');
        throw new Error('No response from server. Please check your connection.');
      } else {
        console.error('Request error:', error.message);
        throw new Error('Error creating request. Please try again.');
      }
    }
  },

  // Xóa lịch sử roll
  deleteWarpHistory: async () => {
    try {
      console.log('Deleting warp history...');
      const response = await api.delete('/warp/history');
      console.log('Delete warp history response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting warp history:', error);
      if (error.response) {
        console.error('Server error:', error.response.data);
        throw new Error(error.response.data.message || 'Failed to delete warp history');
      } else if (error.request) {
        console.error('No response from server');
        throw new Error('No response from server. Please check your connection.');
      } else {
        console.error('Request error:', error.message);
        throw new Error('Error creating request. Please try again.');
      }
    }
  },

  // Lấy thống kê roll
  getWarpStats: async () => {
    try {
      console.log('Fetching warp stats...');
      const response = await api.get('/warp/stats');
      console.log('Warp stats response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching warp stats:', error);
      if (error.response) {
        console.error('Server error:', error.response.data);
        throw new Error(error.response.data.message || 'Failed to fetch warp stats');
      } else if (error.request) {
        console.error('No response from server');
        throw new Error('No response from server. Please check your connection.');
      } else {
        console.error('Request error:', error.message);
        throw new Error('Error creating request. Please try again.');
      }
    }
  },

  // Cập nhật thống kê roll
  updateWarpStats: async (statsData) => {
    try {
      console.log('Updating warp stats:', statsData);
      const response = await api.put('/warp/stats', statsData);
      console.log('Update warp stats response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating warp stats:', error);
      if (error.response) {
        console.error('Server error:', error.response.data);
        throw new Error(error.response.data.message || 'Failed to update warp stats');
      } else if (error.request) {
        console.error('No response from server');
        throw new Error('No response from server. Please check your connection.');
      } else {
        console.error('Request error:', error.message);
        throw new Error('Error creating request. Please try again.');
      }
    }
  },

  // Reset thống kê roll
  resetWarpStats: async () => {
    try {
      console.log('Resetting warp stats...');
      const response = await api.delete('/warp/stats');
      console.log('Reset warp stats response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error resetting warp stats:', error);
      if (error.response) {
        console.error('Server error:', error.response.data);
        throw new Error(error.response.data.message || 'Failed to reset warp stats');
      } else if (error.request) {
        console.error('No response from server');
        throw new Error('No response from server. Please check your connection.');
      } else {
        console.error('Request error:', error.message);
        throw new Error('Error creating request. Please try again.');
      }
    }
  },

  // Lấy trạng thái banner
  getBannerState: async (bannerType) => {
    try {
      const response = await api.get(`/warp/banner-state/${bannerType}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching banner state:', error);
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch banner state');
      } else if (error.request) {
        throw new Error('No response from server');
      } else {
        throw new Error('Error creating request');
      }
    }
  },

  // Cập nhật trạng thái banner
  updateBannerState: async (bannerData) => {
    try {
      console.log('Updating banner state:', bannerData);
      const response = await api.put('/warp/banner-state', bannerData);
      console.log('Banner state update response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating banner state:', error);
      if (error.response) {
        console.error('Server error:', error.response.data);
        throw new Error(error.response.data.message || 'Failed to update banner state');
      } else if (error.request) {
        console.error('No response from server');
        throw new Error('No response from server');
      } else {
        console.error('Request error:', error.message);
        throw new Error('Error creating request');
      }
    }
  }
};
