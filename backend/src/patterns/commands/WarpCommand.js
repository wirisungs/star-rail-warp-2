class WarpCommand {
  constructor(bannerService, userId, bannerType) {
    this.bannerService = bannerService;
    this.userId = userId;
    this.bannerType = bannerType;
    this.executed = false;
  }

  async execute() {
    if (this.executed) {
      throw new Error('Command already executed');
    }
    this.executed = true;
  }

  async undo() {
    if (!this.executed) {
      throw new Error('Command not executed yet');
    }
    this.executed = false;
  }
}

module.exports = WarpCommand;
