"use client";

import { Fragment, useState, useEffect } from "react";
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
  const { handleSubmit, register } = useForm();

  const [driverState, setDriverState] = useState({
    rank: "",
    name: "",
    contact: "",
    kin: "",
    kinContact: "",
    relationship: "",
    availability: "",
  });

  useEffect(() => {
    if (driver) {
      setDriverState({
        rank: driver.rank,
        name: driver.name,
        contact: driver.contact,
        kin: driver.next_of_kin_name,
        kinContact: driver.next_of_kin_contact,
        relationship: driver.relationship,
        availability: driver.availability,
      });
    }
  }, [driver]);

  const handleChange = (e) => {
    const value = e.target.value.toUpperCase();
    setDriverState({
      ...driverState,
      [e.target.name]: value,
    });
  };

  const disable =
    !driverState.rank ||
    !driverState.name ||
    !driverState.contact ||
    !driverState.kin ||
    !driverState.kinContact ||
    driverState.contact.length < 8 ||
    driverState.kinContact.length < 8;
  // !driverState.availability;

  const onSubmit = async (data) => {
    console.log(`data: ${JSON.stringify(data, null, 2)}`);
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
          <label>
            Rank:
            <input
              {...register("rank", { required: true })}
              type="text"
              onChange={handleChange}
              className="w-full py-2 px-4 rounded-md"
              value={driverState.rank}
              style={{ textTransform: "uppercase" }}
            />
          </label>
        </div>
        <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
          <input
            {...register("name", { required: true })}
            type="text"
            onChange={handleChange}
            className="w-full py-2 px-4 rounded-md"
            value={driverState.name}
            style={{ textTransform: "uppercase" }}
          />
        </div>
        {/* <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
                      <input
                        required
                        type="driverState.contact"
                        name="contact"
                        onChange={handleChange}
                        className="w-full py-2 px-4 rounded-md"
                        value={driverState.contact}
                        pattern="^[0-9]{8}$"
                        title="Contact must be 8 digits"
                      />
                    </div> */}
        <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
          <input
            {...register("kin", { required: true })}
            type="text"
            onChange={handleChange}
            className="w-full py-2 px-4 rounded-md"
            value={driverState.kin}
            style={{ textTransform: "uppercase" }}
          />
        </div>
        {/* <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
                      <input
                        required
                        type="driverState.kinContact"
                        name="kinContact"
                        onChange={handleChange}
                        className="w-full py-2 px-4 rounded-md"
                        value={driverState.kinContact}
                        style={{ textTransform: "uppercase" }}
                        pattern="^[0-9]{8}$"
                        title="Next of Kin Contact must be 8 digits"
                      />
                    </div> */}
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
