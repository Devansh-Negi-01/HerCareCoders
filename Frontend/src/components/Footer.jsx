import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { login } from "../reduxStore/authSlice2";

const Footer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      dispatch(login({ 
        email: decoded.email, 
        id: decoded.id, 
        token: decoded.token, 
        role: decoded.role, 
        image: decoded.image, 
        username: decoded.username 
      }));
    }
  }, [dispatch]);

  return (
    <footer className="bg-[#7D84B2] text-[#F9F9ED] py-8 px-10 md:py-12 md:px-16">
        <div className="flex flex-wrap justify-between items-start gap-6 md:gap-16">
          <div className="flex flex-col space-y-4 md:space-y-6 md:pr-16">
            <h2 className="text-2xl font-bold">NexLearn</h2>
            <div className="flex space-x-4 mt-2">
              <img src="/homepage_images/facebook.jpg" alt="Facebook" className="w-6 h-6" />
              <img src="/homepage_images/linkedin.jpg" alt="LinkedIn" className="w-6 h-6" />
              <img src="/homepage_images/youtube.jpg" alt="YouTube" className="w-6 h-6" />
              <img src="/homepage_images/instagram.jpg" alt="Instagram" className="w-6 h-6" />
            </div>
          </div>
          <div className="flex flex-wrap gap-12 md:space-y-6 md:pl-16">
            <div>
              <h3 className="font-semibold">Help</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>About us</li>
                <li>Privacy</li>
                <li>Content</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Themes</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>Business</li>
                <li>Technology</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">More</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>Terms</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
