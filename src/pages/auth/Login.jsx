import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { Input } from "@nextui-org/react";
import { IoMdEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
import Logo from "../../assets/Logo2.png";

const Login = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_REACT_QC_APP_API}/api/v1/auth/login`, {
                email: data.email,
                password: data.password,
            });

            // Check for success
            if (res?.data?.success) {
                toast.success(res.data.message, { position: 'top-right' });
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });

                localStorage.setItem('auth', JSON.stringify(res.data));

                // Navigate based on role
                res.data.user.role === 1
                    ? navigate('/aameraaadmin2024')
                    : navigate('/');
            } else {
                toast.error(res?.data?.message || 'Login failed. Please try again.', { position: 'top-right' });
            }
        } catch (error) {
            console.error('Login Error:', error);
            toast.error(error.res?.data?.message || 'Something went wrong. Please try again later.', {
                position: 'top-right',
            });
        }
    };

    useEffect(() => {
        if (auth?.user) {
            auth.user.role === 1 ? navigate('/aameraaadmin2024') : navigate('/');
        }
    }, [auth, navigate]);

    return (
        <div className='bg-[#383838] w-full h-screen flex justify-center items-center'>
            <Toaster />
            <div className='bg-[#181818] px-5 py-5 rounded-md w-[250px] h-[400px] md:w-[400px] md:h-[450px]'>
                <img src={Logo} alt="QC Artistry" className='w-[150px] h-[150px] mx-auto' />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        type="email"
                        label="Email"
                        className='w-[100%] mb-5'
                        required
                        {...register("email")}
                    />
                    <Input
                        type={isVisible ? "text" : "password"}
                        className="w-[100%] mb-5"
                        label="Password"
                        required
                        {...register("password")}
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <IoMdEye className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <IoEyeOff className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                    />
                    <button className='bg-[#008000] w-full py-4 rounded-md hover:bg-[#3ad43d] duration-500' type='submit'>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
