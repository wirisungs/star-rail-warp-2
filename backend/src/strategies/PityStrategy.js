class PityStrategy {
  calculatePity(currentPity, maxPity, softPity, rate) {
    throw new Error('Method not implemented');
  }

  calculateGuarantee(currentPity, maxPity, softPity, rate) {
    throw new Error('Method not implemented');
  }
}

class StandardPityStrategy extends PityStrategy {
  calculatePity(currentPity, maxPity, softPity, rate) {
    if (currentPity >= maxPity) return 1;
    if (currentPity >= softPity) {
      const softPityRate = rate + (currentPity - softPity) * 0.06;
      return Math.min(softPityRate, 1);
    }
    return rate;
  }

  calculateGuarantee(currentPity, maxPity, softPity, rate) {
    return currentPity >= maxPity;
  }
}

class BeginnerPityStrategy extends PityStrategy {
  calculatePity(currentPity, maxPity, softPity, rate) {
    if (currentPity >= 50) return 1;
    return rate;
  }

  calculateGuarantee(currentPity, maxPity, softPity, rate) {
    return currentPity >= 50;
  }
}

class WeaponPityStrategy extends PityStrategy {
  calculatePity(currentPity, maxPity, softPity, rate) {
    if (currentPity >= maxPity) return 1;
    if (currentPity >= softPity) {
      const softPityRate = rate + (currentPity - softPity) * 0.06;
      return Math.min(softPityRate, 1);
    }
    return rate;
  }

  calculateGuarantee(currentPity, maxPity, softPity, rate) {
    return currentPity >= maxPity;
  }
}

module.exports = {
  PityStrategy,
  StandardPityStrategy,
  BeginnerPityStrategy,
  WeaponPityStrategy
};
