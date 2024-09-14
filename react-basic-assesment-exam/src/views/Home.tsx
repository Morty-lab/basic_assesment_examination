import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/contextProvider";
import { Navigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import axiosClient from "../axiosClient.js";

const Home = () => {
    const [editing, setEditing] = useState(false);
    const { user, token, setUser,setToken } = useStateContext();

    useEffect(() => {

        axiosClient
            .get("/user")
            .then(({ data }) => {
                console.log(data.user);
                setUser(data.user);
            })

    }, []);


    if (!token) {
        return <Navigate to="/" />;
    }



    // Add null checks here
    const userName = user?.name || "Guest";
    const userEmail = user?.email || "";

    const handleEditToggle = () => {
        setEditing(!editing);
    };

    const handleSaveChanges = () => {
        setEditing(false);
    };

    const handleCancel = () => {
        setEditing(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("ACCESS_TOKEN");


        axiosClient
            .get("/logout")
            .then(({ data }) => {
                setUser(null);
                setToken(null);
            })
            .catch((err) => {
                console.log(err);
            });
    };



    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <header className="flex items-center justify-between mb-4">
                <span className="text-xl font-semibold">
                    Welcome, {userName}
                </span>
                <button
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-300"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </header>

            {user && (
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/2">
                        <div className="flex items-center mb-4">
                            <img
                                src="https://via.placeholder.com/150"
                                alt={userName}
                                className="w-12 h-12 rounded-full mr-4"
                            />
                            <div>
                                <p className="text-lg font-semibold">
                                    {userName}
                                </p>
                                <p className="text-gray-600">{userEmail}</p>
                            </div>
                        </div>

                        {!editing ? (
                            <button
                                onClick={handleEditToggle}
                                className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                            >
                                <FaPen size={20} />
                            </button>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    value={userName}

                                    className="mt-2 w-full p-2 border rounded"
                                />
                                <input
                                    type="email"
                                    value={userEmail}

                                    className="mt-2 w-full p-2 border rounded"
                                />
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={handleSaveChanges}
                                        className="mr-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition-colors duration-300"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors duration-300"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        )}

                        {/* <div className="md:w-1/2">
                            <MapContainer
                                center={[51.505, -0.09]}
                                zoom={13}
                                style={{
                                    height: "200px",
                                    width: "100%",
                                    borderRadius: "10px",
                                }}
                            >
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker position={[51.505, -0.09]} />
                            </MapContainer>
                        </div> */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
