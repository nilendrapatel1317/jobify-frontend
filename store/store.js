import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./Reducers/studentReducer";
import employeeReducer from "./Reducers/employeeReducer";

export const store = configureStore({
  reducer: {
    student: studentReducer,
    employee: employeeReducer
  }
});
