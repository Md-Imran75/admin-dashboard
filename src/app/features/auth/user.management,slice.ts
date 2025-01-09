// userSlice.js
import { CreateUserFormValues } from '@/features/user-management/components/CreateForm';
import axiosInstance from '@/utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export type userManagement = {
    loading: boolean;
    error: boolean | null;
    message: string,
    success: boolean
}

export const createUser = createAsyncThunk(
  'user/createUser',
  async (values : CreateUserFormValues, { rejectWithValue }) => {
    console.log(values)
    try {
      const response = await axiosInstance.post('/admin/dashboard/user-management/create-user', values);
      console.log(response)
      return response.data;
    } catch (error: unknown) {
      console.log(error)
      if (axios.isAxiosError(error) && error.response) {
        if (error.response && error.response.data instanceof Blob) {
          const errorText = await error.response.data.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(errorText, 'text/html');
          const preTag = doc.querySelector('pre');
          const errorMessage = preTag ? preTag.textContent : 'An unknown error occurred';
          console.error('Error:', errorMessage);
        } else {
          console.error('Error:', error.message);
        }
      }
      return rejectWithValue(error);
    }
  }
);

const userManageMentSlice = createSlice({
  name: 'userManagement',
  initialState: {
    loading: false,
    error: null,
    message: "",
    success: false
  } as userManagement,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state, _) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(createUser.rejected, (state, action: any) => {
        console.log(action.payload)
        state.loading = false;
        state.message = action.payload.response.data.errorMessage;
      });
  },
});

export default userManageMentSlice.reducer;
