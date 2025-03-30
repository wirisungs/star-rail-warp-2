const WarpState = require('./WarpState');

class WarpingState extends WarpState {
  constructor() {
    super();
    this.name = 'warping';
  }

  async completeWarp(warpController) {
    if (!this.canCompleteWarp()) {
      throw new Error('Cannot complete warp in warping state');
    }

    // Emit warp_complete event
    warpController.bannerService.eventEmitter.emit('warp_complete', {
      userId: warpController.userId,
      bannerType: warpController.bannerType,
      result: warpController.result
    });

    await warpController.bannerService.completeWarp(warpController.userId);
    warpController.setState(warpController.idleState);
  }

  async cancelWarp(warpController) {
    if (!this.canCancelWarp()) {
      throw new Error('Cannot cancel warp in warping state');
    }

    // Emit warp_cancel event
    warpController.bannerService.eventEmitter.emit('warp_cancel', {
      userId: warpController.userId,
      bannerType: warpController.bannerType
    });

    await warpController.bannerService.cancelWarp(warpController.userId);
    warpController.setState(warpController.idleState);
  }

  canStartWarp() {
    return false;
  }

  canCompleteWarp() {
    return true;
  }

  canCancelWarp() {
    return true;
  }
}

module.exports = WarpingState;
