import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import App from "../App";
import Home from "../pages/Home/Home";
import AdminLogin from '../pages/AdminLogin/AdminLogin';
import Login from "../pages/Login/login";
import SignUp from "../pages/Signup/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserInfo from "../pages/Dashboard/userInfo/UserInfo";
import About from "../components/About";
import AddCourse from "../pages/Dashboard/AddCourse/AddCourse";
import UpgradeTeacher from "../pages/Dashboard/upgradeTeacher/UpgradeTeacher";
import OwnerCourses from "../pages/Dashboard/OwnerCourses/OwnerCourses";
import EditCourse from "../pages/Dashboard/EditCourse/EditCourse";
import TeacherInfo from "../pages/Dashboard/TeacherInfo/TeacherInfo";
import MyLearning from "../pages/Dashboard/MyLearning/MyLearning";
import Certificates from "../pages/Dashboard/Certificates/Certificates";
import AllCourses from "../pages/AllCourses/AllCourses";
import CoursePage from "../pages/CoursePage/CoursePage";
// Protected Route Component
const ProtectedRoute = ({ element }) => {
  let isAuthenticated = false;
  if(localStorage.getItem('token')){
    isAuthenticated = true;
  }

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/about", element: <About /> },
      {path : "/allCourses", element: <AllCourses />},
      {path : "/course/:courseId",element:<CoursePage/>},
      {
        path: "/dashboard",
        element: <ProtectedRoute element={<Dashboard />} />,
        children: [
          { path: "/dashboard", element: <div><span>&lt;</span>-- Choose from here</div> },
          { path: "/dashboard/userInfo", element: <UserInfo /> },
          { path: "/dashboard/shipments", element: <div>All Shipments</div> },
          { path: "/dashboard/visitors", element: <div>Visitors</div> },
          {path : "/dashboard/addCourse", element : <AddCourse/>},
          { path : '/dashboard/upgrade',element:<UpgradeTeacher/>},
          {path : '/dashboard/ownCourses',element: <OwnerCourses/>},
          { path: "/dashboard/editCourse/:id", element: <EditCourse /> },
          {path : "/dashboard/teacherInfo",element: <TeacherInfo/>},
          {path : "/dashboard/myLearning",element: <MyLearning/>},
          {path : "/dashboard/certificates",element:<Certificates/>}
        ]
      },
    ]
  },
  { path: "/adminLogin", element: <AdminLogin /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> }
]);

export default router;
