import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Course from "../Pages/End-User/Course";
import Detail from "../Pages/End-User/Detail";
import Home from "../Pages/End-User/Home";
import Learning from "../Pages/End-User/Learning";
import { AuthContext } from "../Store/Contexts/AuthContext";

const Layout = () => {
  const { checkLogin, auth } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    checkLogin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
    }
  }, [auth.isAuthenticated, navigate]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/course" element={<Course />} />
        <Route path="/course/:id" element={<Detail />}></Route>
        <Route path="/learning/:id" element={<Learning />} />
      </Routes>
    </>
  );
};

export default Layout;
