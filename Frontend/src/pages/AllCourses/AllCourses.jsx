import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [likedCourses, setLikedCourses] = useState(new Set());

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/course/allCourses`)
      .then((res) => {
        setCourses(res.data.courses);
        setFilteredCourses(res.data.courses);
      })
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);

    let sortedCourses = [...courses];

    if (value === "priceAsc") {
      sortedCourses.sort((a, b) => a.price - b.price);
    } else if (value === "priceDesc") {
      sortedCourses.sort((a, b) => b.price - a.price);
    } else if (value === "difficulty") {
      sortedCourses.sort((a, b) => a.difficulty.localeCompare(b.difficulty));
    } else if (value === "category") {
      sortedCourses.sort((a, b) => a.category.localeCompare(b.category));
    }

    setFilteredCourses(sortedCourses);
  };

  const handleCourseClick = (id) => {
    navigate(`/course/${id}`);
  };

  const toggleLike = async (courseId) => {
    if (!token) {
      alert("Please log in to like courses.");
      return;
    }
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/toggleLike`,
        { courseId,Authorization:token }
      );
  
      if (response.data.success) {
        setLikedCourses((prevLikes) => {
          const newLikes = new Set(prevLikes);
          if (newLikes.has(courseId)) {
            newLikes.delete(courseId);
          } else {
            newLikes.add(courseId);
          }
          return newLikes;
        });
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };
  

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">All Courses</h1>

      {/* Sorting Options */}
      <div className="flex justify-end mb-4">
        <select
          onChange={handleSortChange}
          value={sortBy}
          className="border px-4 py-2 rounded-md"
        >
          <option value="">Sort By</option>
          <option value="priceAsc">Price (Low to High)</option>
          <option value="priceDesc">Price (High to Low)</option>
          <option value="difficulty">Difficulty</option>
          <option value="category">Category</option>
        </select>
      </div>

      {/* Course List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course._id}
            className="border p-4 rounded-lg shadow-md cursor-pointer transition duration-300 hover:shadow-lg"
            onClick={() => handleCourseClick(course._id)}
          >
            <h2 className="text-xl font-semibold">{course.courseName}</h2>
            <p className="text-gray-600">{course.description}</p>
            <p className="text-sm font-medium text-blue-600">Category: {course.category}</p>
            <p className="text-sm text-gray-700">Difficulty: {course.difficulty}</p>
            <p className="text-lg font-bold text-green-600">${course.price}</p>

            {/* Like Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents triggering course navigation
                toggleLike(course._id);
              }}
              className={`cursor-pointer mt-3 px-4 py-2 rounded-md ${
                likedCourses.has(course._id) ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
            >
              {likedCourses.has(course._id) ? "❤️ Liked" : "🤍 Like"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
