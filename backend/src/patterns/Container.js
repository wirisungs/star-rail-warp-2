const MongooseWarpStatsRepository = require('./repositories/MongooseWarpStatsRepository');
const ConcretePityStrategyFactory = require('./factories/ConcretePityStrategyFactory');
const ConcreteEventEmitter = require('./emitters/ConcreteEventEmitter');
const BannerService = require('../services/BannerService');
const LoggingDecorator = require('./decorators/LoggingDecorator');
const CachingDecorator = require('./decorators/CachingDecorator');
const chainBuilder = require('./chain/ChainBuilder');
const Singleton = require('./Singleton');

class Container extends Singleton {
  constructor() {
    super();
    if (this.initialized) return;

    this.services = new Map();
    this.initialized = false;
  }

  initialize() {
    if (this.initialized) return;

    // Register dependencies
    this.services.set('warpStatsRepository', new MongooseWarpStatsRepository());
    this.services.set('pityStrategyFactory', new ConcretePityStrategyFactory());
    this.services.set('eventEmitter', ConcreteEventEmitter);

    // Create base service
    const baseService = new BannerService(
      this.services.get('warpStatsRepository'),
      this.services.get('pityStrategyFactory'),
      this.services.get('eventEmitter')
    );

    // Apply decorators
    const loggedService = new LoggingDecorator(baseService);
    const cachedService = new CachingDecorator(loggedService);

    // Register decorated service
    this.services.set('bannerService', cachedService);
    this.initialized = true;
  }

  getBannerService() {
    if (!this.initialized) {
      this.initialize();
    }
    return this.services.get('bannerService');
  }

  async executeRequest(request) {
    if (!this.initialized) {
      this.initialize();
    }
    return chainBuilder.execute(request);
  }

  reset() {
    this.services.clear();
    this.initialized = false;
  }
}

module.exports = Container;
