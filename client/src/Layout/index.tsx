import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Components/Header";
import Course from "../Pages/End-User/Course";
import Detail from "../Pages/End-User/Detail";
import Home from "../Pages/End-User/Home";
import Learning from "../Pages/End-User/Learning";

const Layout = () => {
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
