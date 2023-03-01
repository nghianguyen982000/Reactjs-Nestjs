import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

type submitCourse = {
  title: string;
  description: string;
  image: string;
  benifit: string;
  field: string;
};

const CUCourse = () => {
  const [formModal] = Form.useForm();

  const onFinish = async (values: submitCourse) => {
    console.log(values);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (
        e.target.files[0] &&
        e.target.files[0].size <= 3250585 &&
        e.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)
      ) {
        const file = e.target.files[0];
        console.log(file);
      }
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
        <Form.Item label="Tải lên">
          <Input
            type="file"
            name="file"
            id="file"
            onChange={(e) => handleFileInputChange(e)}
            hidden
          />
          <label
            htmlFor="file"
            style={{
              border: "1px solid #dddddd",
              padding: "5px",
              cursor: "pointer",
            }}
          >
            <UploadOutlined />
            Upload Image
          </label>
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
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CUCourse;
