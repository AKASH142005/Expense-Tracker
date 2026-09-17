import AuthLayout from "../../components/AuthLayout";
import { useState } from 'react';
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/Helper";
import { useNavigate } from "react-router-dom";

const SignUp = () => { 
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSignUp = async (e) => { 

    }
    return (
        <AuthLayout>
            <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center ">
                <h3 className="text-xl font-semibold text-black">Create an Account</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6" >
                    Join us today by entering your details below
                </p>

                <form onSubmit={handleSignUp}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            value={fullName}
                            onChange={({ target }) => { target.value }}
                            label="Full Name"
                            placeholder="Akash"
                            type="text"
                        />
                        <Input 
                            value={email}
                            onChange={({ target }) => { target.value }}
                            label="Email Address"
                            placeholder="example@gmail.com"
                            type="text"
                        />
                        <div className="col-span-2">
                        <Input
                            value={password}
                            onChange={({ target }) => { setPassword(target.value) }}
                            label="Password"
                            placeholder="Min 8 Character"
                            type ="password"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </AuthLayout>
    )
}

export default SignUp;