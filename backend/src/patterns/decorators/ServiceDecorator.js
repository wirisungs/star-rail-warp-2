class ServiceDecorator {
  constructor(service) {
    this.service = service;
  }

  async getBannerState(userId, bannerType) {
    return this.service.getBannerState(userId, bannerType);
  }

  async updateBannerState(userId, bannerType, state) {
    return this.service.updateBannerState(userId, bannerType, state);
  }

  calculatePity(userId, bannerType, currentPity, maxPity, softPity, rate) {
    return this.service.calculatePity(userId, bannerType, currentPity, maxPity, softPity, rate);
  }

  calculateGuarantee(userId, bannerType, currentPity, maxPity, softPity, rate) {
    return this.service.calculateGuarantee(userId, bannerType, currentPity, maxPity, softPity, rate);
  }

  async startWarp(userId, bannerType) {
    return this.service.startWarp(userId, bannerType);
  }

  async completeWarp(userId, bannerType, result) {
    return this.service.completeWarp(userId, bannerType, result);
  }
}

module.exports = ServiceDecorator;
