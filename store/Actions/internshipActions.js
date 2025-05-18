import { getAllInternships } from '@/services/internshipService';

// LOGIN
export const fetchAllInternships = () => async (dispatch) => {
  try {
    const res = await getAllInternships();
    dispatch({ type: 'ALL_INTERNSHIPS_FETCHED_SUCCESS', payload: res.data.data });
  } catch (error) {
    dispatch({ type: 'ALL_INTERNSHIPS_FETCHED_FAILED', payload: error.message });
  }
};
