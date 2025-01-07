import axios from '../../src/utils/axios';
import { getAllAiEvents, createAiEvent, editAiEvent, deleteEvent } from '../../src/services/ai-event.services'; // Adjust the path as needed

jest.mock('../../src/utils/axios', () => {
  return {
      post: jest.fn(),
      put: jest.fn(),
      get: jest.fn(),
      delete: jest.fn()
  };
});

describe('AI Events API', () => {
    beforeEach(() => {
        localStorage.setItem('token', 'test-token');
    });

    afterEach(() => {
        jest.clearAllMocks();
        localStorage.removeItem('token');
    });

    describe('getAllAiEvents', () => {
        it('should call axios.get with correct URL and headers', async () => {
            const response = { data: 'response' };
            axios.get.mockResolvedValue(response);

            const result = await getAllAiEvents();

            expect(axios.get).toHaveBeenCalledWith('/sessions/ai_event/', {
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
                await getAllAiEvents();
            } catch (error) {
                expect(error.message).toBe(errorMessage);
            }

            expect(axios.get).toHaveBeenCalledWith('/sessions/ai_event/', {
                headers: {
                    Authorization: 'Basic test-token',
                },
            });
        });
    });

    describe('createAiEvent', () => {
        it('should call axios.post with correct URL, data, and headers', async () => {
            const data = { key: 'value' };
            const response = { data: 'response' };
            axios.post.mockResolvedValue(response);

            const result = await createAiEvent(data);

            expect(axios.post).toHaveBeenCalledWith('/sessions/candidate_ai_event/', data, {
                headers: {
                    token: 'test-token',
                },
            });
            expect(result).toEqual(response);
        });

        it('should handle error correctly', async () => {
            const data = { key: 'value' };
            const errorMessage = 'Network Error';
            axios.post.mockRejectedValue(new Error(errorMessage));

            try {
                await createAiEvent(data);
            } catch (error) {
                expect(error.message).toBe(errorMessage);
            }

            expect(axios.post).toHaveBeenCalledWith('/sessions/candidate_ai_event/', data, {
                headers: {
                    token: 'test-token',
                },
            });
        });
    });

    describe('editAiEvent', () => {
        it('should call axios.put with correct URL, data, and headers', async () => {
            const data = { key: 'value' };
            const response = { data: 'response' };
            axios.put.mockResolvedValue(response);

            const result = await editAiEvent(data);

            expect(axios.put).toHaveBeenCalledWith('/sessions/ai_event/', data, {
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
                await editAiEvent(data);
            } catch (error) {
                expect(error.message).toBe(errorMessage);
            }

            expect(axios.put).toHaveBeenCalledWith('/sessions/ai_event/', data, {
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

            expect(axios.delete).toHaveBeenCalledWith(`/sessions/ai_event/?id=${id}`, {
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

            expect(axios.delete).toHaveBeenCalledWith(`/sessions/ai_event/?id=${id}`, {
                headers: {
                    Authorization: 'Basic test-token',
                },
            });
        });
    });
});
