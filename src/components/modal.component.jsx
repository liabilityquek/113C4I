"use client";

import { Dialog, Transition, Listbox } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export const DeleteModal = ({ driver, close, isOpen, onDelete }) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Are you sure you want to delete this {driver} profile?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      All the data will be permanently removed. This action
                      cannot be undone.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        onDelete();
                        close();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export const AmendModal = ({
  driver,
  close,
  isOpen,
  onSubmit,
  serverError,
}) => {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = (e) => {
    const value = e.target.value.toUpperCase()
    setDriverState({
      ...driverState,
      [e.target.name]: value,
    });
  };

  const disable =
    !driverState.rank ||
    !driverState.contact ||
    !driverState.kin ||
    !driverState.kinContact ||
    !driverState.availability;

  return (
    <>              
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                  // as="h3"
                  // className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {serverError ? (
                      <p className="bg-red-100 text-base text-red-600 w-full py-2 px-4 rounded-md mb-6 mt-2">
                        {" "}
                        {serverError}{" "}
                      </p>
                    ) : null}
                  </Dialog.Title>

                  <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
                      <label>                   
                        Rank: 
                      <input
                        required
                        type="driverState.rank"
                        name="rank"
                        onChange={handleChange}
                        className="w-full py-2 px-4 rounded-md"
                        value={driverState.rank}
                        style={{ textTransform: "uppercase" }}
                      />
                      </label>
                    </div>
                    <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
                      <input
                        required
                        type="driverState.name"
                        name="name"
                        onChange={handleChange}
                        className="w-full py-2 px-4 rounded-md"
                        value={driverState.name}
                        style={{ textTransform: "uppercase" }}
                      />
                    </div>
                    <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
                      <input
                        required
                        type="driverState.contact"
                        name="contact"
                        onChange={handleChange}
                        className="w-full py-2 px-4 rounded-md"
                        value={driverState.contact}
                      />
                    </div>
                    <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
                      <input
                        required
                        type="driverState.kin"
                        name="kin"
                        onChange={handleChange}
                        className="w-full py-2 px-4 rounded-md"
                        value={driverState.kin}
                        style={{ textTransform: "uppercase" }}
                      />
                    </div>
                    <div className="mb-4 w-full border-2 border-gray-600 rounded-md">
                      <input
                        required
                        type="driverState.kinContact"
                        name="kinContact"
                        onChange={handleChange}
                        className="w-full py-2 px-4 rounded-md"
                        value={driverState.kinContact}
                        style={{ textTransform: "uppercase" }}
                      />
                    </div>
                    <div className="mb-4 w-full border-2 border-gray-600 rounded-md relative"></div>

                    <div className="mt-4 flex justify-center">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        disabled={disable}
                        onClick={close}
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
