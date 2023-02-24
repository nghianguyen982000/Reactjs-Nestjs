import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const ItemCourse = () => {
  const navigate = useNavigate();
  return (
    <div className={"itemCourseHome"}>
      <div className="itemCoursePicture" style={{ backgroundImage: `url()` }}>
        <div
          className="itemCoursePictureAc"
          onClick={() => navigate(`/learning`)}
        >
          Tiếp tục học
        </div>
        <div
          className="itemCoursePictureAc"
          onClick={() => navigate(`/detail`)}
        >
          Xem khóa học
        </div>
      </div>
      <div className="itemCourseTitle">title</div>
    </div>
  );
};

export default ItemCourse;
