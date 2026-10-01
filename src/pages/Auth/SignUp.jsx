import AuthLayout from "../../components/layouts/AuthLayout";
import { useContext, useState } from 'react';
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/Helper";
import { Link ,useNavigate } from "react-router-dom";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { UserContext } from "../../contexts/UserContext";

import uploadImage from "../../utils/uploadImage"

const SignUp = () => { 
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);

    const { updateUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleSignUp = async (e) => { 
        e.preventDefault();
        
        let profileImageUrl = "";

        if (!fullName) { 
            setError("Please enter your name ");
            return;
        }

        if (!validateEmail(email)) { 
            setError("Please enter a valid email address");
            return;
        }

        if (!password) { 
            setError("Please enter the password");
            return;
        }

        if (password && password.length < 8) { 
            setError("Please enter the password Min 8 Character");
            return;
        }
        setError("");

        try {
            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
            
                profileImageUrl = imgUploadRes.imageUrl || "";
            }
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl
            });

            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(user);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.message.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong . Please try again. ");
            }
        }

    }
    return (
    <AuthLayout>
    <div
        className="
            w-full
            h-[calc(100vh-80px)]
            mt-10
            flex
            flex-col
            justify-start
            overflow-y-auto
            overflow-x-hidden
            pb-10
            pr-2
            box-border
            [&::-webkit-scrollbar]:hidden
            [-ms-overflow-style:none]
            [scrollbar-width:none]
        "
    >
        <div className="w-full max-w-3xl">

            <h3 className="text-xl font-semibold text-black">
                Create an Account
            </h3>

            <p className="text-xs text-slate-700 mt-[5px] mb-6">
                Join us today by entering your details below
            </p>

            <form onSubmit={handleSignUp} className="w-full">

                <ProfilePhotoSelector
                    image={profilePic}
                    setImage={setProfilePic}
                />

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="w-full">
                        <Input
                            value={fullName}
                            onChange={({ target }) =>
                                setFullName(target.value)
                            }
                            label="Full Name"
                            placeholder="John"
                            type="text"
                        />
                    </div>

                    <div className="w-full">
                        <Input
                            value={email}
                            onChange={({ target }) =>
                                setEmail(target.value)
                            }
                            label="Email Address"
                            placeholder="example@gmail.com"
                            type="text"
                        />
                    </div>

                    <div className="w-full md:col-span-2">
                        <Input
                            value={password}
                            onChange={({ target }) =>
                                setPassword(target.value)
                            }
                            label="Password"
                            placeholder="Min 8 Character"
                            type="password"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-xs pb-2.5 md:col-span-2">
                            {error}
                        </p>
                    )}

                    <div className="w-full md:col-span-2">
                        <button
                            type="submit"
                            className="btn-primary"
                        >
                            SignUp
                        </button>
                    </div>

                    <p className="text-[13px] text-slate-800 mt-3 md:col-span-2">
                        Already have an account?{" "}
                        <Link
                            className="font-medium text-primary underline"
                            to="/login"
                        >
                            Login
                        </Link>
                    </p>

                </div>
            </form>

        </div>
    </div>
</AuthLayout>
    )
}

export default SignUp;