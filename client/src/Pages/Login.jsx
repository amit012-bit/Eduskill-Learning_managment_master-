import { useState } from "react"
import HomeLayout from "../Layouts/HomeLayout"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { login } from "../Redux/Slices/AuthSlice";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    const onLogin = async (event) => {
        event.preventDefault();
        if (!loginData.email || !loginData.password) {
            toast.error("Please fill all the details")
            return;
        }

        // dispatch create account action

        const response= await dispatch(login(loginData));
        console.log(response);
        if(response?.payload?.success){
            navigate("/");
        }

        setLoginData({
            email: "",
            password: ""
        });
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form noValidate onSubmit={onLogin} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">Login Page </h1>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input required type="email" name="email" id="email" placeholder="Enter your email id" className="bg-transparent px-2 py-1 border" onChange={handleUserInput} value={loginData.email} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input required type="password" name="password" id="password" placeholder="Enter your password" className="bg-transparent px-2 py-1 border" onChange={handleUserInput} value={loginData.password} />
                    </div>

                    <button className=" bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer mt-2" type="submit">
                        Login
                    </button>
                    <p className="text-center">
                        Do not have an accout? <Link to='/signup' className="link text-accent cursor-pointer">Signup</Link>
                    </p>
                </form>

            </div>
        </HomeLayout>
    )
}

export default Login
