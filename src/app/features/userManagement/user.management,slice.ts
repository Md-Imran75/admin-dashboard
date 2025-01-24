// userSlice.js
import { CreateUserFormValues } from '@/features/user-management/components/CreateForm';
import axiosInstance from '@/utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export type userManagement = {
    loading: boolean;
    error: boolean | null;
    message: string,
    success: boolean,
    user?: {}
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

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (values : CreateUserFormValues, { rejectWithValue }) => {
    console.log(values)
    try {
      const response = await axiosInstance.put('/admin/dashboard/user-management/update-user', values);
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

export const viewUserById = createAsyncThunk(
  'user/viewUserById',
  async ({id} : {id: String | undefined}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/dashboard/user-management/view-user', {
        params: {id}
      });
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

export const deleteUserById = createAsyncThunk(
  'user/deleteUserById',
  async ({id} : {id: String | undefined}, { rejectWithValue }) => {
    console.log(id)
    try {
      const response = await axiosInstance.get('/admin/dashboard/user-management/delete-user', {
        params: {id}
      });
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
    user: {},
    loading: false,
    error: null,
    message: "",
    success: false
  } as userManagement,

  reducers: {
    clearMessage: (state) => {
      state.message = ""
    }
  },
  extraReducers: (builder) => {
    builder
    //create user
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
      })
    
    //update user
    .addCase(updateUser.pending, (state, _) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      console.log(action.payload)
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
    })
    .addCase(updateUser.rejected, (state, action: any) => {
      console.log(action.payload)
      state.loading = false;
      state.message = action.payload.response.data.errorMessage;
    })

    //view User by Id
    .addCase(viewUserById.pending, (state, _) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(viewUserById.fulfilled, (state, action) => {
     
      state.loading = false;
      state.success = true;
      state.user = action.payload;
      state.message = action.payload.message;
    })
    .addCase(viewUserById.rejected, (state, action: any) => {
      console.log(action.payload)
      state.loading = false;
      state.message = action.payload.response.data.errorMessage;
    })

    //deleteUserById
    .addCase(deleteUserById.pending, (state, _) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
    })
    .addCase(deleteUserById.rejected, (state, action: any) => {
      console.log(action.payload)
      state.loading = false;
      state.message = action.payload.response.data.errorMessage;
    })
    
  },
});

export const {clearMessage} = userManageMentSlice.actions;
export default userManageMentSlice.reducer;
