const Handler = require('./Handler');

class LoggingHandler extends Handler {
  async handle(request) {
    console.log(`[${new Date().toISOString()}] Processing request:`, {
      userId: request.userId,
      bannerType: request.bannerType,
      action: request.action
    });

    try {
      const result = await super.handle(request);
      console.log(`[${new Date().toISOString()}] Request completed successfully:`, result);
      return result;
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Request failed:`, error);
      throw error;
    }
  }
}

module.exports = LoggingHandler;
