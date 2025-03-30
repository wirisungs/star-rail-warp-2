class ExternalServiceInterface {
  async connect() {
    throw new Error('Method connect() must be implemented');
  }

  async disconnect() {
    throw new Error('Method disconnect() must be implemented');
  }

  async send(data) {
    throw new Error('Method send() must be implemented');
  }

  async receive() {
    throw new Error('Method receive() must be implemented');
  }
}

module.exports = ExternalServiceInterface;
