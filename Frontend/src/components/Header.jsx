import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reduxStore/authSlice2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  let image = null;
  let username = null;

  if (token) {
    const decodedToken = jwtDecode(token);
    image = decodedToken.image;
    username = decodedToken.username;
  }

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleLogout = async () => {
    await axios.post(`${backendUrl}/user/logout`);
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-[#7D84B2] text-[#F9F9ED] py-4 px-6 flex items-center justify-between shadow-md w-full">
      {/* Logo */}
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
        <img src="/logo.jpg" alt="Logo" className="h-10 rounded-2xl" />
        <h1 className="text-2xl font-bold text-[#DBF4A7]">NexLearn</h1>
      </div>

      {/* Scrolling Text */}
      <div className="hidden md:block overflow-hidden w-64 h-6 relative">
        <div className="animate-text-slide text-sm text-[#D9DBF1] font-semibold absolute top-2">
          <span>Explore the Best Courses 📚</span>
          <span>Enhance Your Learning Journey 🚀</span>
          <span>Get Certified & Upgrade Your Skills 🎓</span>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button className="md:hidden text-[#F9F9ED]" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Navigation */}
      <nav className={`absolute z-10 md:relative top-16 md:top-auto left-0 w-full md:w-auto bg-[#7D84B2] md:bg-transparent flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0 p-4 md:p-0 ${menuOpen ? "block" : "hidden md:flex"}`}>
        {isAuthenticated ? (
          <>
            <Link to="/" className="hover:text-[#DBF4A7]">Home</Link>
            <Link to="/about" className="hover:text-[#DBF4A7]">About Us</Link>
            <Link to="/dashboard" className="hover:text-[#DBF4A7]">Dashboard</Link>
            <div
              className="bg-[#8E9DCC] hover:bg-[#D9DBF1] text-[#7D84B2] px-4 py-2 rounded cursor-pointer flex items-center gap-4"
              onClick={handleLogout}
            >
              {image && (
                <img
                  src={image}
                  alt="User"
                  className="h-10 w-10 rounded-full border-2 border-[#DBF4A7]"
                />
              )}
              <p className="text-[#DBF4A7]">
              {username}
              </p>
              
            </div>
          </>
        ) : (
          <button
            className="bg-[#DBF4A7] hover:bg-[#D9DBF1] cursor-pointer text-[#7D84B2] px-4 py-2 rounded"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
