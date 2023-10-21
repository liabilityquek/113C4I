'use client'

import React, { useState } from "react";
import armyLogo from "@/assets/singapore-army-saf.png";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';

const NEXT_PUBLIC_BASEURL = process.env.NEXT_PUBLIC_BASEURL

const NewVehicle = () => {
    const [revealPassword, setRevealPassword] = useState(false);
    const [serverError, setServerError] = useState(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        
        setLoading(true);
        try {
            const response = await fetch(`${NEXT_PUBLIC_BASEURL}/api/server/reset-password`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (response.status === 400) {
                const errorText = await response.text();
                setLoading(false);
                setServerError(errorText);
                return;
            }
            if (response.ok) {
                router.push('/admin')
            } else {
                const errorData = await response.text();
                setServerError(errorData);
            }
        } catch (error) {
            console.log(`Error logging in: ${error}`);
        }
        setLoading(false);
    };

    return (
        <div className="bg-white rounded-md py-8 px-8 flex flex-col max-w-lg">
            <div className="flex gap-12 w-4/5 mx-auto mb-8">
                <div className="w-full grid place-items-center">
                    <Image src={armyLogo} alt="sgID logo" />
                </div>
            </div>
            {serverError ? <p className="bg-red-100 text-base text-red-600 w-full py-2 px-4 rounded-md mb-6 mt-2"> {serverError} </p> : null}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
                    <input
                        required
                        type="email"
                        name="email"
                        placeholder="Email address"
                        className="w-full py-2 px-4 rounded-md"
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email ? (
                        <p className="text-base text-red-600 w-full py-2 px-4 rounded-md">{errors?.email?.message}</p>
                    ) : null}
                </div>
                <div className="mb-4 w-full border-2 border-gray-600 rounded-md relative">
                    <input
                        required
                        type={revealPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        className="w-full py-2 px-4 rounded-md"
                        {...register("password", {
                            required: "Password is required",
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                                message: 'Password must at least contain: 1 uppercase, 1 lowercase, 1 number, and 1 special character',
                            }
                        })}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                        onClick={() => setRevealPassword(!revealPassword)}
                    >
                        {revealPassword ? 'Hide' : 'Show'}
                    </button>
                    {errors.password ? (<p className="text-base text-red-600 w-full py-2 px-4 rounded-md"> {errors?.password?.message}</p>) : null}
                </div>


                <button 
                disabled={loading}
                className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full">
                    {loading ? 'Loading...' : 'Reset'}
                </button>
            </form>
        </div>
    );
};

export default NewVehicle;
