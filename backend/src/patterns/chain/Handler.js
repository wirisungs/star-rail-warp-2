class Handler {
  constructor() {
    this.nextHandler = null;
  }

  setNext(handler) {
    this.nextHandler = handler;
    return handler;
  }

  async handle(request) {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return true;
  }
}

module.exports = Handler;
