import { Popconfirm, Space, Button, Select, Input } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { Search } = Input;

const CourseAdmin = () => {
  const navigate = useNavigate();
  const columns = [
    {
      title: "STT",
      dataIndex: "",
      key: "0",
      width: "100px",
    },
    { title: "Tiêu đề", dataIndex: "title", key: "1", ellipsis: true },
    { title: "Điểm", dataIndex: "point", key: "2", width: "100px" },
    {
      title: "Số học viên",
      dataIndex: "",
      key: "3",
      render: (text, record) => <div>{record.course.length}</div>,
      width: "150px",
    },
    {
      title: "Thao tác",
      dataIndex: "",
      key: "4",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => navigate("/admin/cuCourse")}>
            Xem và cập nhật
          </Button>
          <Button type="primary">Bài giảng</Button>
          <Popconfirm title="Khóa học này sẽ bị xóa vĩnh viễn">
            <Button type="primary">Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="courseAd">
      <Space>
        <Search
          style={{
            width: 350,
          }}
          placeholder="Tìm kiếm khóa học"
          enterButton
        />
        <Select
          style={{
            width: 120,
          }}
          size="middle"
          defaultValue="All"
          placeholder="Content"
        >
          <Option value="All">Tất cả</Option>
          <Option>item</Option>
        </Select>
        <Button type="primary">Tạo khóa học mới</Button>
      </Space>
    </div>
  );
};

export default CourseAdmin;
