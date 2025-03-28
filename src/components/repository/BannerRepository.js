class BannerRepository {
  constructor() {
    this.storage = localStorage;
  }

  // Save banner state
  saveBannerState(type, state) {
    const prefix = this.getPrefix(type);
    this.storage.setItem(`${prefix}RateFive`, state.rateFive);
    this.storage.setItem(`${prefix}RateFour`, state.rateFour);
    this.storage.setItem(`${prefix}HardPity`, state.maxPity);
    this.storage.setItem(`${prefix}SoftPity`, state.softPity);
    this.storage.setItem(`${prefix}GuaranteeFive`, state.guaranteeFive);
    this.storage.setItem(`${prefix}GuaranteeFour`, state.guaranteeFour);
    this.storage.setItem(`${prefix}PityFive`, state.pityFive);
    this.storage.setItem(`${prefix}PityFour`, state.pityFour);

    if (type === 'standard') {
      this.storage.setItem('standardTypeCount', state.typeCount);
    }
  }

  // Load banner state
  loadBannerState(type) {
    const prefix = this.getPrefix(type);
    return {
      rateFive: parseInt(this.storage.getItem(`${prefix}RateFive`)) || this.getDefaultRate(type, 'five'),
      rateFour: parseInt(this.storage.getItem(`${prefix}RateFour`)) || this.getDefaultRate(type, 'four'),
      maxPity: parseInt(this.storage.getItem(`${prefix}HardPity`)) || this.getDefaultPity(type, 'max'),
      softPity: parseInt(this.storage.getItem(`${prefix}SoftPity`)) || this.getDefaultPity(type, 'soft'),
      guaranteeFive: this.storage.getItem(`${prefix}GuaranteeFive`) === "true",
      guaranteeFour: this.storage.getItem(`${prefix}GuaranteeFour`) === "true",
      pityFive: parseInt(this.storage.getItem(`${prefix}PityFive`)) || 0,
      pityFour: parseInt(this.storage.getItem(`${prefix}PityFour`)) || 0,
      ...(type === 'standard' && {
        typeCount: parseInt(this.storage.getItem('standardTypeCount')) || 0
      })
    };
  }

  // Reset banner state
  resetBannerState(type) {
    const prefix = this.getPrefix(type);
    this.storage.removeItem(`${prefix}RateFive`);
    this.storage.removeItem(`${prefix}RateFour`);
    this.storage.removeItem(`${prefix}HardPity`);
    this.storage.removeItem(`${prefix}SoftPity`);
    this.storage.removeItem(`${prefix}GuaranteeFive`);
    this.storage.removeItem(`${prefix}GuaranteeFour`);
    this.storage.removeItem(`${prefix}PityFive`);
    this.storage.removeItem(`${prefix}PityFour`);

    if (type === 'standard') {
      this.storage.removeItem('standardTypeCount');
    }
  }

  // Get prefix for storage keys
  getPrefix(type) {
    const prefixes = {
      beginner: 'beg',
      char: 'char',
      weap: 'weap',
      standard: 'stand'
    };
    return prefixes[type] || '';
  }

  // Get default rates based on banner type
  getDefaultRate(type, star) {
    const rates = {
      beginner: { five: 0.006, four: 0.051 },
      char: { five: 0.006, four: 0.051 },
      weap: { five: 0.008, four: 0.066 },
      standard: { five: 0.006, four: 0.051 }
    };
    return rates[type]?.[star] || 0.006;
  }

  // Get default pity values based on banner type
  getDefaultPity(type, kind) {
    const pities = {
      beginner: { max: 50, soft: 50 },
      char: { max: 90, soft: 75 },
      weap: { max: 80, soft: 65 },
      standard: { max: 90, soft: 75 }
    };
    return pities[type]?.[kind] || 90;
  }
}

// Create a singleton instance
const bannerRepository = new BannerRepository();
export default bannerRepository;
