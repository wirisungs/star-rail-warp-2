class WarpState {
  constructor() {
    this.name = 'base';
  }

  async startWarp(warpController) {
    throw new Error('Method startWarp() must be implemented');
  }

  async completeWarp(warpController) {
    throw new Error('Method completeWarp() must be implemented');
  }

  async cancelWarp(warpController) {
    throw new Error('Method cancelWarp() must be implemented');
  }

  canStartWarp() {
    return false;
  }

  canCompleteWarp() {
    return false;
  }

  canCancelWarp() {
    return false;
  }
}

module.exports = WarpState;
