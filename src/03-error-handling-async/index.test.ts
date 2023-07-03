import {
  throwError,
  throwCustomError,
  resolveValue,
  rejectCustomError,
  MyAwesomeError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue(5);
    expect(result).toEqual(5);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'This is error text for test';
    const result = () => {
      throwError(message);
    };
    expect(result).toThrowError(message);
  });

  test('should throw error with default message if message is not provided', () => {
    const result = () => {
      throwError();
    };
    expect(result).toThrowError('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const result = () => {
      throwCustomError();
    };
    expect(result).toThrowError('This is my awesome custom error!');
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError).rejects.toEqual(new MyAwesomeError());
  });
});
