import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OwnerCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        // console.log(token);
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/course/myCourses`,
          {
            Authorization: token,
          }
        );
        setCourses(response.data.courses || []);
      } catch (error) {
        console.error("Error fetching courses", error);
        setCourses([]);
      }
    };

    fetchCourses();
  }, []);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#7D84B2] mb-4">My Courses</h2>
      {courses.length === 0 ? (
        <p className="text-gray-600">No courses found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="p-4 border rounded-lg shadow bg-[#D9DBF1]">
              <h3 className="text-lg font-semibold text-[#2A4494]">{course.courseName}</h3>
              <p className="text-[#4A4A4A]"><strong>Category:</strong> {course.category}</p>
              <p className="text-[#4A4A4A]"><strong>Price:</strong> ₹{course.price}</p>
              <p className="text-[#4A4A4A]"><strong>Duration:</strong> {course.duration}</p>
              <p className="text-[#4A4A4A]"><strong>Difficulty:</strong> {course.difficulty}</p>
              <p className="text-gray-700"><strong>Description:</strong> {course.description}</p>
              <button
                onClick={() => navigate(`/dashboard/editCourse/${course._id}`)}
                className="mt-3 cursor-pointer bg-[#DBF4A7] hover:bg-[#d7ddc9] text-[#122C34] px-4 py-2 rounded"
              >
                Edit Course
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerCourses;
