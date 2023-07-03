import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  afterEach(async () => {
    throttledGetDataFromApi.cancel();
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const resource = 'posts';
    const axiosClient = { get: jest.fn().mockResolvedValue({}) };
    const axiosCreate = axios.create as jest.Mock;
    axiosCreate.mockReturnValueOnce(axiosClient);
    await throttledGetDataFromApi(resource);
    expect(axiosCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const resource = 'posts';
    const axiosClient = { get: jest.fn().mockResolvedValue({}) };
    const axiosCreate = axios.create as jest.Mock;
    axiosCreate.mockReturnValueOnce(axiosClient);
    await throttledGetDataFromApi(resource);
    expect(axiosClient.get).toHaveBeenCalledWith(resource);
  });

  test('should return response data', async () => {
    const resource = 'posts';
    const axiosClient = { get: jest.fn().mockResolvedValue({ data: data }) };
    const axiosCreate = axios.create as jest.Mock;
    axiosCreate.mockReturnValueOnce(axiosClient);
    const result = await throttledGetDataFromApi(resource);
    expect(result).toEqual(data);
  });
});

const data = {
  userId: 1,
  id: 1,
  title: 'delectus aut autem',
  completed: false,
};
