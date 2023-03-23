import "./style.scss";
import { Collapse, Spin } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { CourseContext } from "../../../Store/Contexts/CourseContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Video } from "../../../Types/Model/video";

const { Panel } = Collapse;

const Learning = () => {
  const { id } = useParams();
  const { detailCourse, data } = useContext(CourseContext);
  const [video, setVideo] = useState<{
    id: string;
    url: string;
    title: string;
  }>({
    id: "",
    url: "",
    title: "",
  });
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
    <div className="learing">
      <div className="learingLeft">
        <div className="videoFrameTest">
          <video
            className="learingLeftVideo"
            style={{
              backgroundImage: `url(https://files.fullstack.edu.vn/f8-prod/courses/7.png)`,
            }}
            src={video.url}
            controls
          ></video>
        </div>
        <div className="learingLeftTitle">{video.title}</div>
      </div>
      <div className="learingRight">
        <h2>{data.course.title}</h2>
        {lessons.length === 0 && <p>Chưa cập nhật video</p>}
        <Collapse>
          {lessons.map((lesson, index) => {
            return (
              <Panel key={lesson.chapter} header={`Chương ${index + 1}`}>
                {lesson.videos.map((video) => {
                  return (
                    <div
                      className="itemVideoLearing"
                      onClick={() => {
                        setVideo({
                          ...video,
                          url: video.url,
                          title: video.title,
                          id: video.id,
                        });
                      }}
                    >
                      <div>
                        <PlayCircleOutlined style={{ color: "#f9b9a7" }} />
                        Bài {video.lesson}:{video.title}
                      </div>
                      <div style={{ paddingLeft: "25px", textAlign: "right" }}>
                        {formatTime(Number(video.duration))}
                      </div>
                    </div>
                  );
                })}
              </Panel>
            );
          })}
        </Collapse>
      </div>
    </div>
  ) : (
    <Spin />
  );
};

export default Learning;
