import "./style.scss";
import { Radio, Space } from "antd";
import ItemCourse from "../../../Components/ItemCourse";

const Course = () => {
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
        <ItemCourse />
        <ItemCourse />
        <ItemCourse />
        <ItemCourse />
        <ItemCourse />
      </div>
      <div style={{ height: "300px" }}></div>
    </div>
  );
};

export default Course;
