import axios from '../../src/utils/axios';
import { getAllEvents, createEvent, editEvent, deleteEvent } from '../../src/services/event.service';

jest.mock('../../src/utils/axios', () => {
  return {
      post: jest.fn(),
      put: jest.fn(),
      get: jest.fn(),
      delete: jest.fn()
  };
});

describe('Events API', () => {
    beforeEach(() => {
        localStorage.setItem('token', 'test-token');
    });

    afterEach(() => {
        jest.clearAllMocks();
        localStorage.removeItem('token');
    });

    describe('getAllEvents', () => {
        it('should call axios.get with correct URL and headers', async () => {
            const response = { data: 'response' };
            axios.get.mockResolvedValue(response);

            const result = await getAllEvents();

            expect(axios.get).toHaveBeenCalledWith('/section_session/event/', {
                headers: {
                    Authorization: 'Basic test-token',
                },
            });
            expect(result).toEqual(response);
        });

        it('should handle error correctly', async () => {
            const errorMessage = 'Network Error';
            axios.get.mockRejectedValue(new Error(errorMessage));

            try {
                await getAllEvents();
            } catch (error) {
                expect(error.message).toBe(errorMessage);
            }

            expect(axios.get).toHaveBeenCalledWith('/section_session/event/', {
                headers: {
                    Authorization: 'Basic test-token',
                },
            });
        });
    });

    describe('createEvent', () => {
        it('should call axios.post with correct URL, data, and headers', async () => {
            const data = { key: 'value' };
            const response = { data: 'response' };
            axios.post.mockResolvedValue(response);

            const result = await createEvent(data);

            expect(axios.post).toHaveBeenCalledWith('/sessions/candidate_event/', data, {
                headers: {
                    Authorization: 'Basic test-token',
                },
            });
            expect(result).toEqual(response);
        });

        it('should handle error correctly', async () => {
            const data = { key: 'value' };
            const errorMessage = 'Network Error';
            axios.post.mockRejectedValue(new Error(errorMessage));

            try {
                await createEvent(data);
            } catch (error) {
                expect(error.message).toBe(errorMessage);
            }

            expect(axios.post).toHaveBeenCalledWith('/sessions/candidate_event/', data, {
                headers: {
                    Authorization: 'Basic test-token',
                },
            });
        });
    });

    describe('editEvent', () => {
        it('should call axios.put with correct URL, data, and headers', async () => {
            const data = { key: 'value' };
            const response = { data: 'response' };
            axios.put.mockResolvedValue(response);

            const result = await editEvent(data);

            expect(axios.put).toHaveBeenCalledWith('/section_session/event/', data, {
                headers: {
                    Authorization: 'Basic test-token',
                },
            });
            expect(result).toEqual(response);
        });

        it('should handle error correctly', async () => {
            const data = { key: 'value' };
            const errorMessage = 'Network Error';
            axios.put.mockRejectedValue(new Error(errorMessage));

            try {
                await editEvent(data);
            } catch (error) {
                expect(error.message).toBe(errorMessage);
            }

            expect(axios.put).toHaveBeenCalledWith('/section_session/event/', data, {
                headers: {
                    Authorization: 'Basic test-token',
                },
            });
        });
    });

    describe('deleteEvent', () => {
        it('should call axios.delete with correct URL and headers', async () => {
            const id = 123;
            const response = { data: 'response' };
            axios.delete.mockResolvedValue(response);

            const result = await deleteEvent(id);

            expect(axios.delete).toHaveBeenCalledWith(`/section_session/event/?id=${id}`, {
                headers: {
                    Authorization: 'Basic test-token',
                },
            });
            expect(result).toEqual(response);
        });

        it('should handle error correctly', async () => {
            const id = 123;
            const errorMessage = 'Network Error';
            axios.delete.mockRejectedValue(new Error(errorMessage));

            try {
                await deleteEvent(id);
            } catch (error) {
                expect(error.message).toBe(errorMessage);
            }

            expect(axios.delete).toHaveBeenCalledWith(`/section_session/event/?id=${id}`, {
                headers: {
                    Authorization: 'Basic test-token',
                },
            });
        });
    });
});
