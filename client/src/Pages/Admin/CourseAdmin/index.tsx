import { Space, Input, Table, Button } from "antd";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CourseContext } from "../../../Store/Contexts/CourseContext";
import { Course } from "../../../Types/Model/course";

const { Search } = Input;

const CourseAdmin = () => {
  const navigate = useNavigate();

  const { listCourse, data, removedCourse, searchCourses } =
    useContext(CourseContext);
  useEffect(() => {
    listCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: string) => {
    const resp = await removedCourse(id);
    if (resp) {
      console.log(resp);
    }
  };
  const columns = [
    { title: "Tiêu đề", dataIndex: "title", key: "1", ellipsis: true },
    {
      title: "Thao tác",
      dataIndex: "",
      key: "4",
      render: (record: Course) => (
        <Space size="middle">
          <Button
            type="dashed"
            onClick={() => navigate(`/admin/course/update?id=${record.id}`)}
          >
            Xem và cập nhật
          </Button>
          <Button
            type="dashed"
            onClick={() => navigate(`/admin/video/${record.id}`)}
          >
            Bài giảng
          </Button>
          <Button type="dashed" onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
  const onSearch = (value: string) => {
    if (value === "") {
      listCourse();
    } else {
      searchCourses(value);
    }
  };
  return (
    <div className="courseAd">
      <Space>
        <Search
          style={{
            width: 350,
          }}
          onSearch={onSearch}
          placeholder="Tìm kiếm khóa học"
          enterButton
        />
        <Button type="dashed" onClick={() => navigate("/admin/course/create")}>
          Tạo khóa học mới
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={data.courses}
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
