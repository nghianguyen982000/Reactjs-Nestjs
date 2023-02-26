import "./style.scss";
import { Collapse } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const Learning = () => {
  return (
    <div className="learing">
      <div className="learingLeft">
        <div className="videoFrameTest">
          <video
            className="learingLeftVideo"
            style={{
              backgroundImage: `url(https://files.fullstack.edu.vn/f8-prod/courses/7.png)`,
            }}
            src="https://www.youtube.com/watch?v=Wa5B22KAkEk"
            controls
          ></video>
        </div>
        <div className="learingLeftTitle">title</div>
        <div className="learingLeftComment"></div>
      </div>
      <div className="learingRight">
        <h2>title</h2>
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
    </div>
  );
};

export default Learning;
