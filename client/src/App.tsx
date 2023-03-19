import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Admin from "./Pages/Admin";
import AuthContextProvider from "./Store/Contexts/AuthContext";
import CourseContextProvider from "./Store/Contexts/CourseContext";
import VideoContextProvider from "./Store/Contexts/VideoContext";

function App() {
  return (
    <AuthContextProvider>
      <CourseContextProvider>
        <VideoContextProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/*" element={<Layout />}></Route>\
              <Route path="/admin/*" element={<Admin />}></Route>
            </Routes>
          </Router>
        </VideoContextProvider>
      </CourseContextProvider>
    </AuthContextProvider>
  );
}

export default App;
