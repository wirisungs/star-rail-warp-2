import { api } from './api';

export const inventoryService = {
  // Lấy inventory của user
  getInventory: async () => {
    try {
      console.log('Fetching inventory...');
      const response = await api.get('/inventory');
      console.log('Inventory response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching inventory:', error);
      if (error.response) {
        console.error('Server error:', error.response.data);
        throw new Error(error.response.data.message || 'Failed to fetch inventory');
      } else if (error.request) {
        console.error('No response from server');
        throw new Error('No response from server. Please check your connection.');
      } else {
        console.error('Request error:', error.message);
        throw new Error('Error creating request. Please try again.');
      }
    }
  },

  // Lấy inventory đã format cho DataBank
  getInventoryForDataBank: async () => {
    try {
      const response = await api.get('/inventory');
      const inventory = response.data.inventory;

      // Format dữ liệu thành dạng stash cho DataBank
      const stash = {};
      inventory.forEach(item => {
        stash[item.itemId] = item.quantity;
      });

      console.log('Formatted inventory for DataBank:', stash);
      return stash;
    } catch (error) {
      console.error('Error fetching inventory for DataBank:', error);
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch inventory');
      } else if (error.request) {
        throw new Error('No response from server. Please check your connection.');
      } else {
        throw new Error('Error creating request. Please try again.');
      }
    }
  },

  // Cập nhật số lượng item
  updateItemQuantity: async (itemId, quantity) => {
    try {
      console.log('Updating item quantity:', { itemId, quantity });
      const response = await api.put('/inventory/item', { itemId, quantity });
      console.log('Update quantity response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating item quantity:', error);
      if (error.response) {
        console.error('Server error:', error.response.data);
        throw new Error(error.response.data.message || 'Failed to update item quantity');
      } else if (error.request) {
        console.error('No response from server');
        throw new Error('No response from server. Please check your connection.');
      } else {
        console.error('Request error:', error.message);
        throw new Error('Error creating request. Please try again.');
      }
    }
  },

  // Thêm item mới
  addItem: async (itemData) => {
    try {
      console.log('Adding new item:', itemData);
      const response = await api.post('/inventory/item', itemData);
      console.log('Add item response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding item:', error);
      if (error.response) {
        console.error('Server error:', error.response.data);
        throw new Error(error.response.data.message || 'Failed to add item');
      } else if (error.request) {
        console.error('No response from server');
        throw new Error('No response from server. Please check your connection.');
      } else {
        console.error('Request error:', error.message);
        throw new Error('Error creating request. Please try again.');
      }
    }
  }
};
