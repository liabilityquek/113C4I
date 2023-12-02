import NewVehicle from "./form";


export const metadata = {
  title: "New Vehicle Profile",
};

export default async function CreateVehicle() {

  return (
    <>
      <div className="h-screen grid place-items-center px-4">
            <NewVehicle />
        </div>
    </>
  );
}
