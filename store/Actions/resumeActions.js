import { getCurrStdResume } from "@/services/resumeService";

// LOGIN
export const fetchCurrStdResume = () => async (dispatch) => {
  try {
    console.log(dispatch)
    const res = await getCurrStdResume();
    dispatch({ type: 'CURRENT_STD_RESUME_FETCHED_SUCCESS', payload: res.data.data });
  } catch (error) {
    dispatch({ type: 'CURRENT_STD_RESUME_FETCHED_FAILED', payload: error.message });
  }
};
