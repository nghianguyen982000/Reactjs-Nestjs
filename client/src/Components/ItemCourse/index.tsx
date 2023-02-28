import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { Course } from "../../Types/Model/course";

type Props = {
  course: Course;
};

const ItemCourse = ({ course }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="itemCourse">
      <div
        className="itemCoursePicture"
        style={{
          backgroundImage: `url(${course.image})`,
        }}
      >
        <div
          className="itemCoursePictureAc"
          onClick={() => navigate(`/course/1`)}
        >
          Xem khóa học
        </div>
      </div>
      <div className="itemCourseTitle">{course.title}</div>
    </div>
  );
};

export default ItemCourse;
