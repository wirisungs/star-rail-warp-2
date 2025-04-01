const MongooseWarpStatsRepository = require('./repositories/MongooseWarpStatsRepository');
const ServiceFactory = require('./factories/ServiceFactory');
const StrategyFactory = require('./factories/StrategyFactory');
const ConcreteEventEmitter = require('./emitters/ConcreteEventEmitter');
const LoggingDecorator = require('./decorators/LoggingDecorator');
const CachingDecorator = require('./decorators/CachingDecorator');
const chainBuilder = require('./chain/ChainBuilder');
const Singleton = require('./Singleton');

class Container extends Singleton {
  constructor() {
    super();
    if (this.initialized) return;

    this.services = new Map();
    this.factories = new Map();
    this.initialized = false;
  }

  initialize() {
    if (this.initialized) return;

    // Register factories
    this.factories.set('service', new ServiceFactory());
    this.factories.set('strategy', new StrategyFactory());

    // Register dependencies
    this.services.set('warpStatsRepository', new MongooseWarpStatsRepository());
    this.services.set('eventEmitter', ConcreteEventEmitter);

    // Create services using factories
    const bannerService = this.factories.get('service').createService('banner');
    const warpService = this.factories.get('service').createService('warp');
    const authService = this.factories.get('service').createService('auth');

    // Create strategies using factory
    const pityStrategy = this.factories.get('strategy').createService('pity');
    const guaranteeStrategy = this.factories.get('strategy').createService('guarantee');
    const rateStrategy = this.factories.get('strategy').createService('rate');

    // Apply decorators to services
    const loggedBannerService = new LoggingDecorator(bannerService);
    const cachedBannerService = new CachingDecorator(loggedBannerService);

    // Register decorated services
    this.services.set('bannerService', cachedBannerService);
    this.services.set('warpService', warpService);
    this.services.set('authService', authService);

    // Register strategies
    this.services.set('pityStrategy', pityStrategy);
    this.services.set('guaranteeStrategy', guaranteeStrategy);
    this.services.set('rateStrategy', rateStrategy);

    this.initialized = true;
  }

  getService(type) {
    if (!this.initialized) {
      this.initialize();
    }
    return this.services.get(type);
  }

  getFactory(type) {
    if (!this.initialized) {
      this.initialize();
    }
    return this.factories.get(type);
  }

  async executeRequest(request) {
    if (!this.initialized) {
      this.initialize();
    }
    return chainBuilder.execute(request);
  }
}

module.exports = Container;
