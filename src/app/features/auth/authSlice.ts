import { createSlice } from "@reduxjs/toolkit";

export type AuthState= {
    user: [] | null,
}

const initialState: AuthState = {
    user: [],
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        clearUser: (state) => {
            state.user = []
        }
       
    }
})

export const {setUser, clearUser} = authSlice.actions;
export default authSlice.reducer;