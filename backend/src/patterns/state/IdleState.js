const WarpState = require('./WarpState');

class IdleState extends WarpState {
  constructor() {
    super();
    this.name = 'idle';
  }

  async startWarp(warpController) {
    if (!this.canStartWarp()) {
      throw new Error('Cannot start warp in idle state');
    }

    // Emit warp_start event
    warpController.bannerService.eventEmitter.emit('warp_start', {
      userId: warpController.userId,
      bannerType: warpController.bannerType
    });

    await warpController.bannerService.startWarp(
      warpController.userId,
      warpController.bannerType
    );
    warpController.setState(warpController.warpingState);
  }

  canStartWarp() {
    return true;
  }

  canCompleteWarp() {
    return false;
  }

  canCancelWarp() {
    return false;
  }
}

module.exports = IdleState;
