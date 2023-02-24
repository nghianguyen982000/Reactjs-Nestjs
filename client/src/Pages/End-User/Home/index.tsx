import Slider from "react-slick";
import ItemCourse from "../../../Components/ItemCourse";
import ItemMonitoring from "../../../Components/ItemMonitoring";
import "./style.scss";

const Home = () => {
  const settingsCourse = {
    infinite: false,
    speed: 500,
    slidesToScroll: 4,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          infinite: false,
          speed: 500,
          slidesToScroll: 3,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          infinite: false,
          speed: 500,
          slidesToScroll: 2,
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="home">
      <div className="homeMonitoring">
        <div className="homeMonitoringContent">
          <ItemMonitoring />
        </div>
      </div>
      <div className="homeCourse">
        <div className="homeTitle">Các khóa học</div>
        <div className="homeCourseQuote">
          Nếu bạn ngủ quên bây giờ, bạn sẽ mơ. Nếu bạn học ngay bây giờ, bạn sẽ
          sống với ước mơ của mình!
        </div>
        {/* <div className="homeCourseContent">
          <Slider {...settingsCourse}>
            <ItemCourse />
            <ItemCourse />
            <ItemCourse />
            <ItemCourse />
            <ItemCourse />
            <ItemCourse />
          </Slider>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
