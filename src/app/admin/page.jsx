import AdminLoginForm from './form'

export const metadata = {
    title: "Admin"
}

const AdminLogin = () => {

    return (
        <div className="h-screen grid place-items-center px-4">
            <AdminLoginForm />
        </div>
 
    );
};

export default AdminLogin;
