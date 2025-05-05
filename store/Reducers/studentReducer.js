const initialState = {
  student:
    typeof window !== "undefined" && localStorage.getItem("student")
      ? JSON.parse(localStorage.getItem("student"))
      : null,
  isStudentLoggedIn:
    typeof window !== "undefined" &&
    localStorage.getItem("isStudentLoggedIn") === "true",
  error: null
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STUDENT_LOGIN_SUCCESS":
    case "STUDENT_UPDATE_SUCCESS":
      if (typeof window !== "undefined") {
        localStorage.setItem("student", JSON.stringify(action.payload));
        localStorage.setItem("isStudentLoggedIn", "true");
      }
      return {
        ...state,
        student: action.payload,
        isStudentLoggedIn: true,
        error: null
      };

    case "STUDENT_LOGIN_FAILURE":
    case "STUDENT_UPDATE_FAILURE":
      return {
        ...state,
        error: action.payload
      };

    case "STUDENT_LOGOUT":
    case "STUDENT_DELETED":
      if (typeof window !== "undefined") {
        localStorage.removeItem("student");
        localStorage.removeItem("isStudentLoggedIn");
      }
      return {
        student: null,
        isStudentLoggedIn: false,
        error: null
      };

    default:
      return state;
  }
};

export default studentReducer;
