import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import type { ICourse } from "../../interfaces/course";
import { getToken } from "../../util/getToken";


export interface QuizState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  courses:ICourse[];
  loading: boolean;
  error: string | null;
}

const initialState: QuizState = {
  data: { status: "", message: "" },
  courses: [],
  loading: false,
  error: null,
};

interface IError {
  response: {
    data: {
      messageEn: string;
      messageAr: string;
    };
  };
}

export const fetchCourses = createAsyncThunk("/api/courses", async () => {
  try {
    const token =getToken();
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/course`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (errors: unknown) {
    console.log(errors)
    const err = errors as IError;
    const message = err.response?.data?.messageEn || "Something went wrong!";
    toast.error(message);
    throw errors;
  }
});


export const deleteCourse = createAsyncThunk(
  "/api/deleteCourse",
  async (courseId: string) => {
    const token =getToken();
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.messageEn || response.data.message);
      return response.data;
    } catch (errors: unknown) {
      const err = errors as IError;
      const message = err.response?.data?.messageEn || "Something went wrong!";
      console.log(errors)
      toast.error(message);
      throw errors;
    }
  }
);

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.courses;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch quizzes";
      });
    
      

    builder
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch quizzes";
      });

  },
});

export default quizSlice.reducer;
