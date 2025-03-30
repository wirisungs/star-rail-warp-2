const WarpStats = require('../models/WarpStats');
const WarpHistory = require('../models/WarpHistory');
const Inventory = require('../models/Inventory');
const bannerService = require('../services/BannerService');

class WarpCommand {
  constructor(userId, bannerType, warps) {
    this.userId = userId;
    this.bannerType = bannerType;
    this.warps = warps;
  }

  async execute() {
    throw new Error('Method not implemented');
  }

  async updateStats(totalPulls, singlePulls, tenPulls, totalJades) {
    await WarpStats.findOneAndUpdate(
      { userId: this.userId, bannerType: this.bannerType },
      {
        totalPulls,
        singlePulls,
        tenPulls,
        totalJades,
        lastUpdate: new Date()
      },
      { upsert: true }
    );
  }

  async saveHistory(item) {
    await WarpHistory.create({
      userId: this.userId,
      bannerType: this.bannerType,
      itemId: item.itemId,
      itemName: item.itemName,
      itemType: item.itemType,
      rarity: item.rarity,
      pity: item.pity,
      guaranteed: item.guaranteed
    });
  }

  async updateInventory(item) {
    await Inventory.findOneAndUpdate(
      { userId: this.userId },
      {
        $push: {
          items: {
            itemId: item.itemId,
            itemName: item.itemName,
            itemType: item.itemType,
            rarity: item.rarity,
            quantity: 1
          }
        }
      },
      { upsert: true }
    );
  }
}

class SingleWarpCommand extends WarpCommand {
  async execute() {
    const stats = await WarpStats.findOne({ userId: this.userId, bannerType: this.bannerType });
    const currentPulls = stats ? stats.totalPulls : 0;

    // Cập nhật thống kê
    await this.updateStats(
      currentPulls + 1,
      (stats ? stats.singlePulls : 0) + 1,
      stats ? stats.tenPulls : 0,
      (stats ? stats.totalJades : 0) + 160
    );

    // Tính toán kết quả roll
    const bannerState = await bannerService.getBannerState(this.userId, this.bannerType);
    const pityRate = bannerService.calculatePity(
      this.bannerType,
      bannerState.pityFive,
      90,
      75,
      0.006
    );

    // TODO: Implement actual roll logic here
    const result = {
      itemId: 'example',
      itemName: 'Example Item',
      itemType: 'character',
      rarity: 5,
      pity: bannerState.pityFive,
      guaranteed: bannerState.guaranteeFive
    };

    // Lưu kết quả
    await this.saveHistory(result);
    await this.updateInventory(result);

    // Cập nhật banner state
    await bannerService.updateBannerState(this.userId, this.bannerType, {
      pityFive: bannerState.pityFive + 1,
      pityFour: bannerState.pityFour + 1,
      guaranteeFive: bannerState.guaranteeFive,
      guaranteeFour: bannerState.guaranteeFour
    });

    return result;
  }
}

class TenWarpCommand extends WarpCommand {
  async execute() {
    const stats = await WarpStats.findOne({ userId: this.userId, bannerType: this.bannerType });
    const currentPulls = stats ? stats.totalPulls : 0;

    // Cập nhật thống kê
    await this.updateStats(
      currentPulls + 10,
      stats ? stats.singlePulls : 0,
      (stats ? stats.tenPulls : 0) + 1,
      (stats ? stats.totalJades : 0) + 1600
    );

    const results = [];
    let bannerState = await bannerService.getBannerState(this.userId, this.bannerType);
    let currentPityFive = bannerState.pityFive;
    let currentPityFour = bannerState.pityFour;
    let currentGuaranteeFive = bannerState.guaranteeFive;
    let currentGuaranteeFour = bannerState.guaranteeFour;

    // Roll 10 lần
    for (let i = 0; i < 10; i++) {
      const pityRate = bannerService.calculatePity(
        this.bannerType,
        currentPityFive,
        90,
        75,
        0.006
      );

      // Xác định rarity dựa trên pity rate
      let isFiveStar = Math.random() < pityRate;
      let rarity = isFiveStar ? 5 : 4;

      // Xử lý guarantee khi roll ra item không đúng
      if (currentGuaranteeFive && rarity !== 5) {
        // Nếu đảm bảo 5 sao nhưng roll ra 4 sao
        currentGuaranteeFive = true;
      } else if (currentGuaranteeFour && rarity !== 4) {
        // Nếu đảm bảo 4 sao nhưng roll ra 3 sao
        currentGuaranteeFour = true;
      }

      // TODO: Implement actual item selection logic here
      const result = {
        itemId: 'example',
        itemName: 'Example Item',
        itemType: 'character',
        rarity: rarity,
        pity: currentPityFive,
        guaranteed: currentGuaranteeFive
      };

      results.push(result);
      await this.saveHistory(result);
      await this.updateInventory(result);

      // Cập nhật pity và guarantee cho lần roll tiếp theo
      if (isFiveStar) {
        currentPityFive = 0;
        currentPityFour = 0;
        currentGuaranteeFive = false;
        currentGuaranteeFour = false;
      } else {
        currentPityFive++;
        currentPityFour++;
        if (currentPityFive >= 89) {
          currentGuaranteeFive = true;
        }
        if (currentPityFour >= 9) {
          currentGuaranteeFour = true;
        }
      }

      // Cập nhật banner state sau mỗi lần roll
      bannerState = await bannerService.updateBannerState(this.userId, this.bannerType, {
        pityFive: currentPityFive,
        pityFour: currentPityFour,
        guaranteeFive: currentGuaranteeFive,
        guaranteeFour: currentGuaranteeFour
      });

      // Log để debug
      console.log(`Roll ${i + 1}:`, {
        pityFive: currentPityFive,
        pityFour: currentPityFour,
        guaranteeFive: currentGuaranteeFive,
        guaranteeFour: currentGuaranteeFour,
        rarity: rarity
      });
    }

    return results;
  }
}

module.exports = {
  WarpCommand,
  SingleWarpCommand,
  TenWarpCommand
};
