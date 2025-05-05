const initialState = {
  employee:
    typeof window !== "undefined" && localStorage.getItem("employee")
      ? JSON.parse(localStorage.getItem("employee"))
      : null,
  isEmployeeLoggedIn:
    typeof window !== "undefined" &&
    localStorage.getItem("isEmployeeLoggedIn") === "true",
  error: null
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EMPLOYEE_LOGIN_SUCCESS":
    case "EMPLOYEE_UPDATE_SUCCESS":
      if (typeof window !== "undefined") {
        localStorage.setItem("employee", JSON.stringify(action.payload));
        localStorage.setItem("isEmployeeLoggedIn", "true");
      }
      return {
        ...state,
        employee: action.payload,
        isEmployeeLoggedIn: true,
        error: null
      };

    case "EMPLOYEE_LOGIN_FAILURE":
    case "EMPLOYEE_UPDATE_FAILURE":
      return {
        ...state,
        error: action.payload
      };

    case "EMPLOYEE_LOGOUT":
    case "EMPLOYEE_DELETE":
      if (typeof window !== "undefined") {
        localStorage.removeItem("employee");
        localStorage.removeItem("isEmployeeLoggedIn");
      }
      return {
        employee: null,
        isEmployeeLoggedIn: false,
        error: null
      };

    default:
      return state;
  }
};

export default employeeReducer;
