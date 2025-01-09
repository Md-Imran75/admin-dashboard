// src/hooks/useAuth.ts
import { useDispatch } from "react-redux";
import axiosInstance from "../../../utils/axiosInstance";
import { setUser, clearUser } from "../../../app/features/auth/authSlice";
import axios from "axios";
import { AuthApi } from "@/apis/authApi";

interface LoginData {
  email: string;
  password: string;
}

export const useAuth = () => {
  const dispatch = useDispatch();

  const login = async (data: LoginData) => {
    try {
      const response = await AuthApi.login(data.email, data.password);
      console.log(response)
      dispatch(setUser(response.data.admin)); 
      return response;
    } catch (error) {
        
        if (error instanceof Error) {
            return error;
        }
        throw new Error('An unexpected error occurred');
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('user');
      const response = await axiosInstance.post("/admins-auth/logout", {}, {withCredentials: true});
      console.log(response);
      dispatch(clearUser()); 
      window.location.href = "/login"; 
    } catch (error) {
      console.error(error);
    }
  };

  return { login, logout };
};
