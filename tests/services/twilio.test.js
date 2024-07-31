import axiosInstance from '../../src/utils/axios';
import { getRoomSid, getToken, getRecordingSid } from '../../src/services/twilio.services';

jest.mock('../../src/utils/axios', () => {
  return {
      post: jest.fn(),
      put: jest.fn(),
      get: jest.fn(),
      delete: jest.fn()
  };
});

describe('Twilio API', () => {
    beforeEach(() => {
        localStorage.setItem('token', 'test-token');
    });

    afterEach(() => {
        jest.clearAllMocks();
        localStorage.removeItem('token');
    });

    describe('getRoomSid', () => {
        it('should call axiosInstance.get with correct URL, params, and headers', async () => {
            const params = { roomName: 'test-room' };
            const response = { data: 'response' };
            axiosInstance.get.mockResolvedValue(response);

            const result = await getRoomSid(params);

            expect(axiosInstance.get).toHaveBeenCalledWith('/twilio/create_room/', {
                headers: { token: 'test-token' },
                params
            });
            expect(result).toEqual(response);
        });

        it('should handle error correctly', async () => {
            const params = { roomName: 'test-room' };
            const errorMessage = 'Network Error';
            axiosInstance.get.mockRejectedValue(new Error(errorMessage));

            try {
                await getRoomSid(params);
            } catch (error) {
                expect(error.message).toBe(errorMessage);
            }

            expect(axiosInstance.get).toHaveBeenCalledWith('/twilio/create_room/', {
                headers: { token: 'test-token' },
                params
            });
        });
    });

    describe('getToken', () => {
        it('should call axiosInstance.get with correct URL, params, and headers', async () => {
            const params = { identity: 'test-user' };
            const response = { data: 'response' };
            axiosInstance.get.mockResolvedValue(response);

            const result = await getToken(params);

            expect(axiosInstance.get).toHaveBeenCalledWith('/twilio/get-token/', {
                headers: { token: 'test-token' },
                params
            });
            expect(result).toEqual(response);
        });

        it('should handle error correctly', async () => {
            const params = { identity: 'test-user' };
            const errorMessage = 'Network Error';
            axiosInstance.get.mockRejectedValue(new Error(errorMessage));

            try {
                await getToken(params);
            } catch (error) {
                expect(error.message).toBe(errorMessage);
            }

            expect(axiosInstance.get).toHaveBeenCalledWith('/twilio/get-token/', {
                headers: { token: 'test-token' },
                params
            });
        });
    });

    describe('getRecordingSid', () => {
        it('should call axiosInstance.post with correct URL, data, and headers', async () => {
            const data = { recordingName: 'test-recording' };
            const response = { data: 'response' };
            axiosInstance.post.mockResolvedValue(response);

            const result = await getRecordingSid(data);

            expect(axiosInstance.post).toHaveBeenCalledWith('/twilio/get_SID/', data, {
                headers: { token: 'test-token' }
            });
            expect(result).toEqual(response);
        });

        it('should handle error correctly', async () => {
            const data = { recordingName: 'test-recording' };
            const errorMessage = 'Network Error';
            axiosInstance.post.mockRejectedValue(new Error(errorMessage));

            try {
                await getRecordingSid(data);
            } catch (error) {
                expect(error.message).toBe(errorMessage);
            }

            expect(axiosInstance.post).toHaveBeenCalledWith('/twilio/get_SID/', data, {
                headers: { token: 'test-token' }
            });
        });
    });
});
