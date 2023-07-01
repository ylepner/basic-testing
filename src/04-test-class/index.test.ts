import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';

const balance = 10000;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const result = new BankAccount(balance);
    expect(result).toBeInstanceOf(BankAccount);
    expect(result.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdrawing = balance * 2;
    const result = () => new BankAccount(balance).withdraw(withdrawing);
    expect(result).toThrowError(InsufficientFundsError);
    expect(result).toThrowError(
      `Insufficient funds: cannot withdraw more than ${balance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const transferring = balance * 2;
    const fromAccount = new BankAccount(balance);
    const toAccount = new BankAccount(balance);
    const result = () => fromAccount.transfer(transferring, toAccount);
    expect(result).toThrowError(Error);
  });

  test('should throw error when transferring to the same account', () => {
    const transferring = balance * 2;
    const fromAccount = new BankAccount(balance);
    const result = () => fromAccount.transfer(transferring, fromAccount);
    expect(result).toThrowError(Error);
  });

  test('should deposit money', () => {
    const account = new BankAccount(balance);
    const amount = 1;
    const result = account.deposit(amount);
    expect(result.getBalance()).toBe(balance + amount);
  });

  test('should withdraw money', () => {
    const account = new BankAccount(balance);
    const amount = 1;
    const result = account.withdraw(amount);
    expect(result.getBalance()).toBe(balance - amount);
  });

  test('should transfer money', () => {
    const amount = 1;
    const fromAccount = new BankAccount(balance);
    const toAccount = new BankAccount(balance);
    const result = fromAccount.transfer(amount, toAccount);
    expect(result.getBalance()).toBe(balance - amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = new BankAccount(balance);
    const mockAmount = 100;
    account.fetchBalance = jest.fn().mockResolvedValue(mockAmount);
    const result = await account.fetchBalance();
    expect(result).toBe(result);
    expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = new BankAccount(balance);
    const mockAmount = 100;
    account.fetchBalance = jest.fn().mockResolvedValue(mockAmount);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(mockAmount);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = new BankAccount(balance);
    const mockAmount = null;
    account.fetchBalance = jest.fn().mockResolvedValue(mockAmount);
    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
