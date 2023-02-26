import {  useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import "./style.scss";
import { Button, Form, Input, InputNumber, Upload } from "antd";

const CUVideo = () => {
  const { id } = useParams();
  const [formModal] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
  };
  return (
    <div className="AdVideo">
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 18 }}
        form={formModal}
        name="formModal"
        onFinish={onFinish}
      >
        <Form.Item
          name="lecture"
          label="Chương"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập chương!",
            },
          ]}
          hasFeedback
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="lesson"
          label="Bài"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập bài!",
            },
          ]}
          hasFeedback
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="title"
          label="Tiêu đề"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tiêu đề!",
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item label="Video" name="video">
          <Upload beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 5,
            span: 18,
          }}
        >
          <div>
            <video
              className="frameVideo"
              controls
              style={{ width: "100%" }}
              src="https://youtu.be/qAxwwGG0p3c"
            ></video>
            <Button className="btnCancel">X</Button>
          </div>
        </Form.Item>
        <Form.Item name="url" label="url">
          <Input disabled />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 5,
            span: 18,
          }}
        >
          <Button type="primary" htmlType="submit">
            Nộp
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CUVideo;
