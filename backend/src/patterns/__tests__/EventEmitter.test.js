const EventEmitter = require('../EventEmitter');
const warpEventEmitter = require('../WarpEventEmitter');

describe('EventEmitter', () => {
  let emitter;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  test('should register and emit events', () => {
    const callback = jest.fn();
    emitter.on('test', callback);
    emitter.emit('test', { data: 'test' });
    expect(callback).toHaveBeenCalledWith({ data: 'test' });
  });

  test('should remove event listener', () => {
    const callback = jest.fn();
    emitter.on('test', callback);
    emitter.off('test', callback);
    emitter.emit('test', { data: 'test' });
    expect(callback).not.toHaveBeenCalled();
  });

  test('should remove all listeners', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    emitter.on('test', callback1);
    emitter.on('test', callback2);
    emitter.removeAllListeners('test');
    emitter.emit('test', { data: 'test' });
    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();
  });
});

describe('WarpEventEmitter', () => {
  test('should emit warp start event', () => {
    const callback = jest.fn();
    warpEventEmitter.on(warpEventEmitter.EVENTS.WARP_START, callback);
    warpEventEmitter.emitWarpStart('user123', 'beginner');
    expect(callback).toHaveBeenCalledWith({
      userId: 'user123',
      bannerType: 'beginner'
    });
  });

  test('should emit warp complete event', () => {
    const callback = jest.fn();
    warpEventEmitter.on(warpEventEmitter.EVENTS.WARP_COMPLETE, callback);
    warpEventEmitter.emitWarpComplete('user123', 'beginner', { rarity: 5 });
    expect(callback).toHaveBeenCalledWith({
      userId: 'user123',
      bannerType: 'beginner',
      result: { rarity: 5 }
    });
  });

  test('should emit pity update event', () => {
    const callback = jest.fn();
    warpEventEmitter.on(warpEventEmitter.EVENTS.PITY_UPDATE, callback);
    warpEventEmitter.emitPityUpdate('user123', 'beginner', 75);
    expect(callback).toHaveBeenCalledWith({
      userId: 'user123',
      bannerType: 'beginner',
      pity: 75
    });
  });

  test('should emit guarantee update event', () => {
    const callback = jest.fn();
    warpEventEmitter.on(warpEventEmitter.EVENTS.GUARANTEE_UPDATE, callback);
    warpEventEmitter.emitGuaranteeUpdate('user123', 'beginner', true);
    expect(callback).toHaveBeenCalledWith({
      userId: 'user123',
      bannerType: 'beginner',
      isGuaranteed: true
    });
  });

  test('should emit banner state change event', () => {
    const callback = jest.fn();
    warpEventEmitter.on(warpEventEmitter.EVENTS.BANNER_STATE_CHANGE, callback);
    warpEventEmitter.emitBannerStateChange('user123', 'beginner', {
      pityFive: 75,
      guaranteeFive: true
    });
    expect(callback).toHaveBeenCalledWith({
      userId: 'user123',
      bannerType: 'beginner',
      state: {
        pityFive: 75,
        guaranteeFive: true
      }
    });
  });
});
