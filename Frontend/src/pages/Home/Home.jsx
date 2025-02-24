import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../reduxStore/authSlice2";
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      dispatch(
        login({
          email: decoded.email,
          id: decoded.id,
          token: decoded.token,
          role: decoded.role,
        })
      );
    }
  }, [dispatch]);

  return (
   <div>home page</div>
  );
};

export default Home;
