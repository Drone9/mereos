import axiosInstance from '../../src/utils/axios';
import { getCandidateInviteAssessmentSection, changeCandidateInviteAssessmentSectionStatus } from '../../src/services/candidate-invite-assessment-section.services';

jest.mock('../../src/utils/axios', () => {
  return {
      post: jest.fn(),
      put: jest.fn(),
      get: jest.fn(),
      delete: jest.fn()
  };
});

describe('Assessment API', () => {
    beforeEach(() => {
        localStorage.setItem('token', 'test-token');
    });

    afterEach(() => {
        jest.clearAllMocks();
        localStorage.removeItem('token');
    });

    describe('getCandidateInviteAssessmentSection', () => {
        it('should call axiosInstance.get with correct URL, params, and headers', async () => {
            const params = { assessmentId: 1 };
            const response = { data: 'response' };
            axiosInstance.get.mockResolvedValue(response);

            const result = await getCandidateInviteAssessmentSection(params);

            expect(axiosInstance.get).toHaveBeenCalledWith('assessment/public_candidate_invite_assessment_section/', {
                headers: { token: 'test-token' },
                params: params
            });
            expect(result).toEqual(response);
        });

        it('should handle error correctly', async () => {
            const params = { assessmentId: 1 };
            const errorMessage = 'Network Error';
            axiosInstance.get.mockRejectedValue(new Error(errorMessage));

            try {
                await getCandidateInviteAssessmentSection(params);
            } catch (error) {
                expect(error.message).toBe(errorMessage);
            }

            expect(axiosInstance.get).toHaveBeenCalledWith('assessment/public_candidate_invite_assessment_section/', {
                headers: { token: 'test-token' },
                params: params
            });
        });
    });

    describe('changeCandidateInviteAssessmentSectionStatus', () => {
        it('should call axiosInstance.put with correct URL, data, and headers', async () => {
            const data = { sectionId: 1, status: 'completed' };
            const response = { data: 'response' };
            axiosInstance.put.mockResolvedValue(response);

            const result = await changeCandidateInviteAssessmentSectionStatus(data);

            expect(axiosInstance.put).toHaveBeenCalledWith('/assessment/change_candidate_invite_assessment_section_status/', data, {
                headers: { token: 'test-token' },
            });
            expect(result).toEqual(response);
        });

        it('should handle error correctly', async () => {
            const data = { sectionId: 1, status: 'completed' };
            const errorMessage = 'Network Error';
            axiosInstance.put.mockRejectedValue(new Error(errorMessage));

            try {
                await changeCandidateInviteAssessmentSectionStatus(data);
            } catch (error) {
                expect(error.message).toBe(errorMessage);
            }

            expect(axiosInstance.put).toHaveBeenCalledWith('/assessment/change_candidate_invite_assessment_section_status/', data, {
                headers: { token: 'test-token' },
            });
        });
    });
});
