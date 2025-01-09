
import { Navigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { useEffect } from "react";
import { setUser } from "@/app/features/auth/authSlice";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
   const dispatch = useDispatch(); 
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if(!user){
    throw new Error("You are unautorized to view this page");
  }
  useEffect(() => {
    dispatch(setUser(user));
  },[])  

  return user?.role === "admin" ? children : <Navigate to="/login" />;
};
