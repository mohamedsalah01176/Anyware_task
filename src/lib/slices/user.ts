import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { toast } from 'react-toastify';
import type { IUserBody } from '../../interfaces/user';
import {jwtDecode} from "jwt-decode";
import { getToken } from '../../util/getToken';


export interface UserState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  teachersId:IUserBody[];
  user:IUserBody | null,
  decoded: IUserBody | null;
  loading: boolean;
  error: string | null;
}

interface ILoginPayload {
  email: string;
  password: string;
}
const initialState: UserState = {
  data: {status:"",message:""},
  teachersId:[],
  user:null,
  decoded: null,
  loading: false,
  error: null,
};

interface IErorror{
  response:{
    data:{
      messageEn:string,
      messageAr:string
    }
  }
}



export const decodeToken = (token: string) => {
  try {
    const decode =jwtDecode(token);
    return decode ;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

export const fetchTeachersId = createAsyncThunk("/api/teachersId", async () => {
  try{
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/teachersId`,{headers:{"Content-Type":"application/json"}});
    console.log(response);
    toast.success(response.data.messageEn);
    return response.data;
  }catch(errors:unknown){
    const err =errors as IErorror;
    const message = err.response?.data?.messageEn || "Registration failed!";
    toast.error(message);
    console.log(err)
  }
});

export const register = createAsyncThunk("/api/register", async (payload) => {
  try{
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/register`,payload,{headers:{"Content-Type":"application/json"}});
    console.log(response);
    toast.success(response.data.messageEn);
    return response.data;
  }catch(errors:unknown){
    const err =errors as IErorror;
    const message = err.response?.data?.messageEn || "Registration failed!";
    toast.error(message);
    console.log(err)
  }
});

export const LoginFetching = createAsyncThunk("/api/login", async (payload:ILoginPayload,{ rejectWithValue }) => {
  try{
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/login`,payload,{headers:{"Content-Type":"application/json"}});
    console.log(response);
    toast.success(response.data.messageEn);
    return response.data;
  }catch(errors:unknown){
    console.log(errors);
    const err =errors as IErorror;
    const message = err.response?.data?.messageEn || "Registration failed!";
    toast.error(message);
    console.log(err)
    return rejectWithValue({ status: "error", message });
  }
});
export const fetchSpecificUser = createAsyncThunk("/api/user", async (payload:string) => {
  try{
    const token =getToken();
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/${payload}`,{headers:{
      "Authorization":`Bearer ${token}`,
      "Content-Type":"application/json"
    }})
    console.log(response);
    toast.success(response.data.messageEn);
    return response.data;
  }catch(errors:unknown){
    const err =errors as IErorror;
    const message = err.response?.data?.messageEn || "Registration failed!";
    toast.error(message);
    console.log(err)
  }
});



export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setDecodedToken: (state, action) => {
      const decod=decodeToken(action.payload) as IUserBody;
      state.decoded = decod;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });

    builder
      .addCase(LoginFetching.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LoginFetching.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(LoginFetching.rejected, (state, action) => {
        state.loading = false;
        state.data = action.payload as { status: string; message: string } || { status: "error", message: "Unknown error" };
      });

    builder
      .addCase(fetchTeachersId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeachersId.fulfilled, (state, action) => {
        state.loading = false;
        state.teachersId = action.payload.teacherId;
      })
      .addCase(fetchTeachersId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });

    builder
      .addCase(fetchSpecificUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecificUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchSpecificUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
})


export default userSlice.reducer
export const { setDecodedToken } = userSlice.actions;
