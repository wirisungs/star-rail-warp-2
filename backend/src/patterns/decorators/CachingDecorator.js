const ServiceDecorator = require('./ServiceDecorator');

class CachingDecorator extends ServiceDecorator {
  constructor(service, cacheDuration = 60000) { // Default 1 minute cache
    super(service);
    this.cache = new Map();
    this.cacheDuration = cacheDuration;
  }

  async getBannerState(userId, bannerType) {
    const cacheKey = `banner_state_${userId}_${bannerType}`;
    const cachedData = this.getFromCache(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const result = await super.getBannerState(userId, bannerType);
    this.setCache(cacheKey, result);
    return result;
  }

  async updateBannerState(userId, bannerType, state) {
    const result = await super.updateBannerState(userId, bannerType, state);

    // Invalidate related caches
    this.invalidateCache(`banner_state_${userId}_${bannerType}`);

    return result;
  }

  calculatePity(userId, bannerType, currentPity, maxPity, softPity, rate) {
    const cacheKey = `pity_${userId}_${bannerType}_${currentPity}_${maxPity}_${softPity}_${rate}`;
    const cachedData = this.getFromCache(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const result = super.calculatePity(userId, bannerType, currentPity, maxPity, softPity, rate);
    this.setCache(cacheKey, result);
    return result;
  }

  calculateGuarantee(userId, bannerType, currentPity, maxPity, softPity, rate) {
    const cacheKey = `guarantee_${userId}_${bannerType}_${currentPity}_${maxPity}_${softPity}_${rate}`;
    const cachedData = this.getFromCache(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const result = super.calculateGuarantee(userId, bannerType, currentPity, maxPity, softPity, rate);
    this.setCache(cacheKey, result);
    return result;
  }

  getFromCache(key) {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > this.cacheDuration) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  invalidateCache(key) {
    this.cache.delete(key);
  }

  clearCache() {
    this.cache.clear();
  }
}

module.exports = CachingDecorator;
