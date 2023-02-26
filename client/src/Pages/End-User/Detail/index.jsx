import "./style.scss";
import { Collapse } from "antd";
import { CheckOutlined, PlayCircleOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const Detail = () => {
  return (
    <div className="detail">
      <div className="detailLeft">
        <div className="detailLeftTitle">Kiến Thức Nhập Môn IT</div>
        <div className="detailLeftDescription">Để có cái nhìn tổng quan về ngành IT - Lập trình web các bạn nên xem các videos tại khóa này trước nhé.</div>
        <div className="detailLeftBenefit">
          <h3>Bạn sẽ học được gì?</h3>
          <div className="benefitDetail">
            <p k>
              <CheckOutlined style={{ color: "#f05123" }} /> item
            </p>
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
            backgroundImage: `url(https://files.fullstack.edu.vn/f8-prod/courses/7.png)`,
          }}
        ></div>
        <div className="detailRightAction">
          <div className="detailRightActionBtn">Thêm vào yêu thích</div>

          <div className="detailRightActionBtn">Mua khóa học</div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
