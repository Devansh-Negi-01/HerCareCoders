import React, {  useState,useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const TeacherInfo = () => {
  const [teacher, setTeacher] = useState(null);

  let userId = null;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        userId = decoded.id;
        setTeacher(decoded); 
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []); 



  if (!teacher) return <p>Loading profile...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center space-x-4">
        <img src={teacher.image} alt="Profile" className="w-24 h-24 rounded-full border" />
        <div>
          <h1 className="text-2xl font-semibold">{teacher.username}</h1>
          <p className="text-gray-600">{teacher.role === "teacher" ? "Instructor" : "Student"}</p>
          <p className="text-gray-500">{teacher.email}</p>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">About Me</h2>
        <p className="text-gray-600">Passionate educator in web development & AI with 5+ years of experience.</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Connect With Me</h2>
        <div className="flex space-x-4 mt-2">
          <a href="#" className="text-blue-600">LinkedIn</a>
          <a href="#" className="text-gray-800">GitHub</a>
          <a href="#" className="text-green-600">Personal Website</a>
        </div>
      </div>
    </div>
  );
};

export default TeacherInfo;
