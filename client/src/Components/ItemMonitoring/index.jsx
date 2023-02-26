import "./style.scss";
import imgWork from "../../Assets/img/Online games addiction Customizable Cartoon Illustrations _ Bro Style.png";

const ItemMonitoring = () => {
  return (
    <div className="itemMonitoring">
      <div className="itemMonitoringLeft">
        <div className="itemMonitoringTitle">
          Chuc ban hoc tap va lam viec hieu qua
        </div>
      </div>
      <div className="itemMonitoringRight">
        <img src={imgWork} alt="" />
      </div>
    </div>
  );
};
export default ItemMonitoring;
