const warpEventEmitter = require('../WarpEventEmitter');
const IEventEmitter = require('../interfaces/IEventEmitter');

class ConcreteEventEmitter extends IEventEmitter {
  on(event, callback) {
    warpEventEmitter.on(event, callback);
  }

  emit(event, data) {
    warpEventEmitter.emit(event, data);
  }

  off(event, callback) {
    warpEventEmitter.off(event, callback);
  }
}

module.exports = new ConcreteEventEmitter();
