import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const ItemCourse = () => {
  const navigate = useNavigate();
  return (
    <div className="itemCourse">
      <div
        className="itemCoursePicture"
        style={{
          backgroundImage: `url(	https://files.fullstack.edu.vn/f8-prod/courses/7.png)`,
        }}
      >
        <div
          className="itemCoursePictureAc"
          onClick={() => navigate(`/course/1`)}
        >
          Xem khóa học
        </div>
      </div>
      <div className="itemCourseTitle">title</div>
    </div>
  );
};

export default ItemCourse;
