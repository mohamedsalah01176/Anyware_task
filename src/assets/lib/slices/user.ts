import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
// import { getToken } from '../../../util/getToken';

export interface IData {
  status:string,
  message:string
}
// const token =getToken();

export interface UserState {
  data: IData;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: {status:"",message:""},
  loading: false,
  error: null,
};



export const register = createAsyncThunk("/api/register", async (payload) => {
  try{
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/register`,payload,{headers:{"Content-Type":"application/json"}});
    return response.data;
  }catch(errors){
    console.log(errors)
  }
});



export const counterSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<IData>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
})


export default counterSlice.reducer