import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./Reducers/studentReducer";
import employeeReducer from "./Reducers/employeeReducer";
import internshipReducer from "./Reducers/internshipReducer";
import jobReducer from "./Reducers/jobReducer";
import resumeReducer from "./Reducers/resumeReducer";

export const store = configureStore({
  reducer: {
    student: studentReducer,
    employee: employeeReducer,
    internship: internshipReducer,
    job:jobReducer,
    resume: resumeReducer
  }
});
