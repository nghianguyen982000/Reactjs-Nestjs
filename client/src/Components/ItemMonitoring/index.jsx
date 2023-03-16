import "./style.scss";
import imgWork from "../../Assets/img/Online games addiction Customizable Cartoon Illustrations _ Bro Style.png";

const ItemMonitoring = () => {
  return (
    <div className="itemMonitoring">
      <div className="itemMonitoringLeft">
        <div className="itemMonitoringTitle">
        Chúc bạn học tập và làm việc hiệu quả
        </div>
      </div>
      <div className="itemMonitoringRight">
        <img src={imgWork} alt="" />
      </div>
    </div>
  );
};
export default ItemMonitoring;
