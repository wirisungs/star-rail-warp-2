const { StandardPityStrategy, BeginnerPityStrategy, WeaponPityStrategy } = require('./PityStrategy');

class PityStrategyFactory {
  static createStrategy(bannerType) {
    const type = bannerType.toLowerCase();

    if (type.includes('beginner')) {
      return new BeginnerPityStrategy();
    }

    if (type.includes('weap')) {
      return new WeaponPityStrategy();
    }

    if (type.includes('char')) {
      return new StandardPityStrategy();
    }

    return new StandardPityStrategy();
  }
}

module.exports = PityStrategyFactory;
