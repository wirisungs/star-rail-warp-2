const EventEmitter = require('./EventEmitter');

class WarpEventEmitter extends EventEmitter {
  constructor() {
    super();
    this.EVENTS = {
      WARP_START: 'warp:start',
      WARP_COMPLETE: 'warp:complete',
      PITY_UPDATE: 'warp:pity:update',
      GUARANTEE_UPDATE: 'warp:guarantee:update',
      BANNER_STATE_CHANGE: 'warp:banner:state:change'
    };
  }

  emitWarpStart(userId, bannerType) {
    this.emit(this.EVENTS.WARP_START, { userId, bannerType });
  }

  emitWarpComplete(userId, bannerType, result) {
    this.emit(this.EVENTS.WARP_COMPLETE, { userId, bannerType, result });
  }

  emitPityUpdate(userId, bannerType, pity) {
    this.emit(this.EVENTS.PITY_UPDATE, { userId, bannerType, pity });
  }

  emitGuaranteeUpdate(userId, bannerType, isGuaranteed) {
    this.emit(this.EVENTS.GUARANTEE_UPDATE, { userId, bannerType, isGuaranteed });
  }

  emitBannerStateChange(userId, bannerType, state) {
    this.emit(this.EVENTS.BANNER_STATE_CHANGE, { userId, bannerType, state });
  }
}

module.exports = new WarpEventEmitter();
