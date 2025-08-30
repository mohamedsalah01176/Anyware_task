import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../../util/getToken";
import type { IQuestion, IQuiz } from "../../interfaces/quiz";


export interface QuizState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  quizzes:IQuiz[];
  quiz:IQuiz | null;
  loading: boolean;
  error: string | null;
}

const initialState: QuizState = {
  data: { status: "", message: "" },
  quizzes: [],
  quiz:null,
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

export const fetchQuizzes = createAsyncThunk("/api/quiz", async () => {
  try {
    const token =getToken();
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/quiz`,
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

export const fetchQuizzesForUser = createAsyncThunk("/api/quizForUsers", async () => {
  const token =getToken();
  console.log(token,"ddddddddddddddddd")
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/quizzesForUser`,
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

export const addQuiz = createAsyncThunk(
  "/api/addQuiz",
  async (payload: { title: string; description: string; questions: IQuestion[] }) => {
    const token =getToken();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/quiz?lang=en`,
        payload,
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
      console.log(errors)
      const err = errors as IError;
      const message = err.response?.data?.messageEn || "Something went wrong!";
      toast.error(message);
      throw errors;
    }
  }
);

export const updateQuiz = createAsyncThunk(
  "/api/updateQuiz",
  async ({
    payload,
    quizId,
  }: {
    payload: { title: string; description: string; questions: IQuestion[] };
    quizId: string;
  }) => {
    const token =getToken();
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/quiz/${quizId}?lang=en`,
        payload,
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
      toast.error(message);
      throw errors;
    }
  }
);

export const getSpecificQuiz = createAsyncThunk(
  "/api/specificQuiz",
  async (quizId: string) => {
    const token =getToken();
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/quiz/${quizId}`,
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
      console.log(errors)
      const err = errors as IError;
      const message = err.response?.data?.messageEn || "Something went wrong!";
      toast.error(message);
      throw errors;
    }
  }
);

export const deleteQuiz = createAsyncThunk(
  "/api/deleteQuiz",
  async (quizId: string) => {
    const token =getToken();
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/quiz/${quizId}?lang=en`,
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
      .addCase(fetchQuizzes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload.quizzes;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch quizzes";
      });
    
      builder
      .addCase(fetchQuizzesForUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizzesForUser.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload.quizzes;
      })
      .addCase(fetchQuizzesForUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch quizzes";
      });

    builder
      .addCase(addQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch quizzes";
      });

    builder
      .addCase(updateQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch quizzes";
      });

    builder
      .addCase(getSpecificQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSpecificQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quiz = action.payload.quiz;
      })
      .addCase(getSpecificQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch quizzes";
      });

    builder
      .addCase(deleteQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch quizzes";
      });

  },
});

export default quizSlice.reducer;
