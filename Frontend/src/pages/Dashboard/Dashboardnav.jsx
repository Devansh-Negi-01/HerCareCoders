import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaBook, FaCertificate, FaChalkboardTeacher, FaPlusCircle, FaListAlt, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import {AiFillHeart} from "react-icons/ai"
import {jwtDecode} from "jwt-decode"; 
import axios from "axios";
const DashboardNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role); 
        // setRole("student"); 
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  const menuItems = role === "teacher" ? [
    { path: "/dashboard/teacherInfo", icon: <FaChalkboardTeacher />, label: "Teacher Info" },
    { path: "/dashboard/addCourse", icon: <FaPlusCircle />, label: "Add Course" },
    { path: "/dashboard/ownCourses", icon: <FaListAlt />, label: "My Courses" },
    { path: "/dashboard/myLearning", icon: <FaBook />, label: "My Learning" },
    { path: "/dashboard/certificates", icon: <FaCertificate />, label: "Certificates" },
    {path : "/dashboard/likedCourses", icon: <AiFillHeart />, label: "Liked Courses"}
  ] : [
    { path: "/dashboard/userInfo", icon: <FaUser />, label: "User Information" },
    { path: "/dashboard/myLearning", icon: <FaBook />, label: "My Learning" },
    { path: "/dashboard/certificates", icon: <FaCertificate />, label: "Certifications" },
    {path :"/dashboard/likedCourses",icon : <AiFillHeart/>, label: "Liked Courses" },
    { path: "/dashboard/upgrade", icon: <FaChalkboardTeacher />, label: "Upgrade to Teacher" }

  ];

  return (
    <>
      <button 
        className="md:hidden block h-10 top-4 left-4 z-50 text-white text-2xl p-2 bg-[#7D84B2] rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`fixed md:relative bg-[#8E9DCC] text-white min-h-screen rounded-2xl transition-all duration-300 
        ${isOpen ? "w-60 p-0" : "w-0 p-0"} md:w-1/4 md:p-6`}
      >
        <h2 className={`text-2xl font-bold text-center transition-all duration-300 ${isOpen ? "block" : "hidden"} md:block`}>
          Dashboard
        </h2>

        <div className="mt-6 space-y-4">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className="flex items-center space-x-3 p-3 hover:bg-[#D9DBF1] text-black rounded-lg transition"
            >
              {item.icon}
              <span className={`${isOpen ? "block" : "hidden"} md:block`}>{item.label}</span>
            </NavLink>
          ))}


          <button
            className="flex items-center space-x-3 p-3 w-full text-left hover:bg-[#DBF4A7] text-black rounded-lg transition cursor-pointer"
            onClick={async() => {
              localStorage.removeItem("token");
              await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/logout`);
              window.location.href = "/";

              // Navigate('/');
            }}
          >
            <FaSignOutAlt />
            <span className={`${isOpen ? "block" : "hidden"} md:block`}>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardNav;
