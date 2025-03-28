import soundService from '../services/SoundService';

// Base Decorator class
class BannerDecorator {
  constructor(banner) {
    this.banner = banner;
  }

  getConfig() {
    return this.banner.getConfig();
  }

  calculateFiveStarRate() {
    return this.banner.calculateFiveStarRate();
  }

  calculateFourStarRate() {
    return this.banner.calculateFourStarRate();
  }

  updatePityFive(value) {
    return this.banner.updatePityFive(value);
  }

  updatePityFour(value) {
    return this.banner.updatePityFour(value);
  }

  updateGuaranteeFive(value) {
    return this.banner.updateGuaranteeFive(value);
  }

  updateGuaranteeFour(value) {
    return this.banner.updateGuaranteeFour(value);
  }

  notifyObservers() {
    return this.banner.notifyObservers();
  }
}

// Animation Decorator
class AnimatedBannerDecorator extends BannerDecorator {
  constructor(banner) {
    super(banner);
    this.animationDuration = 1000; // 1 second
  }

  updatePityFive(value) {
    this.playAnimation('pity-five-update');
    return this.banner.updatePityFive(value);
  }

  updatePityFour(value) {
    this.playAnimation('pity-four-update');
    return this.banner.updatePityFour(value);
  }

  playAnimation(type) {
    // Emit animation event that can be listened to by UI components
    const event = new CustomEvent('banner-animation', {
      detail: {
        type,
        duration: this.animationDuration
      }
    });
    window.dispatchEvent(event);
  }
}

// Sound Effects Decorator
class SoundBannerDecorator extends BannerDecorator {
  constructor(banner) {
    super(banner);
  }

  updatePityFive(value) {
    soundService.playSound('five');
    return this.banner.updatePityFive(value);
  }

  updatePityFour(value) {
    soundService.playSound('four');
    return this.banner.updatePityFour(value);
  }

  updateGuaranteeFive(value) {
    soundService.playSound('button-select');
    return this.banner.updateGuaranteeFive(value);
  }

  updateGuaranteeFour(value) {
    soundService.playSound('button-select');
    return this.banner.updateGuaranteeFour(value);
  }
}

// Logging Decorator
class LoggedBannerDecorator extends BannerDecorator {
  constructor(banner) {
    super(banner);
  }

  updatePityFive(value) {
    console.log(`Updating 5-star pity from ${this.banner.pityFive} to ${value}`);
    return this.banner.updatePityFive(value);
  }

  updatePityFour(value) {
    console.log(`Updating 4-star pity from ${this.banner.pityFour} to ${value}`);
    return this.banner.updatePityFour(value);
  }

  updateGuaranteeFive(value) {
    console.log(`Updating 5-star guarantee to ${value}`);
    return this.banner.updateGuaranteeFive(value);
  }

  updateGuaranteeFour(value) {
    console.log(`Updating 4-star guarantee to ${value}`);
    return this.banner.updateGuaranteeFour(value);
  }
}

// Factory for creating decorated banners
class BannerDecoratorFactory {
  static createDecoratedBanner(banner, options = {}) {
    let decoratedBanner = banner;

    if (options.animated) {
      decoratedBanner = new AnimatedBannerDecorator(decoratedBanner);
    }

    if (options.sound) {
      decoratedBanner = new SoundBannerDecorator(decoratedBanner);
    }

    if (options.logged) {
      decoratedBanner = new LoggedBannerDecorator(decoratedBanner);
    }

    return decoratedBanner;
  }
}

export { BannerDecoratorFactory };
