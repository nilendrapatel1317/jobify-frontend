const initialState = {
  internship:
    typeof window !== "undefined" && localStorage.getItem("internship")
      ? JSON.parse(localStorage.getItem("internship"))
      : null,
  error: null
};

const internshipReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_INTERNSHIPS_FETCHED_SUCCESS":
      if (typeof window !== "undefined") {
        localStorage.setItem("internship", JSON.stringify(action.payload));
      }
      return {
        ...state,
        internship: action.payload,
        error: null
      };

    case "ALL_INTERNSHIPS_FETCHED_FAILED":
      return {
        ...state,
        error: action.payload
      };

    case "INTERNSHIP_DELETED_SUCCESS":
      const updatedInternships = state.internship.filter(
        (internship) => internship.id !== action.payload
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("internship", JSON.stringify(updatedInternships));
      }
      return {
        ...state,
        internship: updatedInternships
      };

    default:
      return state;
  }
};

export default internshipReducer;
