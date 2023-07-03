import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into the console', () => {
    const spy = jest.spyOn(console, 'log');
    expect(mockOne).toHaveBeenCalledTimes(0);
    expect(mockTwo).toHaveBeenCalledTimes(0);
    expect(mockThree).toHaveBeenCalledTimes(0);
    expect(spy).toHaveBeenCalledTimes(0);
  });

  test('unmockedFunction should log into the console', () => {
    const spy = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(spy).toHaveBeenCalledWith('I am not mocked');
  });
});
