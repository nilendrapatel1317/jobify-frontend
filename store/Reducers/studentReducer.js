function safeParse(json) {
  try {
    const parsed = JSON.parse(json);
    return parsed;
  } catch (e) {
    return null;
  }
}

// Usage
const studentRaw = typeof window !== "undefined" ? localStorage.getItem("student") : null;

const initialState = {
  student: safeParse(studentRaw),
  isStudentLoggedIn: !!safeParse(studentRaw),
}

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
        localStorage.getItem("student") === null;
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
