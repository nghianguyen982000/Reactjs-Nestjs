import { Popconfirm, Space, Button, Select, Input, Table } from "antd";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CourseContext } from "../../../Store/Contexts/CourseContext";

const { Option } = Select;
const { Search } = Input;

const CourseAdmin = () => {
  const navigate = useNavigate();
  const { listCourse, data } = useContext(CourseContext);
  useEffect(() => {
    const fetchList = async () => {
      await listCourse();
    };
    fetchList();
  }, [listCourse]);
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
      width: "150px",
    },
    {
      title: "Thao tác",
      dataIndex: "",
      key: "4",
      render: () => (
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
      <Table
        columns={columns}
        dataSource={data.course}
        rowKey={(record) => record.id}
        style={{ paddingTop: "10px" }}
        scroll={{
          y: 400,
        }}
      />
    </div>
  );
};

export default CourseAdmin;
