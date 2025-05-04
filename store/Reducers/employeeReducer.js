const initialState = {
  employee:
    typeof window !== "undefined" && localStorage.getItem("employee")
      ? JSON.parse(localStorage.getItem("employee"))
      : null,
  isLoggedIn:
    typeof window !== "undefined" &&
    localStorage.getItem("isLoggedIn") === "true",
  error: null
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EMPLOYEE_LOGIN_SUCCESS":
    case "EMPLOYEE_UPDATE_SUCCESS":
      if (typeof window !== "undefined") {
        localStorage.setItem("employee", JSON.stringify(action.payload));
        localStorage.setItem("isLoggedIn", "true");
      }
      return {
        ...state,
        employee: action.payload,
        isLoggedIn: true,
        error: null
      };

    case "EMPLOYEE_LOGIN_FAILURE":
    case "EMPLOYEE_UPDATE_FAILURE":
      return {
        ...state,
        error: action.payload
      };

    case "EMPLOYEE_LOGOUT":
      if (typeof window !== "undefined") {
        localStorage.removeItem("employee");
        localStorage.removeItem("isLoggedIn");
      }
      return {
        employee: null,
        isLoggedIn: false,
        error: null
      };

    default:
      return state;
  }
};

export default employeeReducer;
