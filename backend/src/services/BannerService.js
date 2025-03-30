const PityStrategyFactory = require('../strategies/PityStrategyFactory');
const WarpStats = require('../models/WarpStats');
const warpEventEmitter = require('../patterns/WarpEventEmitter');
const WarpController = require('../patterns/state/WarpController');

class BannerService {
  constructor(
    warpStatsRepository,
    pityStrategyFactory,
    eventEmitter
  ) {
    this.warpStatsRepository = warpStatsRepository;
    this.pityStrategyFactory = pityStrategyFactory;
    this.eventEmitter = eventEmitter;
    this.warpControllers = new Map();
  }

  getStrategy(bannerType) {
    return this.pityStrategyFactory.createStrategy(bannerType);
  }

  async getBannerState(userId, bannerType) {
    try {
      const stats = await this.warpStatsRepository.findOne({ userId, bannerType });
      if (!stats) {
        return {
          pityFive: 0,
          pityFour: 0,
          guaranteeFive: false,
          guaranteeFour: false
        };
      }

      const strategy = this.getStrategy(bannerType);
      const state = {
        pityFive: stats.pity || 0,
        pityFour: 0,
        guaranteeFive: strategy.calculateGuarantee(stats.pity, 90, 75, 0.006),
        guaranteeFour: false
      };

      // Emit banner state
      this.eventEmitter.emit('banner_state_change', {
        userId,
        bannerType,
        state
      });
      return state;
    } catch (error) {
      console.error('Error getting banner state:', error);
      throw error;
    }
  }

  async updateBannerState(userId, bannerType, state) {
    try {
      const stats = await this.warpStatsRepository.findOneAndUpdate(
        { userId, bannerType },
        { $set: state },
        { new: true, upsert: true }
      );

      // Emit banner state change
      this.eventEmitter.emit('banner_state_change', {
        userId,
        bannerType,
        state
      });
      return stats;
    } catch (error) {
      console.error('Error updating banner state:', error);
      throw error;
    }
  }

  calculatePity(userId, bannerType, currentPity, maxPity, softPity, rate) {
    const strategy = this.getStrategy(bannerType);
    const pity = strategy.calculatePity(currentPity, maxPity, softPity, rate);

    // Emit pity update
    this.eventEmitter.emit('pity_update', {
      userId,
      bannerType,
      pity
    });
    return pity;
  }

  calculateGuarantee(userId, bannerType, currentPity, maxPity, softPity, rate) {
    const strategy = this.getStrategy(bannerType);
    const isGuaranteed = strategy.calculateGuarantee(currentPity, maxPity, softPity, rate);

    // Emit guarantee update
    this.eventEmitter.emit('guarantee_update', {
      userId,
      bannerType,
      isGuaranteed
    });
    return isGuaranteed;
  }

  getWarpController(userId, bannerType) {
    const key = `${userId}-${bannerType}`;
    if (!this.warpControllers.has(key)) {
      const controller = new WarpController(userId, bannerType, this);
      this.warpControllers.set(key, controller);

      // Restore previous state if exists
      const restoredState = controller.restoreState();
      if (restoredState) {
        this.eventEmitter.emit('state_restored', restoredState);
      }
    }
    return this.warpControllers.get(key);
  }

  async startWarp(userId, bannerType) {
    const controller = this.getWarpController(userId, bannerType);
    await controller.startWarp();
  }

  async completeWarp(userId, bannerType) {
    const controller = this.getWarpController(userId, bannerType);
    await controller.completeWarp();
  }

  async cancelWarp(userId, bannerType) {
    const controller = this.getWarpController(userId, bannerType);
    await controller.cancelWarp();
  }

  canStartWarp(userId, bannerType) {
    const controller = this.getWarpController(userId, bannerType);
    return controller.canStartWarp();
  }

  canCompleteWarp(userId, bannerType) {
    const controller = this.getWarpController(userId, bannerType);
    return controller.canCompleteWarp();
  }

  canCancelWarp(userId, bannerType) {
    const controller = this.getWarpController(userId, bannerType);
    return controller.canCancelWarp();
  }

  // New methods for Memento Pattern
  getWarpHistory(userId, bannerType) {
    const controller = this.getWarpController(userId, bannerType);
    return controller.caretaker.getAllMementos();
  }

  clearWarpHistory(userId, bannerType) {
    const controller = this.getWarpController(userId, bannerType);
    controller.caretaker.clearMementos();
  }
}

module.exports = BannerService;
