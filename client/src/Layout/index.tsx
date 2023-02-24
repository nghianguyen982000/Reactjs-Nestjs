import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Components/Header";
import DetailCourse from "../Pages/DetailCourse";
import Home from "../Pages/End-User/Home";
import "./style.scss";

const Layout = () => {
  return (
    <>
      <Header></Header>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/detail" element={<DetailCourse />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default Layout;
