const ServiceFactory = require('./ServiceFactory');
const warpEventEmitter = require('./WarpEventEmitter');

class ServiceManager {
  constructor() {
    this.services = new Map();
  }

  async initializeService(type, config) {
    try {
      const service = ServiceFactory.createService(type, config);
      await service.connect();
      this.services.set(type, service);
      return service;
    } catch (error) {
      console.error(`Failed to initialize ${type} service:`, error);
      throw error;
    }
  }

  async disconnectService(type) {
    const service = this.services.get(type);
    if (service) {
      await service.disconnect();
      this.services.delete(type);
    }
  }

  async sendToService(type, data) {
    const service = this.services.get(type);
    if (!service) {
      throw new Error(`Service ${type} not initialized`);
    }
    return service.send(data);
  }

  async receiveFromService(type) {
    const service = this.services.get(type);
    if (!service) {
      throw new Error(`Service ${type} not initialized`);
    }
    return service.receive();
  }

  // Đăng ký các event listeners cho warp events
  setupWarpEventListeners() {
    warpEventEmitter.on(warpEventEmitter.EVENTS.WARP_START, async (data) => {
      // Gửi event đến tất cả các service đã kết nối
      for (const [type, service] of this.services) {
        try {
          await service.send({
            type: 'warp_start',
            data
          });
        } catch (error) {
          console.error(`Failed to send warp_start to ${type} service:`, error);
        }
      }
    });

    warpEventEmitter.on(warpEventEmitter.EVENTS.WARP_COMPLETE, async (data) => {
      for (const [type, service] of this.services) {
        try {
          await service.send({
            type: 'warp_complete',
            data
          });
        } catch (error) {
          console.error(`Failed to send warp_complete to ${type} service:`, error);
        }
      }
    });
  }
}

module.exports = new ServiceManager();
