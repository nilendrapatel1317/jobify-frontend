const initialState = {
  student:
    typeof window !== "undefined" && localStorage.getItem("student")
      ? JSON.parse(localStorage.getItem("student"))
      : null,
  isLoggedIn:
    typeof window !== "undefined" &&
    localStorage.getItem("isLoggedIn") === "true",
  error: null
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STUDENT_LOGIN_SUCCESS":
    case "STUDENT_UPDATE_SUCCESS":
    case "STUDENT_REGISTER_SUCCESS":
      if (typeof window !== "undefined") {
        localStorage.setItem("student", JSON.stringify(action.payload));
        localStorage.setItem("isLoggedIn", "true");
      }
      return {
        ...state,
        student: action.payload,
        isLoggedIn: true,
        error: null
      };

    case "STUDENT_LOGIN_FAILURE":
    case "STUDENT_UPDATE_FAILURE":
      return {
        ...state,
        error: action.payload
      };

    case "STUDENT_REGISTER_FAILURE":
      return {
        ...state,
        isLoggedIn: false,
        error: action.payload
      };

    case "STUDENT_LOGOUT":
      if (typeof window !== "undefined") {
        localStorage.removeItem("student");
        localStorage.removeItem("isLoggedIn");
      }
      return {
        student: null,
        isLoggedIn: false,
        error: null
      };

    default:
      return state;
  }
};

export default studentReducer;
