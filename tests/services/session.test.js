import axiosInstance from '../../src/utils/axios';
import { addSectionSession, editSectionSession } from '../../src/services/sessions.service'; // Adjust the path as needed

jest.mock('../../src/utils/axios', () => {
  return {
      post: jest.fn(),
      put: jest.fn(),
  };
});

describe('Section Session API', () => {
  beforeEach(() => {
      localStorage.setItem('token', 'test-token');
  });

  afterEach(() => {
      jest.clearAllMocks();
      localStorage.removeItem('token');
  });

  describe('addSectionSession', () => {
      it('should call axiosInstance.post with correct URL and headers', async () => {
          const data = { key: 'value' };
          const response = { data: 'response' };
          axiosInstance.post.mockResolvedValue(response);

          const result = await addSectionSession(data);

          expect(axiosInstance.post).toHaveBeenCalledWith(
              '/sessions/candidate_session/',
              data,
              {
                  headers: {
                      token: 'test-token',
                  },
              }
          );
          expect(result).toEqual(response);
      });

      it('should handle error correctly', async () => {
          const data = { key: 'value' };
          const errorMessage = 'Network Error';
          axiosInstance.post.mockRejectedValue(new Error(errorMessage));

          try {
              await addSectionSession(data);
          } catch (error) {
              expect(error.message).toBe(errorMessage);
          }

          expect(axiosInstance.post).toHaveBeenCalledWith(
              '/sessions/candidate_session/',
              data,
              {
                  headers: {
                      token: 'test-token',
                  },
              }
          );
      });
  });

  describe('editSectionSession', () => {
      it('should call axiosInstance.put with correct URL and headers', async () => {
          const data = { key: 'value' };
          const response = { data: 'response' };
          axiosInstance.put.mockResolvedValue(response);

          const result = await editSectionSession(data);

          expect(axiosInstance.put).toHaveBeenCalledWith(
              '/sessions/candidate_session/',
              data,
              {
                  headers: {
                      token: 'test-token',
                  },
              }
          );
          expect(result).toEqual(response);
      });

      it('should handle error correctly', async () => {
          const data = { key: 'value' };
          const errorMessage = 'Network Error';
          axiosInstance.put.mockRejectedValue(new Error(errorMessage));

          try {
              await editSectionSession(data);
          } catch (error) {
              expect(error.message).toBe(errorMessage);
          }

          expect(axiosInstance.put).toHaveBeenCalledWith(
              '/sessions/candidate_session/',
              data,
              {
                  headers: {
                      token: 'test-token',
                  },
              }
          );
      });
  });
});