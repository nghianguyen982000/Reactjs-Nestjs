import ItemMonitoring from "../../../Components/ItemMonitoring";
import "./style.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="homeMonitoring">
        <div className="homeMonitoringContent">
          <ItemMonitoring />
        </div>
      </div>
      <div className="homeCourse">
        <div className="homeCourseQuote">
          Nếu bạn ngủ quên bây giờ, bạn sẽ mơ. Nếu bạn học ngay bây giờ, bạn sẽ
          sống với ước mơ của mình!
        </div>
      </div>
    </div>
  );
};

export default Home;
