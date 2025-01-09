import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "../../hooks/use-toast"
import { useAuth } from "./hooks/useAuth"


const initialState = {
    email: "",
    password: "",
}

const Login = () => {
    const { toast } = useToast()
    const { login } = useAuth();
    const [state, setState] = useState(initialState);
    const [successMessage, setSuccessMessage] = useState("");


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response: any = await login({ email: state.email, password: state.password });
        console.log(response)
        if (response.success === true && response.statusCode === 200) {
            setSuccessMessage(response.message);
            localStorage.setItem("user", JSON.stringify(response.data.admin));
            window.location.href = '/dashboard';
        } else {
            setSuccessMessage("Invalid email or password");
        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }


    useEffect(() => {
        toast({
            title: successMessage && successMessage,
        })
        setSuccessMessage("");

    }, [successMessage])


    return (
        <div className="flex justify-center items-center h-screen">
            <div className="h-[400px] w-[400px]">
                <form onSubmit={handleSubmit}>
                    <Input type="email" placeholder="Enter your email" name="email" value={state.email} className="mb-3" onChange={handleChange} />
                    <Input type="password" placeholder="Enter your password" name="password" value={state.password} className="mb-3" onChange={handleChange} />
                    <Button type="submit" className="w-full mt-5 h-[30px]">Login</Button>
                </form>
            </div>
        </div>
    )
}

export default Login