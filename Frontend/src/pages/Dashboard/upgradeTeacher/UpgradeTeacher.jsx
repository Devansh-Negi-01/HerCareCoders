import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpgradeTeacher = () => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL; 

  const handleUpgrade = async () => {
    try {
        const token = localStorage.getItem('token');
      const response = await axios.post(`${backendUrl}/payment/updateProfile`, {
        Authorization : token}, { withCredentials: true });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        console.error("No token received");
      }
    } catch (error) {
      console.error("Error upgrading to teacher:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <button
        onClick={handleUpgrade}
        className="bg-[#7D84B2] hover:bg-[#8E9DCC] text-white px-6 py-3 cursor-pointer rounded-lg shadow-md transition"
      >
        Upgrade to Teacher
      </button>
    </div>
  );
};

export default UpgradeTeacher;
