const IFactory = require('../interfaces/IFactory');
const PityStrategy = require('../strategies/PityStrategy');
const GuaranteeStrategy = require('../strategies/GuaranteeStrategy');
const RateStrategy = require('../strategies/RateStrategy');

class StrategyFactory extends IFactory {

    createService(type) {
        switch(type.toLowerCase()) {
            case 'pity':
                return new PityStrategy();
            case 'guarantee':
                return new GuaranteeStrategy();
            case 'rate':
                return new RateStrategy();
            default:
                throw new Error(`Strategy type ${type} is not supported`);
        }
    }
}

module.exports = StrategyFactory;
