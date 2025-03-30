const WebSocketAdapter = require('./adapters/WebSocketAdapter');
const HttpAdapter = require('./adapters/HttpAdapter');

class ServiceFactory {
  static createService(type, config) {
    switch (type.toLowerCase()) {
      case 'websocket':
        return new WebSocketAdapter(config.url);
      case 'http':
        return new HttpAdapter(config.baseURL);
      default:
        throw new Error(`Unsupported service type: ${type}`);
    }
  }
}

module.exports = ServiceFactory;
