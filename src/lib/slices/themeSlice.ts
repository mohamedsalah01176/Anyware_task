// store/slices/themeSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  mode: string;
}

const initialState: ThemeState = {
  mode: localStorage.getItem("mode") || "light", // جلب الوضع الحالي من localStorage
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { toggleMode } = themeSlice.actions;
export default themeSlice.reducer;
