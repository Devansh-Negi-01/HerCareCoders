import React, { useState ,useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { logout,login } from "../reduxStore/authSlice2";
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
   useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
    
        if (token) {
          localStorage.setItem("token", token);
          const decodedToken = jwtDecode(token);
          dispatch(login({ 
            email: decodedToken.email, 
            id: decodedToken.id, 
            token, 
            role: decodedToken.role, 
            image: decodedToken.image,
            username : decodedToken.username
          }));
    
          navigate('/'); 
        }
      }, [dispatch,navigate]);
  const token = localStorage.getItem("token");
  let image = null;
  let username = null;

  if (token) {
    const decodedToken = jwtDecode(token);
    image = decodedToken.image;
    username = decodedToken.username;
  }
  // console.log(image);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleLogout = async () => {
    await axios.post(`${backendUrl}/user/logout`);
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-[#7D84B2] text-[#F9F9ED] py-4 px-6 flex items-center justify-between shadow-md w-full">
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
        <img src="/logo.jpg" alt="Logo" className="h-10 rounded-2xl" />
        <h1 className="text-2xl font-bold text-[#DBF4A7]">NexLearn</h1>
      </div>

      {/* Scrolling Text */}
      <div className="hidden lg:block overflow-hidden w-64 h-6 relative">
        <div className="animate-text-slide text-md text-[#DBF4A7] font-semibold absolute top-2">
          <span >Explore the Best Courses 📚</span>
          <span>Enhance Your Learning Journey 🚀</span>
          <span>Get Certified & Upgrade Your Skills 🎓</span>
        </div>
      </div>

      <button className="md:hidden text-[#F9F9ED]" onClick={() => setMenuOpen(!menuOpen)}>
        {/* {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />} */}
        <img src={image} alt="User" className="h-10 w-10 rounded-full border-2 border-[#DBF4A7]" />
      </button>

      <nav className={`absolute z-10 md:relative top-16 md:top-auto left-0 w-full md:w-auto bg-[#7D84B2] md:bg-transparent flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0 p-4 md:p-0 ${menuOpen ? "block" : "hidden md:flex"}`}>
        {isAuthenticated ? (
          <>
            <Link to="/" className="hover:text-[#DBF4A7]">Home</Link>
            <Link to="/about" className="hover:text-[#DBF4A7]">About Us</Link>
            <Link to="/dashboard" className="hover:text-[#DBF4A7]">Dashboard</Link>
            <Link to="/allCourses" className="hover:text-[#DBF4A7]">All Courses</Link>
            <div
              className="bg-[#8E9DCC] hover:bg-[#D9DBF1] text-[#7D84B2] px-4 py-2 rounded cursor-pointer flex items-center gap-4"
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
            <button onClick={handleLogout} className="bg-[#8E9DCC] hover:bg-[#D9DBF1] text-[#DBF4A7] px-8 py-4 rounded cursor-pointer flex items-center gap-4">Logout</button>
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
