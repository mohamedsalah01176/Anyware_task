import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import themeReducer from "./slices/themeSlice";
import announcementReducer from "./slices/announcement";
import quizReducer from "./slices/quizze";
import courseReducer from "./slices/course";

export const store = configureStore({
  reducer: {
    users: userReducer,
    theme: themeReducer, 
    announcement:announcementReducer,
    quiz:quizReducer,
    course:courseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;