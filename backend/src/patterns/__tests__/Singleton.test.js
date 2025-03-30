const Container = require('../Container');
const CommandInvoker = require('../commands/CommandInvoker');
const ChainBuilder = require('../chain/ChainBuilder');

describe('Singleton Pattern', () => {
  describe('Container', () => {
    test('should return the same instance', () => {
      const instance1 = Container.getInstance();
      const instance2 = Container.getInstance();
      expect(instance1).toBe(instance2);
    });

    test('should maintain state between instances', () => {
      const instance1 = Container.getInstance();
      instance1.initialize();

      const instance2 = Container.getInstance();
      expect(instance2.initialized).toBe(true);
    });

    test('should reset properly', () => {
      const instance = Container.getInstance();
      instance.initialize();
      instance.reset();
      expect(instance.initialized).toBe(false);
    });
  });

  describe('CommandInvoker', () => {
    test('should return the same instance', () => {
      const instance1 = CommandInvoker.getInstance();
      const instance2 = CommandInvoker.getInstance();
      expect(instance1).toBe(instance2);
    });

    test('should maintain command history between instances', () => {
      const instance1 = CommandInvoker.getInstance();
      instance1.commandHistory.push({ type: 'test' });

      const instance2 = CommandInvoker.getInstance();
      expect(instance2.commandHistory).toHaveLength(1);
      expect(instance2.commandHistory[0].type).toBe('test');
    });

    test('should reset properly', () => {
      const instance = CommandInvoker.getInstance();
      instance.commandHistory.push({ type: 'test' });
      instance.reset();
      expect(instance.commandHistory).toHaveLength(0);
      expect(instance.initialized).toBe(false);
    });
  });

  describe('ChainBuilder', () => {
    test('should return the same instance', () => {
      const instance1 = ChainBuilder.getInstance();
      const instance2 = ChainBuilder.getInstance();
      expect(instance1).toBe(instance2);
    });

    test('should maintain chain between instances', () => {
      const instance1 = ChainBuilder.getInstance();
      instance1.build();

      const instance2 = ChainBuilder.getInstance();
      expect(instance2.chain).toBeTruthy();
    });

    test('should reset properly', () => {
      const instance = ChainBuilder.getInstance();
      instance.build();
      instance.reset();
      expect(instance.chain).toBeNull();
      expect(instance.initialized).toBe(false);
    });
  });
});
