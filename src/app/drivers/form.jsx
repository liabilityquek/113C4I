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
      setValue('name', driver.name);
      setValue('contact', driver.contact);
      setValue('kin', driver.next_of_kin_name);
      setValue('kinContact', driver.next_of_kin_contact);
      setValue('relationship', driver.relationship);
      setValue('availability', driver.availability);
      setValue('avatar', driver.avatar)
      // setValue('relationship', driver.relationship);
    }
  }, [driver, setValue]);

  const watchedRank = watch('rank');
  const watchedName = watch('name');
  const watchedContact = watch('contact');
  const watchedKin = watch('kin');
  const watchedKinContact = watch('kinContact');
  const watchedAvailability = watch('availability');
  // const watchedRelationship = watch('relationship');
  const disable = !watchedAvailability || !watchedKin || !watchedName || !watchedRank || !watchedContact || watchedContact.length !== 8 || !watchedKinContact || watchedKinContact.length !== 8;

  const handleNumericInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
};

  const onSubmit = async (data) => {
    console.log(`data: ${JSON.stringify(data, null, 2)}`);
    const formData = new FormData();
    const avatarFile = document.querySelector('input[type="file"]').files[0];

    if (avatarFile) {
    formData.append('avatar', avatarFile);
  }
  
    formData.append('name', data.name);
    formData.append('contact', data.contact);
    formData.append('rank', data.rank);
    formData.append('kin', data.kin);
    formData.append('availability', data.availability);
    formData.append('kinContact', data.kinContact);
    formData.append('relationship', data.relationship);

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
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-rank">
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
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
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
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-contact">
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
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-kin">
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
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-kinContact">
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
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-availability">
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
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-avatar">
          Upload Avatar
          </label>
          <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
<Controller
  name="avatar"
  control={control}
  render={({ field }) => (
    <input
      type="file"
      className="w-full py-2 px-4 rounded-md"
      defaultValue={''}
      style={{ textTransform: "uppercase" }}
      onChange={(e) => {
        const file = e.target.files[0];
        if (e.target.files.length > 0) {
          field.onChange(e.target.files[0])
          console.log('File selected:');
          console.log('Name:', file.name);
          console.log('Size:', file.size);
          console.log('Type:', file.type);
          console.log('length:', file.length)
          console.log("Form State after File Selection: ", watch());
        }
      }}
    />
  )}
/>
</div>

        <div className="mt-4 flex py-2 px-1 justify-center text-center">
          <button
            type="submit"
            disabled={disable}
            className={`min-w-16 md:w-32 lg:w-48 cursor-pointer inline-flex rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2  ${
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
      <div className="mt-4 flex py-2 px-1 justify-center text-center">
      <button
            className='min-w-16 md:w-32 lg:w-48 cursor-pointer inline-flex rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-blue-100 text-blue-900 hover:bg-blue-200'
            onClick={close}
          >
            Cancel
          </button>
          </div>
    </>
  );
};

export default AmendDriverDetailsForm;