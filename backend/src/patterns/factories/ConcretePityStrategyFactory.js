const PityStrategyFactory = require('../ServiceFactory');
const IPityStrategyFactory = require('../interfaces/IPityStrategyFactory');

class ConcretePityStrategyFactory extends IPityStrategyFactory {
  createStrategy(bannerType) {
    return PityStrategyFactory.createStrategy(bannerType);
  }
}

module.exports = ConcretePityStrategyFactory;
