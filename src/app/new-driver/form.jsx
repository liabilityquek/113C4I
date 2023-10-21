'use client'

import React, { useState } from "react";
import armyLogo from "@/assets/singapore-army-saf.png";
import Image from "next/image";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";

const NEXT_PUBLIC_BASEURL = process.env.NEXT_PUBLIC_BASEURL

const NewDriver = () => {
    const [newDriver, setNewDriver] = useState('');
    const [serverError, setServerError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const handleNumericInput = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
    };

    const availabilityOptions = ['PRESENT', 'DEFERRED']

    const onSubmit = async (data) => {
        
        setLoading(true);
        try {
            const response = await fetch(`${NEXT_PUBLIC_BASEURL}/api/server/create-driver`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            setNewDriver(data)
            console.log(`newDriver: ${JSON.stringify(newDriver, null, 2)}`)
            if (!response.status) {
                const errorText = await response.text();
                setLoading(false);
                setServerError(errorText);
                return;
            } if(response.ok){
                const successText = await response.text();
                setSuccess(successText)
            }else {
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
            {success ? <p className="bg-green-100 text-base text-green-600 w-full py-2 px-4 rounded-md mb-6 mt-2"> {success} </p> : null}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
                    <input
                        required
                        type="text"
                        placeholder="Name"
                        className="w-full py-2 px-4 rounded-md"
                        {...register("name", { required: "Name is required" })}
                        style={{ textTransform: "uppercase" }}
                    />
                    {errors.name ? (
                        <p className="text-base text-red-600 w-full py-2 px-4 rounded-md">{errors?.name?.message}</p>
                    ) : null}
                </div>
                <div className="mb-4 w-full border-2 border-gray-600 rounded-md relative">
                    <input
                        required
                        onInput={handleNumericInput}
                        type="text"
                        placeholder="Contact"
                        className="w-full py-2 px-4 rounded-md"
                        {...register("contact", {
                            required: "Contact is required",
                            pattern: {
                                value: /^[0-9]{8}$/,
                                message: 'Contact No must be 8 numeric digits',
                            }
                        })}
                    />
                    {errors.contact ? (<p className="text-base text-red-600 w-full py-2 px-4 rounded-md"> {errors?.contact?.message}</p>) : null}
                </div>
                <div className="mb-4 w-full border-2 border-gray-600 rounded-md relative">
                    <input
                        required
                        type="text"
                        placeholder="Next Of Kin Name"
                        className="w-full py-2 px-4 rounded-md"
                        {...register("next_of_kin_name", {
                            required: "Next Of Kin Name is required",
                        })}
                        style={{ textTransform: "uppercase" }}
                    />
                    {errors.next_of_kin_name ? (
                        <p className="text-base text-red-600 w-full py-2 px-4 rounded-md">{errors?.next_of_kin_name?.message}</p>
                    ) : null}
                </div>
                <div className="mb-4 w-full border-2 border-gray-600 rounded-md relative">
                    <input
                        required
                        onInput={handleNumericInput}
                        type="text"
                        placeholder="Next Of Kin Contact"
                        className="w-full py-2 px-4 rounded-md"
                        {...register("next_of_kin_contact", {
                            required: "Next Of Kin Contact is required",
                            pattern: {
                                value: /^[0-9]{8}$/,
                                message: 'Next Of Kin Contact No must be 8 numeric digits',
                            }
                        })}
                    />
                    {errors.next_of_kin_contact ? (<p className="text-base text-red-600 w-full py-2 px-4 rounded-md"> {errors?.next_of_kin_contact?.message}</p>) : null}
                </div>
                <div className="mb-4 w-full border-2 border-gray-600 rounded-md relative">
                    <input
                        required
                        type="text"
                        placeholder="Relationship"
                        className="w-full py-2 px-4 rounded-md"
                        {...register("relationship", {
                            required: "Relationship is required",
                        })}
                        style={{ textTransform: "uppercase" }}
                    />
                    {errors.relationship ? (
                        <p className="text-base text-red-600 w-full py-2 px-4 rounded-md">{errors?.relationship?.message}</p>
                    ) : null}
                </div>
                <div className="mb-4 w-full border-2 border-gray-600 rounded-md relative">
                    <input
                        required
                        type="text"
                        placeholder="Rank"
                        className="w-full py-2 px-4 rounded-md"
                        {...register("rank", {
                            required: "Rank is required",
                        })}
                        style={{ textTransform: "uppercase" }}
                    />
                    {errors.rank ? (
                        <p className="text-base text-red-600 w-full py-2 px-4 rounded-md">{errors?.rank?.message}</p>
                    ) : null}
                </div>
                <Controller
                    name="availability" // Name of the field, you will access the value using this name in the submit handler.
                    control={control}
                    defaultValue="" // Set a default value if you wish
                    render={({ field }) => (
                    <select className="mb-5 py-2 px-4 w-full border-2 border-gray-600 rounded-md" {...field}>
                        <option value="" disabled>Select Availability</option>
                        {availabilityOptions.map((op, index) => (
                    <option key={index} value={op}>{op}</option>
                    ))}
                    </select>
                    )}
                    />

                <button 
                disabled={loading}
                className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full">
                    {loading ? 'Loading...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default NewDriver;
