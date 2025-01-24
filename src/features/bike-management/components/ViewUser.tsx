import { viewUserById } from "@/app/features/userManagement/user.management,slice";
import { AppDispatch, RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"

const ViewUser = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { user, loading }: any = useSelector((state: RootState) => state.userManagement) || {};
  const [errorMessage, setErrorMessage] = useState(null);
  const { userName, fullName, email, phone, role, avatar } = user?.data || {};



  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(viewUserById({ id }));
        setErrorMessage(null);
      } catch (error: any) {
        setErrorMessage(error?.response?.data?.errorMessage ?? 'Something is wrong')
      }
    };
    fetchUser();
  }, [id])


  if (loading) {
    return <SkeletonDiv />
  }

  if (errorMessage) {
    return <ErrorDiv error={errorMessage} />
  }

  return (
    <div className="mt-5">
      <div className="flex justify-center gap-5 items-center flex-col">
        <div>
          <img className="rounded-full" src={avatar} alt={fullName} />
        </div>
        <div>
          <div>Hello, <span className="font-bold">{userName}</span></div>
          <div>Full Name: {fullName}</div>
          <div>Email: {email}</div>
          <div>Phone: {phone}</div>
          <div>Role: {role}</div>
        </div>
      </div>
    </div>
  )
}

ViewUser.displayName = "ViewUser";


const ErrorDiv = ({ error }: { error: String }) => {
  return (
    <div>
      {error}
    </div>
  )
}

ErrorDiv.displayName = "ErrorDiv";

const SkeletonDiv = () => {
  return (
    <div className="mt-5">
      <div className="flex justify-center gap-5 items-center flex-col">
        <div>
          <div className='h-20 w-20 rounded-full animate-pulse  bg-gray-200' />
        </div>
        <div className="flex flex-col gap-3">
          <div className='h-4 w-60 animate-pulse rounded bg-gray-200' />
          <div className='h-4 w-60 animate-pulse rounded bg-gray-200' />
          <div className='h-4 w-60 animate-pulse rounded bg-gray-200' />
          <div className='h-4 w-60 animate-pulse rounded bg-gray-200' />
          <div className='h-4 w-60 animate-pulse rounded bg-gray-200' />
        </div>
      </div>
    </div>
  )
}

SkeletonDiv.displayName = "SekeletonDiv";

export default ViewUser