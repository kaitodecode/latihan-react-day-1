import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import studentReducer from "./slice/student";
import trainerReducer from "./slice/trainer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
    trainer: trainerReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;