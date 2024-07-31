import axiosInstance from '../../src/utils/axios';
import { changeCandidateAssessmentStatus } from '../../src/services/candidate-assessment.services';

jest.mock('../../src/utils/axios', () => {
  return {
      post: jest.fn(),
      put: jest.fn(),
      get: jest.fn(),
      delete: jest.fn()
  };
});


describe('Candidate API', () => {
    beforeEach(() => {
        localStorage.setItem('token', 'test-token');
    });

    afterEach(() => {
        jest.clearAllMocks();
        localStorage.removeItem('token');
    });

    describe('changeCandidateAssessmentStatus', () => {
        it('should call axiosInstance.put with correct URL, data, and headers', async () => {
            const data = { candidateId: 1, status: 'completed' };
            const response = { data: 'response' };
            axiosInstance.put.mockResolvedValue(response);

            const result = await changeCandidateAssessmentStatus(data);

            expect(axiosInstance.put).toHaveBeenCalledWith('/candidate/change_candidate_assessment_status/', data, {
                headers: {
                    token: 'test-token',
                },
            });
            expect(result).toEqual(response);
        });

        it('should handle error correctly', async () => {
            const data = { candidateId: 1, status: 'completed' };
            const errorMessage = 'Network Error';
            axiosInstance.put.mockRejectedValue(new Error(errorMessage));

            try {
                await changeCandidateAssessmentStatus(data);
            } catch (error) {
                expect(error.message).toBe(errorMessage);
            }

            expect(axiosInstance.put).toHaveBeenCalledWith('/candidate/change_candidate_assessment_status/', data, {
                headers: {
                    token: 'test-token',
                },
            });
        });
    });
});
