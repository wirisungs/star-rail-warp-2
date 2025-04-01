const PityStrategyFactory = require('../strategies/PityStrategyFactory');
const WarpStats = require('../models/WarpStats');
const warpEventEmitter = require('../patterns/WarpEventEmitter');
const WarpController = require('../patterns/state/WarpController');

class BannerService {
  constructor() {
    this.repository = null;
    this.eventEmitter = null;
    this.strategies = new Map();
    this.warpControllers = new Map();
  }

  setRepository(repository) {
    this.repository = repository;
    return this;
  }

  setEventEmitter(eventEmitter) {
    this.eventEmitter = eventEmitter;
    return this;
  }

  setStrategy(type, strategy) {
    this.strategies.set(type, strategy);
    return this;
  }

  getStrategy(bannerType) {
    return this.strategies.get(bannerType);
  }

  async getBannerState(userId, bannerType) {
    return await this.repository.findOne({ userId, bannerType });
  }

  async updateBannerState(userId, bannerType, state) {
    return await this.repository.findOneAndUpdate(
      { userId, bannerType },
      { $set: state },
      { new: true }
    );
  }

  calculatePity(userId, bannerType, currentPity, maxPity, softPity, rate) {
    const pityStrategy = this.strategies.get('pity');
    const pity = pityStrategy.calculate(currentPity, maxPity, softPity, rate);

    // Emit pity update
    this.eventEmitter.emit('pity_update', {
      userId,
      bannerType,
      pity
    });
    return pity;
  }

  calculateGuarantee(userId, bannerType, currentPity, maxPity, softPity, rate) {
    const guaranteeStrategy = this.strategies.get('guarantee');
    const isGuaranteed = guaranteeStrategy.calculate(currentPity, maxPity, softPity, rate);

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
    const state = await this.getBannerState(userId, bannerType);
    if (!state) {
      throw new Error('Banner state not found');
    }
    this.eventEmitter.emit('warpStarted', { userId, bannerType });
    return state;
  }

  async completeWarp(userId, bannerType, result) {
    const state = await this.getBannerState(userId, bannerType);
    if (!state) {
      throw new Error('Banner state not found');
    }
    this.eventEmitter.emit('warpCompleted', { userId, bannerType, result });
    return result;
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
