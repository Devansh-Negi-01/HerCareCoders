import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AddCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [category, setCategory] = useState("Programming");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState(""); 
  const [difficulty, setDifficulty] = useState("Beginner"); 
  const [sections, setSections] = useState([{ title: "", passage: "" }]);
  const navigate = useNavigate();

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  const addSection = () => {
    setSections([...sections, { title: "", passage: "" }]);
  };

  const removeSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const courseId = decodedToken.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/course/createCourse`,
        {
          Authorization: token,
          courseName,
          category,
          description,
          price,
          duration, 
          difficulty,
          data: sections,
        }
      );
      alert(response.data.msg);
      navigate("/dashboard/ownCourses");
    } catch (error) {
      console.log(error);
      alert("Error creating course");
    }
  };

  return (
    <div className="bg-[#F9F9ED] p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[#7D84B2] mb-4">Add Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="w-full p-2 border rounded text-[#7D84B2]"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded text-[#7D84B2]"
        >
          {["Programming", "Literature", "AI", "Business", "Architecture"].map(
            (cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            )
          )}
        </select>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded text-[#7D84B2]"
          required
        />
        <input
          type="number"
          placeholder="Price INR"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded text-[#7D84B2]"
          required
        />
        <input
          type="text"
          placeholder="Duration (e.g., 10 hours, 6 weeks)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-2 border rounded text-[#7D84B2]"
          required
        />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full p-2 border rounded text-[#7D84B2]"
        >
          {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>

        <h3 className="text-lg font-semibold text-[#7D84B2]">Sections</h3>
        {sections.map((section, index) => (
          <div
            key={index}
            className="p-4 bg-[#D9DBF1] rounded items-center space-x-2"
          >
            <div className="flex-1">
              <input
                type="text"
                placeholder="Section Title"
                value={section.title}
                onChange={(e) =>
                  handleSectionChange(index, "title", e.target.value)
                }
                className="w-full p-2 my-2 border rounded text-[#7D84B2]"
                required
              />
            </div>
            <div className="flex-1">
              <textarea
                placeholder="Content"
                value={section.passage}
                onChange={(e) =>
                  handleSectionChange(index, "passage", e.target.value)
                }
                className="w-full p-2 border rounded text-[#7D84B2]"
                required
              />
            </div>
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
