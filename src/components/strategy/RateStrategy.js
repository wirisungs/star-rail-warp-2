// Base Strategy class
class RateStrategy {
  calculateRate(pity, maxPity, softPity, baseRate) {
    throw new Error('calculateRate method must be implemented');
  }
}

// Concrete Strategy for Beginner Banner
class BeginnerRateStrategy extends RateStrategy {
  calculateRate(pity, maxPity, softPity, baseRate) {
    if (pity >= maxPity) return 1;
    if (pity >= softPity) {
      const softPityRate = baseRate + (pity - softPity) * 0.06;
      return Math.min(softPityRate, 1);
    }
    return baseRate;
  }
}

// Concrete Strategy for Character Banner
class CharacterRateStrategy extends RateStrategy {
  calculateRate(pity, maxPity, softPity, baseRate) {
    if (pity >= maxPity) return 1;
    if (pity >= softPity) {
      const softPityRate = baseRate + (pity - softPity) * 0.06;
      return Math.min(softPityRate, 1);
    }
    return baseRate;
  }
}

// Concrete Strategy for Weapon Banner
class WeaponRateStrategy extends RateStrategy {
  calculateRate(pity, maxPity, softPity, baseRate) {
    if (pity >= maxPity) return 1;
    if (pity >= softPity) {
      const softPityRate = baseRate + (pity - softPity) * 0.06;
      return Math.min(softPityRate, 1);
    }
    return baseRate;
  }
}

// Concrete Strategy for Standard Banner
class StandardRateStrategy extends RateStrategy {
  calculateRate(pity, maxPity, softPity, baseRate) {
    if (pity >= maxPity) return 1;
    if (pity >= softPity) {
      const softPityRate = baseRate + (pity - softPity) * 0.06;
      return Math.min(softPityRate, 1);
    }
    return baseRate;
  }
}

// Context class that uses the strategy
class RateCalculator {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  calculateRate(pity, maxPity, softPity, baseRate) {
    return this.strategy.calculateRate(pity, maxPity, softPity, baseRate);
  }
}

// Factory for creating strategies
class RateStrategyFactory {
  static createStrategy(type) {
    switch (type) {
      case 'beginner':
        return new BeginnerRateStrategy();
      case 'char':
        return new CharacterRateStrategy();
      case 'weap':
        return new WeaponRateStrategy();
      case 'standard':
        return new StandardRateStrategy();
      default:
        throw new Error(`Invalid strategy type: ${type}`);
    }
  }
}

export { RateCalculator, RateStrategyFactory };
