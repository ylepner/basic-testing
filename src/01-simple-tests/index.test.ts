import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: Action.Add });
    expect(result).toBe(5);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 135, b: 23, action: Action.Subtract });
    expect(result).toBe(112);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 13, b: 2, action: Action.Multiply });
    expect(result).toBe(26);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 124, b: 2, action: Action.Divide });
    expect(result).toBe(62);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 21, b: 3, action: 'divide' });
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '21', b: 3, action: Action.Divide });
    expect(result).toBe(null);
  });
});
