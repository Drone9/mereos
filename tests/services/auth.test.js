import { registerPublicCandidate } from '../../src/services/auth.services';
import axiosInstance from '../../src/utils/axios';

jest.mock('../../src/utils/axios', () => {
  return {
      post: jest.fn(),
      put: jest.fn(),
      get: jest.fn(),
      delete: jest.fn()
  };
});

describe('auth API Call', () => {
  it('should call axios.post with correct URL, data, and headers', async () => {
      const data = { key: 'value' };
      const response = { data: 'response' };
      axiosInstance.post.mockResolvedValue(response);

      const result = await registerPublicCandidate(data);

      expect(axiosInstance.post).toHaveBeenCalledWith('/auth/register/', data);
      expect(result).toEqual(response);
  });

  it('should handle error correctly', async () => {
      const data = { key: 'value' };
      const errorMessage = 'Network Error';
      axiosInstance.post.mockRejectedValue(new Error(errorMessage));

      try {
          await registerPublicCandidate(data);
      } catch (error) {
          expect(error.message).toBe(errorMessage);
      }

      expect(axiosInstance.post).toHaveBeenCalledWith('/auth/register/', data);
  });
});