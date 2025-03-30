const axios = require('axios');
const ExternalServiceInterface = require('../ExternalServiceInterface');

class HttpAdapter extends ExternalServiceInterface {
  constructor(baseURL) {
    super();
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async connect() {
    // HTTP không cần kết nối trước
    return Promise.resolve();
  }

  async disconnect() {
    // HTTP không cần ngắt kết nối
    return Promise.resolve();
  }

  async send(data) {
    try {
      const response = await this.client.post('/send', data);
      return response.data;
    } catch (error) {
      throw new Error(`HTTP send error: ${error.message}`);
    }
  }

  async receive() {
    try {
      const response = await this.client.get('/receive');
      return response.data;
    } catch (error) {
      throw new Error(`HTTP receive error: ${error.message}`);
    }
  }
}

module.exports = HttpAdapter;
