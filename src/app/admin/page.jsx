import FormComponent from "@/components/FormComponent";
import Link from "next/link";

const NEXT_PUBLIC_BASEURL = process.env.NEXT_PUBLIC_BASEURL;

const AdminLogin = () => {

    return (
        <div className="h-screen grid place-items-center px-4">
            
            <FormComponent url={`${NEXT_PUBLIC_BASEURL}/api/server/login`} redirectPath="/home" showForgetPasswordLink={true}/>
            
        </div>


    );
};

export default AdminLogin;
