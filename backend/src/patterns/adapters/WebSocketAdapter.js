const WebSocket = require('ws');
const ExternalServiceInterface = require('../ExternalServiceInterface');

class WebSocketAdapter extends ExternalServiceInterface {
  constructor(url) {
    super();
    this.url = url;
    this.ws = null;
    this.connected = false;
  }

  async connect() {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url);

        this.ws.on('open', () => {
          this.connected = true;
          resolve();
        });

        this.ws.on('error', (error) => {
          this.connected = false;
          reject(error);
        });

        this.ws.on('close', () => {
          this.connected = false;
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async disconnect() {
    if (this.ws) {
      this.ws.close();
      this.connected = false;
    }
  }

  async send(data) {
    if (!this.connected) {
      throw new Error('WebSocket is not connected');
    }

    return new Promise((resolve, reject) => {
      try {
        this.ws.send(JSON.stringify(data), (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async receive() {
    if (!this.connected) {
      throw new Error('WebSocket is not connected');
    }

    return new Promise((resolve, reject) => {
      try {
        this.ws.once('message', (data) => {
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
          } catch (error) {
            reject(error);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = WebSocketAdapter;
