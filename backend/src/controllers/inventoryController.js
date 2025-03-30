const Inventory = require('../models/Inventory');

// Lấy inventory của user
exports.getInventory = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log('Getting inventory for user:', userId);

    let inventory = await Inventory.findOne({ userId });

    if (!inventory) {
      inventory = { items: [] };
    }

    // Sắp xếp items theo rarity (cao đến thấp) và quantity
    const sortedItems = inventory.items.sort((a, b) => {
      if (b.rarity !== a.rarity) {
        return b.rarity - a.rarity;
      }
      return b.quantity - a.quantity;
    });

    res.json({
      success: true,
      inventory: sortedItems
    });
  } catch (error) {
    console.error('Error in getInventory:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Lấy thống kê inventory
exports.getInventoryStats = async (req, res) => {
  try {
    const inventory = await Inventory.findOne({ userId: req.user.id });
    if (!inventory) {
      return res.json({
        totalItems: 0,
        fiveStars: 0,
        fourStars: 0,
        threeStars: 0
      });
    }

    const stats = {
      totalItems: inventory.items.length,
      fiveStars: inventory.items.filter(item => item.rarity === 5).length,
      fourStars: inventory.items.filter(item => item.rarity === 4).length,
      threeStars: inventory.items.filter(item => item.rarity === 3).length
    };

    res.json(stats);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cập nhật số lượng item trong inventory
exports.updateItemQuantity = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { itemId, quantity } = req.body;

    console.log('Updating item quantity for user:', userId, 'item:', itemId, 'quantity:', quantity);

    let inventory = await Inventory.findOne({ userId });

    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: 'Inventory not found'
      });
    }

    const itemIndex = inventory.items.findIndex(item => item.itemId === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in inventory'
      });
    }

    inventory.items[itemIndex].quantity = quantity;
    inventory.items[itemIndex].lastUpdated = new Date();

    await inventory.save();

    res.json({
      success: true,
      item: inventory.items[itemIndex]
    });
  } catch (error) {
    console.error('Error in updateItemQuantity:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Thêm item mới vào inventory
exports.addItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { itemId, itemName, itemType, rarity } = req.body;

    console.log('Adding item to inventory for user:', userId, 'item:', itemId);

    let inventory = await Inventory.findOne({ userId });

    if (!inventory) {
      inventory = new Inventory({
        userId,
        items: []
      });
    }

    const existingItem = inventory.items.find(item => item.itemId === itemId);

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.lastUpdated = new Date();
    } else {
      inventory.items.push({
        itemId,
        itemName,
        itemType,
        rarity,
        quantity: 1,
        obtainedAt: new Date(),
        lastUpdated: new Date()
      });
    }

    await inventory.save();

    res.status(201).json({
      success: true,
      inventory: inventory.items
    });
  } catch (error) {
    console.error('Error in addItem:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
