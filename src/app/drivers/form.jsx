"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

const NEXT_PUBLIC_BASEURL = process.env.NEXT_PUBLIC_BASEURL;

const AmendDriverDetailsForm = ({
  driver,
  close,
  setLoading,
  driverId,
  userId,
  setServerError,
}) => {
  const { handleSubmit, register, setValue, watch, control, formState: { errors } } = useForm();
  
  const availabilityOptions = ['PRESENT', 'DEFERRED']

  useEffect(() => {
    if (driver) {
      setValue('rank', driver.rank);
      console.log(`avatar data: ${driver.avatar}`)
      setValue('name', driver.name);
      setValue('contact', driver.contact);
      setValue('kin', driver.next_of_kin_name);
      setValue('kinContact', driver.next_of_kin_contact);
      setValue('relationship', driver.relationship);
      setValue('availability', driver.availability);
      setValue('avatar', driver.avatar)
      setValue('relationship', driver.relationship);
    }
  }, [driver, setValue]);

  const watchedRank = watch('rank');
  const watchedName = watch('name');
  const watchedContact = watch('contact');
  const watchedKin = watch('kin');
  const watchedKinContact = watch('kinContact');
  const watchedAvailability = watch('availability');
  const watchedRelationship = watch('relationship');
  const disable = !watchedRelationship || !watchedAvailability || !watchedKin || !watchedName || !watchedRank || !watchedContact || watchedContact.length !== 8 || !watchedKinContact || watchedKinContact.length !== 8;

  const handleNumericInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
};

  const onSubmit = async (data) => {
    // console.log(`data: ${JSON.stringify(data, null, 2)}`);
    const formData = new FormData();
    formData.append('files', data.avatar)
    data = { ...data, avatar: data.avatar[0]?.name };

    Object.keys(data).forEach(key => {
    if(data[key] !== undefined && data[key] !== null && key !== 'avatar') {
      formData.append(key, data[key]);
    }
  });

  for (var pair of formData.entries()) {
    console.log(pair[0]+ ', ' + pair[1]);
}

    try {
      setLoading(true);
      const response = await fetch(
        `${NEXT_PUBLIC_BASEURL}/api/server/amend-driver/${userId}/${driverId}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (response.ok) {
        // If the response status is successful (2xx)
        console.log("Update driver profile successfull");
        setLoading(false);
        close();
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        setLoading(false);
        setServerError(errorText);
        return;
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
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Rank
            </label>
        <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
            <input
              {...register("rank", { required: true })}
              type="text"
              className="w-full py-2 px-4 rounded-md"
              style={{ textTransform: "uppercase" }}
            />
            {errors.rank && <p className="text-red-500 text-xs italic">Rank is required</p>}
        </div>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Name
          </label>
        <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
          <input
            {...register("name", { required: true })}
            type="text"
            className="w-full py-2 px-4 rounded-md"
            style={{ textTransform: "uppercase" }}
          />
          {errors.name && <p className="text-red-500 text-xs italic">Name is required</p>}
        </div>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Contact
          </label>
        <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
            <input
              {...register("contact", { required: true, maxLength: 8, pattern: /^[0-9]{8}$/ })}
              type="text"
              onInput={handleNumericInput}
              className="w-full py-2 px-4 rounded-md"
              style={{ textTransform: "uppercase" }}
            />
            {errors.contact && <p className="text-red-500 text-xs italic">Contact No must be 8 numeric digits</p>}
          </div>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Next of Kin
          </label>
        <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
          <input
            {...register("kin", { required: true })}
            type="text"
            className="w-full py-2 px-4 rounded-md"
            style={{ textTransform: "uppercase" }}
          />
          {errors.kin && <p className="text-red-500 text-xs italic">Next of kin is required</p>}
        </div>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Relationship
          </label>
        <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
          <input
            {...register("relationship", { required: true })}
            type="text"
            className="w-full py-2 px-4 rounded-md"
            style={{ textTransform: "uppercase" }}
          />
          {errors.kinContact && <p className="text-red-500 text-xs italic">Next of Kin contact no must be 8 numeric digits</p>}
          </div>        
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Next of Kin Contact
          </label>
        <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
          <input
            {...register("kinContact", { required: true, maxLength: 8, pattern: /^[0-9]{8}$/ })}
            type="text"
            onInput={handleNumericInput}
            className="w-full py-2 px-4 rounded-md"
            style={{ textTransform: "uppercase" }}
          />
          {errors.kinContact && <p className="text-red-500 text-xs italic">Next of Kin contact no must be 8 numeric digits</p>}
          </div>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Availability
          </label>
          <Controller
        name="availability" // Name of the field, you will access the value using this name in the submit handler.
        control={control}
        defaultValue="" // Set a default value if you wish
        render={({ field }) => (
          <select className="mb-5 py-2 px-4 w-full border-2 border-gray-600 rounded-md" {...field}>
            <option value="" disabled>Select an option</option>
            {availabilityOptions.map((op, index) => (
          <option key={index} value={op}>{op}</option>
        ))}
          </select>
        )}
      />
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Upload Avatar
          </label>
          <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
<Controller
  name='avatar'
  className="w-full py-2 px-4 rounded-md"
  control={control}
  render={({ field: { value, onChange, ...field } }) => {
    return (
      <input
        {...field}
        value={value?.fileName}
        onChange={(e) => {
          onChange(e.target.files[0]);
          console.log("Form State after File Selection: ", watch());
        }}
        type="file"
      />
    );
  }}
/>

</div>

        <div className="mt-4">
          <button
            type="submit"
            disabled={disable}
            className={`px-4 py-2 flex justify-center items-center w-full cursor-pointer rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2  ${
              disable
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-100 text-blue-900 hover:bg-blue-200"
            }`}
            // onClick={!disable ? close : undefined}
            
          >
            Save Changes
          </button>
        </div>
      <div className="mt-4">
      <button
            className='px-4 py-2 flex justify-center items-center w-full cursor-pointer rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-blue-100 text-blue-900 hover:bg-blue-200'
            onClick={close}
          >
            Cancel
          </button>
          </div>
      </form>
    </>
  );
};

export default AmendDriverDetailsForm;