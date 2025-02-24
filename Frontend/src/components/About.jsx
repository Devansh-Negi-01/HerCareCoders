import React from "react";

const About = () => {
  const teamMembers = [
    {
      role: "Project Manager",
      name: "Kirti Goel",
      rollNo: "2210991805",
      linkedin: "https://www.linkedin.com/in/kirti-goel-7342592b1/",
    },
    {
      role: "Frontend Developer",
      name: "Mitul Dwivedi",
      rollNo: "2210991927",
      linkedin: "https://www.linkedin.com/in/mitul-dwivedi-5058b8253/",
    },
    {
      role: "Backend Developer",
      name: "Mridul Gupta",
      rollNo: "2210991940",
      linkedin: "https://www.linkedin.com/in/mridulgupta34/",
    },
    {
      role: "Intern",
      name: "Devansh Negi",
      rollNo: "2410990123",
      linkedin: "", // No link yet
    },
  ];

  return (
    <div className="bg-[#F9F9ED] min-h-screen p-8">
      <h1 className="text-3xl font-bold text-[#2A4494] text-center mb-6">
        About Us
      </h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-8">
        We are a passionate team dedicated to creating innovative solutions.
        Our goal is to deliver high-quality projects that solve real-world
        problems efficiently.
      </p>

      <h2 className="text-2xl font-semibold text-[#224870] mb-4">
        Meet the Team
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="p-4 border rounded-lg bg-[#D9DBF1] shadow">
            <h3 className="text-xl font-semibold text-[#2A4494]">
              {member.linkedin ? (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-[#2A4494]"
                >
                  {member.name}
                </a>
              ) : (
                member.name
              )}
            </h3>
            <p className="text-gray-600">{member.role}</p>
            <p className="text-gray-500">Roll No: {member.rollNo}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-[#224870] mt-8 mb-4">
        Project Highlights
      </h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>🚀 Cutting-edge technology stack</li>
        <li>🔧 Scalable and efficient backend architecture</li>
        <li>🎨 Intuitive and responsive UI/UX</li>
        <li>🔒 Secure authentication and data handling</li>
        <li>📈 Optimized for performance and accessibility</li>
      </ul>
    </div>
  );
};

export default About;
