import "./style.scss";
import { Radio, Space } from "antd";
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
      <div className="catagoryCourse">
        <Radio.Group defaultValue={0} buttonStyle="solid" size="large">
          <Space wrap size="middle">
            <Radio.Button style={{ borderRadius: "10px" }} value={0} key={0}>
              Tất cả
            </Radio.Button>
            <Radio.Button style={{ borderRadius: "10px" }}>item</Radio.Button>
          </Space>
        </Radio.Group>
      </div>
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
