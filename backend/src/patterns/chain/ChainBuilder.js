const ValidationHandler = require('./ValidationHandler');
const LoggingHandler = require('./LoggingHandler');
const Singleton = require('../Singleton');

class ChainBuilder extends Singleton {
  constructor() {
    super();
    if (this.initialized) return;

    this.chain = null;
    this.initialized = true;
  }

  build() {
    // Create handlers
    const validationHandler = new ValidationHandler();
    const loggingHandler = new LoggingHandler();

    // Build chain
    validationHandler.setNext(loggingHandler);
    this.chain = validationHandler;

    return this.chain;
  }

  async execute(request) {
    if (!this.chain) {
      this.build();
    }
    return this.chain.handle(request);
  }

  reset() {
    this.chain = null;
    this.initialized = false;
  }
}

module.exports = ChainBuilder;
