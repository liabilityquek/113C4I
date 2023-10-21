import ResetPasswordForm from "./form";

export const metadata = {
    title: "Reset Password",
  };

const ForgetPassword = () => {

    return (
        <div className="h-screen grid place-items-center px-4">

            <ResetPasswordForm />
        </div>


    );
};

export default ForgetPassword;
