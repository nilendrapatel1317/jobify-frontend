function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

const resumeRaw = typeof window !== "undefined" ? localStorage.getItem("resume") : null;

const initialState = {
  resume: safeParse(resumeRaw),
  loading: false,
  error: null
};

const resumeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CURRENT_STD_RESUME_FETCHED_PENDING':
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case 'CURRENT_STD_RESUME_FETCHED_SUCCESS':
      if (typeof window !== "undefined") {
        localStorage.setItem("resume", JSON.stringify(action.payload));
      }
      return {
        ...state,
        loading: false,
        resume: action.payload,
        error: null
      };
      
    case 'CURRENT_STD_RESUME_FETCHED_FAILED':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    default:
      return state;
  }
};

export default resumeReducer;