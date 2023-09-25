"use client";

import { useState, useEffect,  } from "react";
import { useForm } from "react-hook-form";

const NEXT_PUBLIC_BASEURL = process.env.NEXT_PUBLIC_BASEURL;

const AmendDriverDetailsForm = ({
  driver,
  close,
  setLoading,
  driverId,
  userId,
  setServerError,
}) => {
  const { handleSubmit, register, setValue, watch, formState: { errors } } = useForm();
  
  useEffect(() => {
    if (driver) {
      setValue('rank', driver.rank);
      setValue('name', driver.name);
      setValue('contact', driver.contact);
      setValue('kin', driver.next_of_kin_name);
      setValue('kinContact', driver.next_of_kin_contact);
      setValue('relationship', driver.relationship);
      setValue('availability', driver.availability);
    }
  }, [driver, setValue]);

  const watchedRank = watch('rank');
  const watchedName = watch('name');
  const watchedContact = watch('contact');
  const watchedKin = watch('kin');
  const watchedKinContact = watch('kinContact');
  const disable = !watchedKin || !watchedName || !watchedRank || !watchedContact || watchedContact.length < 8 || !watchedKinContact || watchedKinContact.length < 8;

  const handleNumericInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
};

  //Debugging States
  // useEffect(() => {
  //   console.log('setValue', setValue);
  //   console.log('disable', disable); 
  //   console.log('form errors:', errors); 
  // }, [setValue, disable, errors]);

  const onSubmit = async (data) => {
    // console.log(`data: ${JSON.stringify(data, null, 2)}`);
    try {
      setLoading(true);
      const response = await fetch(
        `${NEXT_PUBLIC_BASEURL}/api/server/amend-driver/${userId}/${driverId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        // If the response status is successful (2xx)
        console.log("Update driver profile successfull");
        setLoading(false);
        return;
      }

      if (response.status === 400) {
        const errorText = await response.text();
        setLoading(false);
        setServerError(errorText);
        return;
      } else {
        const errorData = await response.text();
        setServerError(errorData);
      }
    } catch (e) {
      console.error(`Error amending driver id: ${driverId} - ${e}`);
      setServerError(`An error occurred while processing your request. :${e}`);
    } finally {
      setLoading(false);
    }
  };

  if(!driver) return setLoading(true)
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
          <label>
            Rank:
            <input
              {...register("rank", { required: true })}
              type="text"
              className="w-full py-2 px-4 rounded-md"
              style={{ textTransform: "uppercase" }}
            />
            {errors.rank && <span>Rank is required</span>}
          </label>
        </div>
        <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
          <input
            {...register("name", { required: true })}
            type="text"
            className="w-full py-2 px-4 rounded-md"
            style={{ textTransform: "uppercase" }}
          />
          {errors.name && <span>Name is required</span>}
        </div>
        <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
            <input
              {...register("contact", { required: true, maxLength: 8, pattern: "^[0-9]{8}$" })}
              type="text"
              onInput={handleNumericInput}
              className="w-full py-2 px-4 rounded-md"
              style={{ textTransform: "uppercase" }}
            />
            {errors.contact && <span>Contact No must be 8 numeric digits</span>}
          </div>
        <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
          <input
            {...register("kin", { required: true })}
            type="text"
            className="w-full py-2 px-4 rounded-md"
            style={{ textTransform: "uppercase" }}
          />
          {errors.kin && <span>Next of kin is required</span>}
        </div>
        <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
          <input
            {...register("kinContact", { required: true, maxLength: 8, pattern: "^[0-9]{8}$" })}
            type="text"
            onInput={handleNumericInput}
            className="w-full py-2 px-4 rounded-md"
            style={{ textTransform: "uppercase" }}
          />
          {errors.kinContact && <span>Next of Kin contact no must be 8 numeric digits</span>}
          </div>
        <div className="mb-4 w-full border-2 border-gray-600 rounded-md relative"></div>

        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            disabled={disable}
            className={`cursor pointer inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              disable
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-100 text-blue-900 hover:bg-blue-200"
            }`}
            onClick={!disable ? close : undefined}
          >
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};

export default AmendDriverDetailsForm;
