import "./style.scss";
import { Collapse, Spin } from "antd";
import { CheckOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CourseContext } from "../../../Store/Contexts/CourseContext";
import { Video } from "../../../Types/Model/video";

const { Panel } = Collapse;

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { detailCourse, data } = useContext(CourseContext);
  useEffect(() => {
    if (id) {
      detailCourse(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const [lessons, setLessons] = useState<
    { chapter: string; videos: Video[] }[]
  >([]);
  useMemo(() => {
    if (data.course?.videos) {
      const newArray = data.course.videos.reduce(
        (
          newArr: { chapter: string; videos: Video[] }[],
          lesson,
          index,
          arr
        ) => {
          const arrSort = arr.filter((item) => {
            return item.chapter === lesson.chapter;
          });
          newArr.push({
            chapter: lesson.chapter,
            videos: arrSort.sort((a, b) => Number(a.lesson) - Number(b.lesson)),
          });
          return newArr;
        },
        []
      );
      const uniqueArray = newArray
        .filter((item, index) => {
          return (
            index ===
            newArray.findIndex((obj) => {
              return JSON.stringify(obj) === JSON.stringify(item);
            })
          );
        })
        .sort((a, b) => Number(a.chapter) - Number(b.chapter));
      setLessons([...uniqueArray]);
    }
  }, [data.course]);
  const formatTime = (timer: number) => {
    const getSeconds = `0${Math.floor(timer % 60)}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${Number(minutes) % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };
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
                  <CheckOutlined key={item} style={{ color: "#f05123" }} />
                  {item}
                </p>
              );
            })}
          </div>
        </div>
        <div className="detailLeftContent">
          <h3>Nội dung khóa học</h3>
          {lessons.length === 0 && <p>Chưa cập nhật video</p>}
          <Collapse>
            {lessons.map((lesson, index) => {
              return (
                <Panel key={lesson.chapter} header={`Chương ${index + 1}`}>
                  {lesson.videos.map((video) => {
                    return (
                      <div className="itemVideoCourse">
                        <span style={{ flex: "4" }}>
                          <PlayCircleOutlined style={{ color: "#f9b9a7" }} />
                          Bài {video.lesson}:{video.title}
                        </span>
                        <span style={{ flex: "2", textAlign: "right" }}>
                          {formatTime(Number(video.duration))}
                        </span>
                      </div>
                    );
                  })}
                </Panel>
              );
            })}
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
          <div
            className="detailRightActionBtn"
            onClick={() => navigate(`/learning/${data.course?.id}`)}
          >
            Bắt đầu học
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Spin />
  );
};

export default Detail;
