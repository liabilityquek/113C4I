import FormComponent from "@/components/FormComponent";
const NEXT_PUBLIC_BASEURL = process.env.NEXT_PUBLIC_BASEURL;
const NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL

const ForgetPassword = () => {

    return (
        <div className="h-screen grid place-items-center px-4">

            <FormComponent url={`${NEXT_PUBLIC_BASEURL}/api/server/reset-password`} redirectPath={`${NEXTAUTH_URL}/login/admin`} showForgetPasswordLink={false} buttonText='Reset Password'/>
        </div>


    );
};

export default ForgetPassword;
