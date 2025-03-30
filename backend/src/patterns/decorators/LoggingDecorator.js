const ServiceDecorator = require('./ServiceDecorator');

class LoggingDecorator extends ServiceDecorator {
  async getBannerState(userId, bannerType) {
    console.log(`Getting banner state for user ${userId}, banner ${bannerType}`);
    const result = await super.getBannerState(userId, bannerType);
    console.log(`Banner state: ${JSON.stringify(result)}`);
    return result;
  }

  async updateBannerState(userId, bannerType, state) {
    console.log(`Updating banner state for user ${userId}, banner ${bannerType}`);
    console.log(`New state: ${JSON.stringify(state)}`);
    const result = await super.updateBannerState(userId, bannerType, state);
    console.log(`Update result: ${JSON.stringify(result)}`);
    return result;
  }

  calculatePity(userId, bannerType, currentPity, maxPity, softPity, rate) {
    console.log(`Calculating pity for user ${userId}, banner ${bannerType}`);
    console.log(`Current pity: ${currentPity}, Max pity: ${maxPity}`);
    const result = super.calculatePity(userId, bannerType, currentPity, maxPity, softPity, rate);
    console.log(`Calculated pity: ${result}`);
    return result;
  }

  calculateGuarantee(userId, bannerType, currentPity, maxPity, softPity, rate) {
    console.log(`Calculating guarantee for user ${userId}, banner ${bannerType}`);
    console.log(`Current pity: ${currentPity}, Max pity: ${maxPity}`);
    const result = super.calculateGuarantee(userId, bannerType, currentPity, maxPity, softPity, rate);
    console.log(`Is guaranteed: ${result}`);
    return result;
  }

  async startWarp(userId, bannerType) {
    console.log(`Starting warp for user ${userId}, banner ${bannerType}`);
    const result = await super.startWarp(userId, bannerType);
    console.log(`Warp started successfully`);
    return result;
  }

  async completeWarp(userId, bannerType, result) {
    console.log(`Completing warp for user ${userId}, banner ${bannerType}`);
    console.log(`Warp result: ${JSON.stringify(result)}`);
    const finalResult = await super.completeWarp(userId, bannerType, result);
    console.log(`Warp completed successfully`);
    return finalResult;
  }
}

module.exports = LoggingDecorator;
