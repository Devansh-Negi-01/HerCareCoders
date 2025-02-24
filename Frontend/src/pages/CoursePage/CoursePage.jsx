import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode}from "jwt-decode";

const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  const token = localStorage.getItem("token");
  let userId = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
    //   console.log(decoded);
      userId = decoded.id; 
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
    }
  }

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/course/${courseId}`, {
        Authorization : token
      })
      .then((res) => setCourse(res.data.course))
      .catch((err) => {console.error("Error fetching course:", err); navigate('/login') });
  }, [courseId, token]);

  const handleBuyCourse = () => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (course?.owner?._id === userId) {
      alert("You cannot buy your own course.");
      return;
    }

    console.log("Buying course...");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {course ? (
        <>
          <h1 className="text-3xl font-semibold">{course.courseName}</h1>
          <p className="text-gray-600">{course.description}</p>
          <p className="mt-2"><strong>Category:</strong> {course.category}</p>
          <p className="mt-1"><strong>Difficulty:</strong> {course.difficulty}</p>
          <p className="mt-1"><strong>Duration:</strong> {course.duration}</p>
          <p className="mt-1"><strong>Price:</strong> ${course.price}</p>
          <p className="mt-1"><strong>Created by:</strong> {course.owner.username}</p>

          {/* First section title */}
          {course.data.length > 0 && (
            <div className="mt-6 p-4 border rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Section 1: {course.data[0].title}</h2>
            </div>
          )}

          {/* Buy Course Button (Hidden for course creator) */}
          {course.owner._id !== userId && (
            <button
              onClick={handleBuyCourse}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Buy Course
            </button>
          )}

          {/* Reviews */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Reviews:</h3>
            {course.review.length > 0 ? (
              course.review.map((rev, index) => (
                <p key={index} className="mt-2">- {rev.msg}</p>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading course...</p>
      )}
    </div>
  );
};

export default CoursePage;
