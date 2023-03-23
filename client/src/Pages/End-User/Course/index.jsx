import "./style.scss";
import ItemCourse from "../../../Components/ItemCourse";
import { useContext, useEffect } from "react";
import { CourseContext } from "../../../Store/Contexts/CourseContext";

const Course = () => {
  const { listCourse, data } = useContext(CourseContext);
  useEffect(() => {
    listCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="course">
      <div className="allCourse">
        {data.courses.map((course) => {
          return <ItemCourse key={course.id} course={course} />;
        })}
      </div>
      <div style={{ height: "300px" }}></div>
    </div>
  );
};

export default Course;
