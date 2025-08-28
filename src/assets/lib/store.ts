import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
export const store = configureStore({
  reducer: {
    users: userReducer, // register the slice reducer here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;