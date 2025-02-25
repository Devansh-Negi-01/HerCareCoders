import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../reduxStore/authSlice2";
import { jwtDecode } from "jwt-decode";
import NewsLetter from "../../components/Newsletter";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        dispatch(
          login({
            email: decoded.email,
            id: decoded.id,
            token: token,
            role: decoded.role,
          })
        );
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, [dispatch]);

  return (
    <div className="font-sans bg-[#F9F9ED] text-gray-900">
      <section className="text-center py-16 px-4 bg-[#D9DBF1]">
        <h1 className="text-4xl font-bold text-[#7D84B2]">
          Start your learning now...
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto mt-4">
          It’s never too late to learn something new. Unlock your potential at
          any age – all you need is the spark of motivation to begin. Embrace
          the journey of discovery and growth!
        </p>
        <button
          onClick={() => navigate("/allCourses")}
          className="cursor-pointer mt-6 px-6 py-3 bg-[#7D84B2] text-white rounded hover:bg-[#8E9DCC]"
        >
          Start Now
        </button>
      </section>

      <section className="w-full flex justify-center">
        <img
          src="/homepage_images/hero-image.png"
          alt="Inspiring Learning"
          className="w-4/5 object-cover"
        />
      </section>

      <section className="py-12 px-8 flex flex-col md:flex-row items-center md:items-stretch gap-8 bg-[#F9F9ED]">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4 text-[#7D84B2]">
            Explore our courses...
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Programming",
                desc: "Courses on software development, web technologies, data structures, and algorithms.",
                link: "/allCourses",
              },
              {
                title: "Literature",
                desc: "Courses on classic and modern literature, creative writing, poetry, and storytelling.",
                link: "/allCourses",
              },
              {
                title: "Artificial Intelligence",
                desc: "Courses on machine learning, deep learning, neural networks, and AI applications.",
                link: "/allCourses",
              },
              {
                title: "Business",
                desc: "Courses on entrepreneurship, management, finance, marketing, and business strategy.",
                link: "/allCourses",
              },
              {
                title: "Architecture",
                desc: "Courses on building design, urban planning, interior design, and sustainable architecture.",
                link: "/allCourses",
              },
            ].map((theme, index) => (
              <a
                key={index}
                href={theme.link}
                className="block p-4 border rounded-lg shadow-sm bg-white hover:bg-gray-100 transition-transform transform hover:scale-105"
              >
                <h3 className="font-bold text-lg">{theme.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{theme.desc}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:block w-1/3">
          <img
            src="/homepage_images/themes.png"
            alt="Themes"
            className="h-full w-full object-cover rounded-lg shadow-md"
          />
        </div>
      </section>

      <section className="py-12 px-8 bg-[#D9DBF1]">
        <h2 className="text-3xl font-semibold text-center text-[#7D84B2] tracking-wide">
          Choose Your Learning Path
        </h2>
        <div className="flex md:grid md:grid-cols-3 gap-6 mt-6 md:overflow-visible overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth">
          {[
            {
              title: "Basic",
              img: "/homepage_images/basic.jpg",
              desc: "Begin your learning journey with fundamental concepts.",
              link: "/allCourses",
            },
            {
              title: "Intermediate",
              img: "/homepage_images/intermediate.jpg",
              desc: "Build on your basics and take your skills to the next level.",
              link: "/allCourses",
            },
            {
              title: "Advanced",
              img: "/homepage_images/advanced.jpg",
              desc: "Master your craft and gain expertise in your field.",
              link: "/allCourses",
            },
          ].map((course, index) => (
            <a
              key={index}
              href={course.link}
              className="p-4 border rounded-lg shadow-sm bg-white w-[80vw] md:w-auto flex-shrink-0 md:flex-shrink snap-center hover:bg-gray-100 transition-transform transform hover:scale-105"
            >
              <img
                src={course.img}
                alt={course.title}
                className="h-74 w-full object-cover rounded"
              />
              <h3 className="mt-4 font-bold text-lg text-gray-800">
                {course.title}
              </h3>
              <p className="text-gray-600 text-sm">{course.desc}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="py-12 px-8 bg-[#F9F9ED]">
        <h2 className="text-3xl font-semibold text-center text-[#7D84B2] tracking-wide">
          Reviews from fellow learners
        </h2>
        <div className="flex md:grid md:grid-cols-3 gap-6 mt-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {[
            {
              text: "This online course selling platform is fantastic! It offers a wide range of high-quality courses, taught by industry experts. The user-friendly interface makes it easy to find and purchase courses. Highly recommended!",
              name: "John Doe",
              img: "/homepage_images/johnDoe.jpg",
            },
            {
              text: "This online course platform is a game-changer! It offers a diverse selection of courses led by top-notch instructors. The intuitive interface ensures a seamless browsing and purchasing experience. Highly recommended for learners at all levels!",
              name: "Jane Smith",
              img: "/homepage_images/janeSmith.jpg",
            },
            {
              text: "This online course selling platform stands out for its extensive selection of courses taught by industry leaders. Exceptional customer support and a wealth of resources make learning engaging and effective!",
              name: "Michael Brown",
              img: "/homepage_images/michaelBrown.jpg",
            },
          ].map((review, index) => (
            <div
              key={index}
              className="relative p-6 border rounded-lg shadow-md flex flex-col md:flex-row items-start bg-white w-[80vw] md:w-auto flex-shrink-0 snap-center"
            >
              <div className="md:absolute md:top-4 md:right-4 flex-shrink-0">
                <img
                  src={review.img}
                  alt={review.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover object-top shadow-lg border-2 border-white"
                />
              </div>

              <div className="flex-1 mt-4 md:mt-0 md:pr-28">
                <p className="text-gray-700">"{review.text}"</p>
                <div className="mt-4 text-sm text-gray-500">
                  {review.name} | Student
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <NewsLetter />
    </div>
  );
};

export default Home;
