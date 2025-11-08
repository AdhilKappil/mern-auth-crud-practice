import React, { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "../redux/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);
  console.log('formatedata',user);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email });
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update user details
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        
        
      const res = await api.put(
        `/users/update/${user.id}`,
        { name: formData.name, email: formData.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setUser({ user: res.data.user, token }));
      alert("Profile updated successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  // Delete user account
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      await api.delete(`/users/delete/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(clearUser());
      alert("Account deleted successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  // Logout
  const handleLogout = () => {
    dispatch(logout());
    alert("Logged out successfully");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Profile</h2>

        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 mb-5 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-3"
          >
            Update
          </button>
        </form>

        <button
          onClick={handleDelete}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 mb-3"
        >
          Delete Account
        </button>

        <button
          onClick={handleLogout}
          className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
