import { RateCalculator, RateStrategyFactory } from '../strategy/RateStrategy';
import bannerObserver from '../observer/BannerObserver';
import bannerRepository from '../repository/BannerRepository';
import { BannerDecoratorFactory } from '../decorator/BannerDecorator';

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
    this.saveState();
    this.notifyObservers();
  }

  updatePityFour(value) {
    this.pityFour = value;
    this.saveState();
    this.notifyObservers();
  }

  updateGuaranteeFive(value) {
    this.guaranteeFive = value;
    this.saveState();
    this.notifyObservers();
  }

  updateGuaranteeFour(value) {
    this.guaranteeFour = value;
    this.saveState();
    this.notifyObservers();
  }

  // Save state to repository
  saveState() {
    bannerRepository.saveBannerState(this.type, this.getConfig());
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
    const state = bannerRepository.loadBannerState('beginner');
    super({
      type: 'beginner',
      ...state
    });
  }
}

class CharacterBanner extends Banner {
  constructor() {
    const state = bannerRepository.loadBannerState('char');
    super({
      type: 'char',
      ...state
    });
  }
}

class WeaponBanner extends Banner {
  constructor() {
    const state = bannerRepository.loadBannerState('weap');
    super({
      type: 'weap',
      ...state
    });
  }
}

class StandardBanner extends Banner {
  constructor() {
    const state = bannerRepository.loadBannerState('standard');
    super({
      type: 'standard',
      ...state
    });
    this.typeCount = state.typeCount;
  }

  getConfig() {
    return {
      ...super.getConfig(),
      typeCount: this.typeCount
    };
  }

  updateTypeCount(value) {
    this.typeCount = value;
    this.saveState();
    this.notifyObservers();
  }
}

class BannerFactory {
  static createBanner(type, options = { animated: true, sound: true, logged: false }) {
    let banner;

    switch (type) {
      case 'beginner':
        banner = new BeginnerBanner();
        break;
      case 'char':
        banner = new CharacterBanner();
        break;
      case 'weap':
        banner = new WeaponBanner();
        break;
      case 'standard':
        banner = new StandardBanner();
        break;
      default:
        throw new Error(`Invalid banner type: ${type}`);
    }

    // Apply decorators based on options
    return BannerDecoratorFactory.createDecoratedBanner(banner, options);
  }
}

export default BannerFactory;
