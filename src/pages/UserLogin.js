import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { loginUser } from "../services/loginUserAPI";

const UserLogin = () => {
    const [userName, setUserName] = useState("");
    const [password, SetPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // try {
        //   const data = await loginUser(userName, password);

        //   if (data.user.user_type === 8) {
        //     console.log("Login successful:", data);
        //     alert("Successfully Login");
            navigate("/home");
        //   } else {
        //     alert("Invalid Credentials");
        //     console.log(data.user.user_type);
        //   }
        // } catch (error) {
        //   console.error("An error occurred:", error);
        //   console.log("Input email/username:", userName);
        //   console.log("Input password:", password);
        //   alert("Login Error");
        // }
    };

    return (
        <div className="flex my-32 h-fit w-fit flex-col justify-center px-6 py-12 lg:px-8 bg-white rounded-md shadow-2xl">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Dental Appointnment Admin
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label
                            for="email"
                            className="block text-lg font-medium leading-6 text-gray-900"
                        >
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autocomplete="email"
                                onChange={(e) => {
                                    setUserName(e.target.value);
                                }}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6 p-4"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                for="password"
                                className="block text-lg font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                            <div className="text-sm">
                                <text>Forgot password?</text>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autocomplete="current-password"
                                onChange={(e) => {
                                    SetPassword(e.target.value);
                                }}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6 p-4"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            onClick={handleLogin}
                            className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserLogin;