import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./Reducers/studentReducer";
import employeeReducer from "./Reducers/employeeReducer";
import internshipReducer from "./Reducers/internshipReducer";
import jobReducer from "./Reducers/jobReducer";

export const store = configureStore({
  reducer: {
    student: studentReducer,
    employee: employeeReducer,
    internship: internshipReducer,
    job:jobReducer
  }
});
