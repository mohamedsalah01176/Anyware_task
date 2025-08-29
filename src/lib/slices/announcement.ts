import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { toast } from 'react-toastify';
import { getToken } from '../../util/getToken';

const token =getToken();

export interface UserState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  announcements:[]
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: {status:"",message:""},
  announcements:[],
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


export const fetchAnnouncements = createAsyncThunk("/api/announcement", async () => {
  try{
        console.log(token,"ssssssssssssssssss")

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/announcement`,{headers:{
      "Authorization":`Bearer ${token}`,
      "Content-Type":"application/json"
    }});
    console.log(response);
    toast.success(response.data.messageEn || response.data.message);
    return response.data;
  }catch(errors:unknown){
    const err =errors as IErorror;
    const message = err.response?.data?.messageEn || "Something went wrong!";
    toast.error(message);
    console.log(err)
  }
});

export const addAnnouncements = createAsyncThunk("/api/addAnnouncement", async (payload:{title:string,message:string}) => {
  try{
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/announcement?lang=en`,payload,{headers:{
      "Authorization":`Bearer ${token}`,
      "Content-Type":"application/json"
    }});
    console.log(response);
    toast.success(response.data.messageEn || response.data.message);
    return response.data;
  }catch(errors:unknown){
    const err =errors as IErorror;
    const message = err.response?.data?.messageEn || "Something went wrong!";;
    toast.error(message);
    console.log(err)
  }
});

export const updateAnnouncements = createAsyncThunk("/api/updateAnnouncement", async ({payload,announcementId}:{payload:{title:string,message:string},announcementId:string}) => {
  try{
    console.log("zzzzzzzzzzzzzz")
    const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/announcement/${announcementId}?lang=en`,payload,{headers:{
      "Authorization":`Bearer ${token}`,
      "Content-Type":"application/json"
    }});
    console.log(response);
    toast.success(response.data.messageEn || response.data.message);
    return response.data;
  }catch(errors:unknown){
    const err =errors as IErorror;
    const message = err.response?.data?.messageEn || "Something went wrong!";;
    toast.error(message);
    console.log(err)
  }
});

export const deleteAnnouncements = createAsyncThunk("/api/deleteAnnouncement", async (announcementId:string) => {
  try{
    const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/announcement/${announcementId}?lang=en`,{headers:{
      "Authorization":`Bearer ${token}`,
      "Content-Type":"application/json"
    }});
    console.log(response);
    toast.success(response.data.messageEn || response.data.message);
    return response.data;
  }catch(errors:unknown){
    const err =errors as IErorror;
    const message = err.response?.data?.messageEn || "Something went wrong!";;
    toast.error(message);
    console.log(err)
  }
});





export const announcementsSlice = createSlice({
  name: 'announcements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.announcements = action.payload.announcements;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
    builder
      .addCase(updateAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
    builder
      .addCase(deleteAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
})


export default announcementsSlice.reducer