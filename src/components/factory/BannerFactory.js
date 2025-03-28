import { RateCalculator, RateStrategyFactory } from '../strategy/RateStrategy';
import bannerObserver from '../observer/BannerObserver';

class Banner {
  constructor(config) {
    this.rateFive = config.rateFive || 0.006;
    this.rateFour = config.rateFour || 0.051;
    this.maxPity = config.maxPity || 90;
    this.softPity = config.softPity || 75;
    this.guaranteeFive = config.guaranteeFive || false;
    this.guaranteeFour = config.guaranteeFour || false;
    this.pityFive = config.pityFive || 0;
    this.pityFour = config.pityFour || 0;
    this.rateCalculator = new RateCalculator(RateStrategyFactory.createStrategy(config.type));
    this.type = config.type;
  }

  getConfig() {
    return {
      rateFive: this.rateFive,
      rateFour: this.rateFour,
      maxPity: this.maxPity,
      softPity: this.softPity,
      guaranteeFive: this.guaranteeFive,
      guaranteeFour: this.guaranteeFour,
      pityFive: this.pityFive,
      pityFour: this.pityFour
    };
  }

  calculateFiveStarRate() {
    return this.rateCalculator.calculateRate(
      this.pityFive,
      this.maxPity,
      this.softPity,
      this.rateFive
    );
  }

  calculateFourStarRate() {
    return this.rateCalculator.calculateRate(
      this.pityFour,
      this.maxPity,
      this.softPity,
      this.rateFour
    );
  }

  // Methods to update banner state
  updatePityFive(value) {
    this.pityFive = value;
    this.notifyObservers();
  }

  updatePityFour(value) {
    this.pityFour = value;
    this.notifyObservers();
  }

  updateGuaranteeFive(value) {
    this.guaranteeFive = value;
    this.notifyObservers();
  }

  updateGuaranteeFour(value) {
    this.guaranteeFour = value;
    this.notifyObservers();
  }

  // Method to notify observers of state changes
  notifyObservers() {
    bannerObserver.notify({
      type: this.type,
      config: this.getConfig(),
      fiveStarRate: this.calculateFiveStarRate(),
      fourStarRate: this.calculateFourStarRate()
    });
  }
}

class BeginnerBanner extends Banner {
  constructor() {
    super({
      type: 'beginner',
      rateFive: parseInt(localStorage.getItem("begRateFive")) || 0.006,
      rateFour: parseInt(localStorage.getItem("begRateFour")) || 0.051,
      maxPity: parseInt(localStorage.getItem("begHardPity")) || 50,
      softPity: parseInt(localStorage.getItem("begSoftPity")) || 50,
      guaranteeFive: localStorage.getItem("begGuaranteeFive") === "true",
      guaranteeFour: localStorage.getItem("begGuaranteeFour") === "true",
      pityFive: parseInt(localStorage.getItem("begPityFive")) || 0,
      pityFour: parseInt(localStorage.getItem("begPityFour")) || 0
    });
  }
}

class CharacterBanner extends Banner {
  constructor() {
    super({
      type: 'char',
      rateFive: parseInt(localStorage.getItem("charRateFive")) || 0.006,
      rateFour: parseInt(localStorage.getItem("charRateFour")) || 0.051,
      maxPity: parseInt(localStorage.getItem("charHardPity")) || 90,
      softPity: parseInt(localStorage.getItem("charSoftPity")) || 75,
      guaranteeFive: localStorage.getItem("charGuaranteeFive") === "true",
      guaranteeFour: localStorage.getItem("charGuaranteeFour") === "true",
      pityFive: parseInt(localStorage.getItem("charPityFive")) || 0,
      pityFour: parseInt(localStorage.getItem("charPityFour")) || 0
    });
  }
}

class WeaponBanner extends Banner {
  constructor() {
    super({
      type: 'weap',
      rateFive: parseInt(localStorage.getItem("weapRateFive")) || 0.008,
      rateFour: parseInt(localStorage.getItem("weapRateFour")) || 0.066,
      maxPity: parseInt(localStorage.getItem("weapHardPity")) || 80,
      softPity: parseInt(localStorage.getItem("weapSoftPity")) || 65,
      guaranteeFive: localStorage.getItem("weapGuaranteeFive") === "true",
      guaranteeFour: localStorage.getItem("weapGuaranteeFour") === "true",
      pityFive: parseInt(localStorage.getItem("weapPityFive")) || 0,
      pityFour: parseInt(localStorage.getItem("weapPityFour")) || 0
    });
  }
}

class StandardBanner extends Banner {
  constructor() {
    super({
      type: 'standard',
      rateFive: parseInt(localStorage.getItem("standRateFive")) || 0.006,
      rateFour: parseInt(localStorage.getItem("standRateFour")) || 0.051,
      maxPity: parseInt(localStorage.getItem("standHardPity")) || 90,
      softPity: parseInt(localStorage.getItem("standSoftPity")) || 75,
      guaranteeFive: localStorage.getItem("standGuaranteeFive") === "true",
      guaranteeFour: localStorage.getItem("standGuaranteeFour") === "true",
      pityFive: parseInt(localStorage.getItem("standPityFive")) || 0,
      pityFour: parseInt(localStorage.getItem("standPityFour")) || 0
    });
    this.typeCount = parseInt(localStorage.getItem("standardTypeCount")) || 0;
  }

  getConfig() {
    return {
      ...super.getConfig(),
      typeCount: this.typeCount
    };
  }
}

class BannerFactory {
  static createBanner(type) {
    switch (type) {
      case 'beginner':
        return new BeginnerBanner();
      case 'char':
        return new CharacterBanner();
      case 'weap':
        return new WeaponBanner();
      case 'standard':
        return new StandardBanner();
      default:
        throw new Error(`Invalid banner type: ${type}`);
    }
  }
}

export default BannerFactory;
