import axiosInstance from '../utils/axios.js';

export const getCandidateInviteAssessmentSection = async (params) => {
	const token =  localStorage.getItem('mereosToken');
	const config = {
		headers: {
			token:token,
		},
		params: params
	};
	return axiosInstance.get(`assessment/public_candidate_invite_assessment_section/`, config);
};

export const changeCandidateInviteAssessmentSectionStatus = async (data) => {
	const token =  localStorage.getItem('mereosToken');
	const config = {
		headers: {
			token: token,
		},
	};
	return axiosInstance.put('/assessment/change_candidate_invite_assessment_section_status/', data, config);
};
