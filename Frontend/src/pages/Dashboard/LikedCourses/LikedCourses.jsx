import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LikedCourses = () => {
  const [likedCourses, setLikedCourses] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLikedCourses = async () => {
      if (!token) return;

      try {
        const decoded = jwtDecode(token);

        const likedCoursesResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/user/likedCourses`, 
           {
            Authorization:token
          }
        );

        const courseIds = likedCoursesResponse.data.likedCourses;

        if (!courseIds || courseIds.length === 0) {
          setLikedCourses([]);
          return;
        }

        const courseDetails = await Promise.all(
          courseIds.map(async (courseId) => {
            const courseResponse = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/user/getLikedCourse`,
              { courseId },
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            );
            return courseResponse.data.course;
          })
        );

        setLikedCourses(courseDetails);
        console.log("Liked courses fetched successfully:", courseDetails);
      } catch (error) {
        console.error("Error fetching liked courses:", error);
      }
    };

    fetchLikedCourses();
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Liked Courses ❤️</h1>

      {likedCourses.length === 0 ? (
        <p className="text-center text-gray-600">No liked courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {likedCourses.map((course) => (
            <div
              key={course._id}
              className="border p-4 rounded-lg shadow-md cursor-pointer transition duration-300 hover:shadow-lg"
              onClick={() => navigate(`/course/${course._id}`)}
            >
              <h2 className="text-xl font-semibold">{course.courseName}</h2>
              <p className="text-gray-600">{course.description}</p>
              <p className="text-sm font-medium text-blue-600">Category: {course.category}</p>
              <p className="text-sm text-gray-700">Difficulty: {course.difficulty}</p>
              <p className="text-lg font-bold text-green-600">${course.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedCourses;
