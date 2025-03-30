const ServiceManager = require('../ServiceManager');
const WebSocketAdapter = require('../adapters/WebSocketAdapter');
const HttpAdapter = require('../adapters/HttpAdapter');

// Mock WebSocket
jest.mock('ws', () => {
  return jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    send: jest.fn(),
    close: jest.fn()
  }));
});

// Mock axios
jest.mock('axios', () => {
  return {
    create: jest.fn().mockReturnValue({
      post: jest.fn(),
      get: jest.fn()
    })
  };
});

describe('ServiceManager', () => {
  beforeEach(() => {
    // Clear all services before each test
    ServiceManager.services.clear();
  });

  describe('WebSocket Service', () => {
    test('should initialize WebSocket service', async () => {
      const config = { url: 'ws://localhost:8080' };
      const service = await ServiceManager.initializeService('websocket', config);
      expect(service).toBeInstanceOf(WebSocketAdapter);
      expect(ServiceManager.services.has('websocket')).toBe(true);
    });

    test('should disconnect WebSocket service', async () => {
      const config = { url: 'ws://localhost:8080' };
      await ServiceManager.initializeService('websocket', config);
      await ServiceManager.disconnectService('websocket');
      expect(ServiceManager.services.has('websocket')).toBe(false);
    });
  });

  describe('HTTP Service', () => {
    test('should initialize HTTP service', async () => {
      const config = { baseURL: 'http://localhost:8080' };
      const service = await ServiceManager.initializeService('http', config);
      expect(service).toBeInstanceOf(HttpAdapter);
      expect(ServiceManager.services.has('http')).toBe(true);
    });

    test('should disconnect HTTP service', async () => {
      const config = { baseURL: 'http://localhost:8080' };
      await ServiceManager.initializeService('http', config);
      await ServiceManager.disconnectService('http');
      expect(ServiceManager.services.has('http')).toBe(false);
    });
  });

  describe('Service Communication', () => {
    test('should send data to WebSocket service', async () => {
      const config = { url: 'ws://localhost:8080' };
      await ServiceManager.initializeService('websocket', config);
      const data = { message: 'test' };
      await ServiceManager.sendToService('websocket', data);
      const service = ServiceManager.services.get('websocket');
      expect(service.ws.send).toHaveBeenCalledWith(JSON.stringify(data));
    });

    test('should send data to HTTP service', async () => {
      const config = { baseURL: 'http://localhost:8080' };
      await ServiceManager.initializeService('http', config);
      const data = { message: 'test' };
      await ServiceManager.sendToService('http', data);
      const service = ServiceManager.services.get('http');
      expect(service.client.post).toHaveBeenCalledWith('/send', data);
    });

    test('should receive data from WebSocket service', async () => {
      const config = { url: 'ws://localhost:8080' };
      await ServiceManager.initializeService('websocket', config);
      const mockData = { message: 'test' };
      const service = ServiceManager.services.get('websocket');
      service.ws.once.mockImplementation((event, callback) => {
        if (event === 'message') {
          callback(JSON.stringify(mockData));
        }
      });
      const data = await ServiceManager.receiveFromService('websocket');
      expect(data).toEqual(mockData);
    });

    test('should receive data from HTTP service', async () => {
      const config = { baseURL: 'http://localhost:8080' };
      await ServiceManager.initializeService('http', config);
      const mockData = { message: 'test' };
      const service = ServiceManager.services.get('http');
      service.client.get.mockResolvedValue({ data: mockData });
      const data = await ServiceManager.receiveFromService('http');
      expect(data).toEqual(mockData);
    });
  });

  describe('Error Handling', () => {
    test('should throw error for uninitialized service', async () => {
      await expect(ServiceManager.sendToService('unknown', {}))
        .rejects
        .toThrow('Service unknown not initialized');
    });

    test('should throw error for unsupported service type', async () => {
      await expect(ServiceManager.initializeService('unknown', {}))
        .rejects
        .toThrow('Unsupported service type: unknown');
    });
  });
});
