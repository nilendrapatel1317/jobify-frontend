function safeParse(json) {
  try {
    const parsed = JSON.parse(json);
    return parsed;
  } catch (e) {
    return null;
  }
}
const jobRaw = typeof window !== "undefined" ? localStorage.getItem("job") : null;
const initialState = {
  job:safeParse(jobRaw),
  error: null
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_JOBS_FETCHED_SUCCESS":
      if (typeof window !== "undefined") {
        localStorage.setItem("job", JSON.stringify(action.payload));
      }
      return {
        ...state,
        job: action.payload,
        error: null
      };

    case "ALL_JOBS_FETCHED_FAILED":
      return {
        ...state,
        error: action?.payload
      };

    case "JOB_DELETED_SUCCESS":
      const updatedJobs = state?.job?.filter(
        (job) => job?.id !== action?.payload
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("job", JSON.stringify(updatedJobs));
      }
      return {
        ...state,
        job: updatedJobs
      };

    default:
      return state;
  }
};

export default jobReducer;
