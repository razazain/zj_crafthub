import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { API_URL } from "../config";

interface UserProfile {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    profileImage?: {
        url: string;
        alt: string;
    };
    createdAt: string;
}

const Profile: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"login" | "register" | "update" | "password">("login");
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    // 🔹 Shared Form Data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        profileImage: null as File | null,
    });

    // 🔹 Password change data
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
    });

    // 🔹 Fetch profile
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await fetch(`${API_URL}/auth/me`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                if (res.ok && data.user) {
                    setUser(data.user);
                    setFormData((prev) => ({
                        ...prev,
                        name: data.user.name,
                        email: data.user.email,
                        phoneNumber: data.user.phoneNumber,
                    }));
                } else {
                    localStorage.removeItem("token");
                }
            } catch (error) {
                toast.error("Error fetching profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // 🔹 Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // 🔹 Handle registration
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("phoneNumber", formData.phoneNumber);
            formDataToSend.append("password", formData.password);
            if (formData.profileImage) {
                formDataToSend.append("profileImage", formData.profileImage);
            }

            const res = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                body: formDataToSend,
            });

            const data = await res.json();
            if (res.ok) {
                toast.success("Registration successful!");
                setActiveTab("login");
            } else {
                toast.error(data.message || "Registration failed!");
            }
        } catch (error) {
            toast.error("Something went wrong during registration.");
        }
    };

    // 🔹 Handle login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                toast.success("Login successful!");
                localStorage.setItem("token", data.token);
                window.location.reload();
            } else {
                toast.error(data.message || "Invalid credentials!");
            }
        } catch {
            toast.error("Something went wrong during login.");
        }
    };

    // 🔹 Handle profile update
    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        try {
            const token = localStorage.getItem("token");
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("phoneNumber", formData.phoneNumber);
            if (formData.profileImage) {
                formDataToSend.append("profileImage", formData.profileImage);
            }

            const res = await fetch(`${API_URL}/auth/users/${user._id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            const data = await res.json();
            if (res.ok) {
                toast.success("Profile updated successfully!");
                setUser(data.user);
                setActiveTab("update");
            } else {
                toast.error(data.message || "Profile update failed!");
            }
        } catch {
            toast.error("Error updating profile.");
        }
    };

    // 🔹 Handle password change
    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/auth/me/change-password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(passwordData),
            });

            const data = await res.json();
            if (res.ok) {
                toast.success("Password updated successfully!");
                setPasswordData({ currentPassword: "", newPassword: "" });
            } else {
                toast.error(data.message || "Password change failed!");
            }
        } catch {
            toast.error("Error updating password.");
        }
    };

    // 🔹 Handle logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        toast.success("Logged out successfully!");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-600 text-lg">Loading...</p>
            </div>
        );
    }

    // 🔹 Logged-in view
    if (user) {
        return (
            <div className="flex items-center justify-center px-4 py-12 bg-white">
                <Toaster position="top-center" />
                <div className="max-w-lg w-full p-8 border rounded-2xl shadow-md bg-[#fdfaf9]">
                    <img
                        src={user.profileImage?.url || "http://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80"}
                        alt={user.name}
                        className="w-32 h-32 mx-auto rounded-full border-4 border-[#d0a19b] object-cover mb-4"
                    />
                    <h2 className="text-3xl font-bold text-[#d0a19b] mb-2 text-center">
                        {user.name}
                    </h2>
                    <p className="text-gray-700 text-center mb-1">{user.email}</p>
                    <p className="text-gray-700 text-center mb-1">{user.phoneNumber}</p>

                    <div className="flex justify-center gap-3 mt-6">
                        <button
                            onClick={() => setActiveTab("update")}
                            className="px-4 py-2 bg-[#f6dfd7] rounded-lg hover:border-[#d0a19b] border-2 border-transparent"
                        >
                            Edit Profile
                        </button>
                        <button
                            onClick={() => setActiveTab("password")}
                            className="px-4 py-2 bg-[#f6dfd7] rounded-lg hover:border-[#d0a19b] border-2 border-transparent"
                        >
                            Change Password
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-[#f6dfd7] rounded-lg hover:border-[#d0a19b] border-2 border-transparent"
                        >
                            Logout
                        </button>
                    </div>

                    {/* 🔹 Update Profile Form */}
                    {activeTab === "update" && (
                        <form onSubmit={handleUpdateProfile} className="space-y-4 mt-8">
                            <h3 className="text-xl font-semibold text-center text-[#d0a19b]">
                                Update Profile
                            </h3>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#d0a19b]"
                            />

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#d0a19b]"
                            />

                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                            />

                            <input
                                type="file"
                                name="profileImage"
                                accept="image/*"
                                onChange={handleChange}
                                id="profileImage"
                                className="sr-only"
                            />
                            <label
                                htmlFor="profileImage"
                                className="flex items-center justify-between w-full px-4 py-2 border border-gray-300 rounded-lg bg-[#f6dfd7] text-gray-700 cursor-pointer hover:bg-[#e8c4bb] transition-all"
                            >
                                <span className="truncate">
                                    {formData.profileImage
                                        ? (formData.profileImage as File).name
                                        : "Choose Profile Image"}
                                </span>
                                <span className="px-3 py-1 text-sm font-medium bg-white border border-gray-300 rounded-lg">
                                    Browse
                                </span>
                            </label>

                            <button
                                type="submit"
                                className="w-full bg-[#f6dfd7] py-2 rounded-lg font-semibold hover:border-[#d0a19b] border-2 border-transparent"
                            >
                                Save Changes
                            </button>
                        </form>
                    )}

                    {/* 🔹 Change Password Form */}
                    {activeTab === "password" && (
                        <form onSubmit={handlePasswordChange} className="space-y-4 mt-8">
                            <h3 className="text-xl font-semibold text-center text-[#d0a19b]">
                                Change Password
                            </h3>

                            <input
                                type="password"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={(e) =>
                                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                                }
                                placeholder="Current Password"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#d0a19b]"
                            />

                            <input
                                type="password"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={(e) =>
                                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                                }
                                placeholder="New Password"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#d0a19b]"
                            />

                            <button
                                type="submit"
                                className="w-full bg-[#f6dfd7] py-2 rounded-lg font-semibold hover:border-[#d0a19b] border-2 border-transparent"
                            >
                                Update Password
                            </button>
                        </form>
                    )}
                </div>
            </div>
        );
    }

    // 🔹 Login/Register view
    return (
        <div className="bg-white flex items-center justify-center px-4 py-12">
            <Toaster position="top-center" />
            <div className="w-full max-w-lg p-8">
                <h2 className="text-8xl font-bold text-[#d0a19b] text-center mb-8 custom-font">
                    {activeTab === "login" ? "Login" : "Register"}
                </h2>

                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => setActiveTab("login")}
                        className={`px-6 py-2 font-medium rounded-l-full border-2 ${activeTab === "login"
                            ? "bg-[#f6dfd7] border-[#d0a19b]"
                            : "bg-white border-gray-300"
                            }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setActiveTab("register")}
                        className={`px-6 py-2 font-medium rounded-r-full border-2 ${activeTab === "register"
                            ? "bg-[#f6dfd7] border-[#d0a19b]"
                            : "bg-white border-gray-300"
                            }`}
                    >
                        Register
                    </button>
                </div>

                {activeTab === "login" && (
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                        <button
                            type="submit"
                            className="w-full bg-[#f6dfd7] py-2 rounded-lg font-semibold"
                        >
                            Login
                        </button>
                    </form>
                )}

                {activeTab === "register" && (
                    <form onSubmit={handleRegister} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                        <input
                            type="file"
                            name="profileImage"
                            accept="image/*"
                            onChange={handleChange}
                            id="profileImage"
                            className="sr-only"
                        />
                        <label
                            htmlFor="profileImage"
                            className="flex items-center justify-between w-full px-4 py-2 border border-gray-300 rounded-lg bg-[#f6dfd7] text-gray-700 cursor-pointer hover:bg-[#e8c4bb] transition-all"
                        >
                            <span className="truncate">
                                {formData.profileImage
                                    ? (formData.profileImage as File).name
                                    : "Choose Profile Image"}
                            </span>
                            <span className="px-3 py-1 text-sm font-medium bg-white border border-gray-300 rounded-lg">
                                Browse
                            </span>
                        </label>
                        <button
                            type="submit"
                            className="w-full bg-[#f6dfd7] py-2 rounded-lg font-semibold"
                        >
                            Register
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Profile;
