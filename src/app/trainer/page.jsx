import { TrainerLoginForm } from './form'

export const metadata = {
    title: "Trainer"
}

const TrainerLogin = () => {

    return (
        <div className="h-screen grid place-items-center px-4">
            <TrainerLoginForm />
        </div>
 
    );
};

export default TrainerLogin;
