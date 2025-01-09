import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import userManagementReducer from './features/auth/user.management,slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userManagement: userManagementReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch