import { Space, Table, Button, notification } from "antd";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VideoContext } from "../../../Store/Contexts/VideoContext";
import { Video } from "../../../Types/Model/video";
import { CheckCircleOutlined } from "@ant-design/icons";

const VideoAdmin = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { listVideo, data, removeVideo } = useContext(VideoContext);
  useEffect(() => {
    if (courseId) {
      listVideo(courseId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const handleDelete = async (id: string) => {
    const resp = await removeVideo(id);
    if (resp) {
      notification.open({
        message: "Xoa thành công",
        icon: <CheckCircleOutlined style={{ color: "green" }} />,
      });
    }
  };
  const columns = [
    { title: "Tiêu đề", dataIndex: "title", key: "1", ellipsis: true },
    {
      title: "Thao tác",
      dataIndex: "",
      key: "4",
      render: (record: Video) => (
        <Space size="middle">
          <Button
            type="dashed"
            onClick={() => navigate(`edit/update?id=${record.id}`)}
          >
            Xem và cập nhật
          </Button>
          <Button type="dashed" onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="courseAd">
      <Space>
        <Button type="dashed" onClick={() => navigate("edit/create")}>
          Tạo video mới
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={data.videos}
        rowKey={(record) => record.id}
        style={{ paddingTop: "10px" }}
        scroll={{
          y: 400,
        }}
      />
    </div>
  );
};

export default VideoAdmin;
