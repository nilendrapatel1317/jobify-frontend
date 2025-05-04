import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./Reducers/studentReducer";

export const store = configureStore({
  reducer: {
    student: studentReducer,
  }
});
