import NewDriver from "./form";

export const metadata = {
  title: "New Driver Profile",
};

export default async function CreateDriver() {
  return (
    <>
        <div className="h-screen grid place-items-center px-4">

            <NewDriver />
        </div>

    </>
  );
}

