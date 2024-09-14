import { useState, useRef } from "react";
import { useStateContext } from "../contexts/contextProvider";
import { Navigate } from "react-router-dom";
import axiosClient from "../axiosClient.js";

const Authentication = () => {
    const emailref = useRef<HTMLInputElement>(null);
    const roleref = useRef<HTMLSelectElement>(null);
    const nameref = useRef<HTMLInputElement>(null);
    const passwordref = useRef<HTMLInputElement>(null);
    const [registerMode, setRegisterMode] = useState(false);
    const { user, token } = useStateContext();

    const { setUser, setToken } = useStateContext();

    if (token) {
        return <Navigate to="/home" />;
    }

    const handleRegister = () => {
        setRegisterMode(!registerMode);
    };

    const submitRegister = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameref.current?.value,
            email: emailref.current?.value,
            role: roleref.current?.value,
            password: passwordref.current?.value,
        };

        axiosClient
            .post("/register", payload)
            .then(({ data }) => {
                console.log(data);
                setUser(data.user);
                console.log(user);
                setToken(data.token);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const submitLogin = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailref.current?.value,
            password: passwordref.current?.value,
        };

        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="w-full h-[100vh] flex justify-center items-center dark:bg-gray-900 ">
            <div className="bg-blue-500 max-w-3xl max-h-3xl bg-white rounded-lg shadow-md dark:bg-gray-800 flex flex-row justify-between">
                {!registerMode ? (
                    <div className="bg-white w-1/2 rounded-lg">
                        <img
                            src="./../../public/assets/undraw_secure_login_pdn4.svg"
                            alt=""
                            className="object-contain w-full h-full p-5"
                        />
                    </div>
                ) : (
                    " "
                )}

                <div className="w-1/2 p-5">
                    {!registerMode ? (
                        <form onSubmit={submitLogin}>
                            <div className="flex flex-col w-full ">
                                <div>
                                    <label className="text-gray-700 dark:text-gray-200">
                                        Email
                                    </label>
                                    <input
                                        ref={emailref}
                                        id="email"
                                        type="email"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    />
                                </div>

                                <div>
                                    <label className="text-gray-700 dark:text-gray-200">
                                        Password
                                    </label>
                                    <input
                                        ref={passwordref}
                                        id="password"
                                        type="password"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button type="submit" className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                    Login
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={submitRegister}>
                            <div className="flex flex-col w-full ">
                                <div>
                                    <label className="text-gray-700 dark:text-gray-200">
                                        Name
                                    </label>
                                    <input
                                        ref={nameref}
                                        id="name"
                                        type="name"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-700 dark:text-gray-200">
                                        Email
                                    </label>
                                    <input
                                        ref={emailref}
                                        id="email"
                                        type="email"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    />
                                </div>

                                <div>
                                    <label className="text-gray-700 dark:text-gray-200">
                                        User Type
                                    </label>
                                    <select
                                        ref={roleref}
                                        id="countries"
                                        className="block w-full p-2.5 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    >
                                        <option selected value={0}>
                                            Customer
                                        </option>
                                        <option value={1}>Seller</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-gray-700 dark:text-gray-200">
                                        Password
                                    </label>
                                    <input
                                        ref={passwordref}
                                        id="password"
                                        type="password"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    />
                                </div>

                            </div>

                            <div className="flex justify-end mt-6">
                                <button
                                    type="submit"
                                    className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    )}

                    {!registerMode ? (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            No Account?{" "}
                            <span
                                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                onClick={() => handleRegister()}
                            >
                                Register
                            </span>{" "}
                        </p>
                    ) : (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Already Have an Account?{" "}
                            <span
                                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                onClick={() => handleRegister()}
                            >
                                Login
                            </span>{" "}
                        </p>
                    )}
                </div>

                {!registerMode ? (
                    ""
                ) : (
                    <div className="bg-white w-1/2 rounded-lg">
                        <img
                            src="./../../public/assets/undraw_secure_login_pdn4.svg"
                            alt=""
                            className="object-contain w-full h-full p-5"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Authentication;
