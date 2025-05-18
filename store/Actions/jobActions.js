import { getAllJobs } from "@/services/jobService";

// LOGIN
export const fetchAllJobs = () => async (dispatch) => {
  try {
    const res = await getAllJobs();
    dispatch({ type: 'ALL_JOBS_FETCHED_SUCCESS', payload: res.data.data });
  } catch (error) {
    dispatch({ type: 'ALL_JOBS_FETCHED_FAILED', payload: error.message });
  }
};
