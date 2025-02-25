import React from "react";
import { useSelector } from "react-redux";

const UserInfo = () => {
  const user = useSelector((state) => state.auth);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center space-x-4">
        <img src={user.image} alt="Profile" className="w-24 h-24 rounded-full border" />
        <div>
          <h1 className="text-2xl font-semibold">{user.username}</h1>
          <p className="text-gray-600">{user.role === "teacher" ? "Instructor" : "Student"}</p>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-gray-500">Role: {user.role}</p>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">About Me</h2>
        <p className="text-gray-600">Passionate learner and contributor in web development & AI.</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Connect With Me</h2>
        <div className="flex space-x-4 mt-2">
          <a href="#" className="text-blue-600">LinkedIn</a>
          <a href="#" className="text-gray-800">GitHub</a>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
