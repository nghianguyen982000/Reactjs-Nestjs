import React, { useContext } from "react";
import { Button, Form, Input, Upload, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { CourseContext } from "../../../Store/Contexts/CourseContext";

const { TextArea } = Input;

type submitCourse = {
  title: string;
  description: string;
  file: UploadFile;
  benifit: string;
  field: string;
};

const CUCourse = () => {
  const [formModal] = Form.useForm();
  const { createCourse } = useContext(CourseContext);
  const onFinish = async (values: submitCourse) => {
    const formData = new FormData();
    console.log(values);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("file", values.file);
    formData.append("benifit", values.benifit);
    formData.append("field", values.field);
    console.log(formData);
    const resp = await createCourse(formData);
    if (resp) {
      console.log(resp);
    }
  };
  return (
    <div className="cuCourse">
      <Form
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        form={formModal}
      >
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhậ tiêu đề!" }]}
        >
          <Input size="large" placeholder="Tiêu đề" />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
        >
          <Input size="large" placeholder="Mô tả" />
        </Form.Item>

        <Form.Item
          label="Lĩnh vực"
          name="field"
          rules={[{ required: true, message: "Vui lòng nhập lĩnh vực!" }]}
        >
          <Input size="large" placeholder="Lĩnh vực" />
        </Form.Item>
        <Form.Item
          label="Lợi ích"
          name="benefit"
          rules={[{ required: true, message: "Vui lòng nhập lợi ích!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Video" name="file">
          <Upload beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
        {/* <Form.Item
          label="Url hình ảnh"
          name="image"
          rules={[{ required: true, message: "Chưa có url!" }]}
        >
          <Input disabled size="large" placeholder="Url hình ảnh" />
        </Form.Item> */}
        <Form.Item
          wrapperCol={{
            offset: 3,
            span: 20,
          }}
        >
          {/* {avatar && <img src={avatar.preview} alt="" width="300px" />} */}
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 3,
            span: 20,
          }}
        >
          <Button type="dashed" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CUCourse;
