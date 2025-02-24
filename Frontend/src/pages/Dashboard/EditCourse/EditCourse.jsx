import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCourse = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    courseName: "",
    category: "",
    description: "",
    price: "",
    duration: "",
    difficulty: "",
    data: [],
  });
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/course/${id}`,
            {
                Authorization : localStorage.getItem("token")
            }
        );
        setCourseData(response.data.course);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...courseData.data];
    updatedSections[index][field] = value;
    setCourseData({ ...courseData, data: updatedSections });
  };

  const addSection = () => {
    setCourseData({ ...courseData, data: [...courseData.data, { title: "", passage: "" }] });
  };

  const removeSection = (index) => {
    const updatedSections = courseData.data.filter((_, i) => i !== index);
    setCourseData({ ...courseData, data: updatedSections });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/course/editCourse`, {
        courseId: id,
        ...courseData,
        Authorization : localStorage.getItem("token")
      });
      alert("Course updated successfully!");
      navigate("/dashboard/ownCourses");
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Error updating course.");
    }
  };

  return (
    <div className="bg-[#F9F9ED] p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[#7D84B2] mb-4">Edit Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="courseName"
          placeholder="Course Name"
          value={courseData.courseName}
          onChange={handleChange}
          className="w-full p-2 border rounded text-[#7D84B2]"
          required
        />
        <select
          name="category"
          value={courseData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded text-[#7D84B2]"
        >
          {["Programming", "Literature", "AI", "Business", "Architecture"].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <textarea
          name="description"
          placeholder="Description"
          value={courseData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded text-[#7D84B2]"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price INR"
          value={courseData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded text-[#7D84B2]"
          required
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g., 10 hours)"
          value={courseData.duration}
          onChange={handleChange}
          className="w-full p-2 border rounded text-[#7D84B2]"
          required
        />
        <select
          name="difficulty"
          value={courseData.difficulty}
          onChange={handleChange}
          className="w-full p-2 border rounded text-[#7D84B2]"
        >
          {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>

        <h3 className="text-lg font-semibold text-[#7D84B2]">Sections</h3>
        {courseData.data.map((section, index) => (
          <div key={index} className="p-4 bg-[#D9DBF1] rounded">
            <input
              type="text"
              placeholder="Section Title"
              value={section.title}
              onChange={(e) => handleSectionChange(index, "title", e.target.value)}
              className="w-full p-2 my-2 border rounded text-[#7D84B2]"
              required
            />
            <textarea
              placeholder="Content"
              value={section.passage}
              onChange={(e) => handleSectionChange(index, "passage", e.target.value)}
              className="w-full p-2 border rounded text-[#7D84B2]"
              required
            />
            <button
              type="button"
              onClick={() => removeSection(index)}
              className="text-[#7D84B2] cursor-pointer hover:bg-[#d4dac9] border-2 rounded bg-[#DBF4A7] px-3 py-1"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSection}
          className="bg-[#8E9DCC] hover:bg-[#9dabd2] cursor-pointer text-white p-2 rounded"
        >
          Add Section
        </button>
        <button
          type="submit"
          className="bg-[#DBF4A7] cursor-pointer hover:bg-[#d7ddc9] text-[#122C34] p-2 rounded w-full"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

export default EditCourse;
