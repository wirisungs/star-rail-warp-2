class WarpMemento {
  constructor(userId, bannerType, state, result) {
    this.userId = userId;
    this.bannerType = bannerType;
    this.state = state;
    this.result = result;
    this.timestamp = new Date();
  }

  getState() {
    return {
      userId: this.userId,
      bannerType: this.bannerType,
      state: this.state,
      result: this.result,
      timestamp: this.timestamp
    };
  }
}

module.exports = WarpMemento;
