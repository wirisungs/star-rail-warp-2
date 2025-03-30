class IEventEmitter {
  on(event, callback) {
    throw new Error('Method on() must be implemented');
  }

  emit(event, data) {
    throw new Error('Method emit() must be implemented');
  }

  off(event, callback) {
    throw new Error('Method off() must be implemented');
  }
}

module.exports = IEventEmitter;
