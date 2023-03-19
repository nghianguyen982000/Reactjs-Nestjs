import "./style.scss";
import { Collapse, Spin } from "antd";
import { CheckOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CourseContext } from "../../../Store/Contexts/CourseContext";

const { Panel } = Collapse;

const Detail = () => {
  const { id } = useParams();
  const { detailCourse, data } = useContext(CourseContext);
  useEffect(() => {
    if (id) {
      detailCourse(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return data.course ? (
    <div className="detail">
      <div className="detailLeft">
        <div className="detailLeftTitle">{data.course.title}</div>
        <div className="detailLeftDescription">{data.course.description}</div>
        <div className="detailLeftBenefit">
          <h3>Bạn sẽ học được gì?</h3>
          <div className="benefitDetail">
            {data.course.benefit?.map((item) => {
              return (
                <p>
                  <CheckOutlined style={{ color: "#f05123" }} /> {item}
                </p>
              );
            })}
          </div>
        </div>
        <div className="detailLeftContent">
          <h3>Nội dung khóa học</h3>
          <Collapse>
            <Panel header={`Chương 1`}>
              <div className="itemVideoCourse">
                <span style={{ flex: "4" }}>
                  <PlayCircleOutlined style={{ color: "#f9b9a7" }} />
                  Bài 1:12
                </span>
                <span style={{ flex: "2", textAlign: "right" }}>00:00</span>
              </div>
            </Panel>
          </Collapse>
        </div>
        <div style={{ height: "200px" }}></div>
      </div>
      <div className="detailRight">
        <div
          className="detailRightImg"
          style={{
            backgroundImage: `url(${data.course.image})`,
          }}
        ></div>
        <div className="detailRightAction">
          <div className="detailRightActionBtn">Thêm vào yêu thích</div>

          <div className="detailRightActionBtn">Mua khóa học</div>
        </div>
      </div>
    </div>
  ) : (
    <Spin />
  );
};

export default Detail;
