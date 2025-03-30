const PityStrategyFactory = require('../PityStrategyFactory');
const { StandardPityStrategy, BeginnerPityStrategy, WeaponPityStrategy } = require('../PityStrategy');

describe('PityStrategyFactory', () => {
  test('should create BeginnerPityStrategy for beginner banner', () => {
    const strategy = PityStrategyFactory.createStrategy('beginner');
    expect(strategy).toBeInstanceOf(BeginnerPityStrategy);
  });

  test('should create WeaponPityStrategy for weapon banner', () => {
    const strategy = PityStrategyFactory.createStrategy('weapon');
    expect(strategy).toBeInstanceOf(WeaponPityStrategy);
  });

  test('should create StandardPityStrategy for character banner', () => {
    const strategy = PityStrategyFactory.createStrategy('character');
    expect(strategy).toBeInstanceOf(StandardPityStrategy);
  });

  test('should create StandardPityStrategy for unknown banner type', () => {
    const strategy = PityStrategyFactory.createStrategy('unknown');
    expect(strategy).toBeInstanceOf(StandardPityStrategy);
  });

  test('should handle case-insensitive banner types', () => {
    const strategy = PityStrategyFactory.createStrategy('BEGINNER');
    expect(strategy).toBeInstanceOf(BeginnerPityStrategy);
  });
});
