import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Modal, Upload, UploadFile } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CourseContext } from "../../../Store/Contexts/CourseContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const { TextArea } = Input;

const schemaCreateCourse = yup.object().shape({
  title: yup.string().required("Please fill in this field"),
  description: yup.string().required("Please fill in this field"),
  benefit: yup.string().required("Please fill in this field"),
  field: yup.string().required("Please fill in this field"),
});

interface CreateCourseData {
  title: string;
  description: string;
  benefit: string;
  field: string;
  file: File;
}
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const CUCourse = () => {
  const { status } = useParams();
  const [searchParams] = useSearchParams();
  const { createCourse, detailCourse, updateCourse } =
    useContext(CourseContext);
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateCourseData>({
    resolver: yupResolver(schemaCreateCourse),
  });
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  useEffect(() => {
    if ((searchParams.get("id"), status === "update")) {
      detailCourse(searchParams.get("id") as string).then((data) => {
        if (data) {
          reset({
            title: data.title,
            description: data.description,
            benefit: data.benefit.join("\n"),
            field: data.field,
          });
          setFileList([{ url: data.image, uid: "1", name: "image" }]);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, status]);
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange = (info: UploadChangeParam<UploadFile<File>>) => {
    setValue("file", info.fileList[0].originFileObj as File);
    setFileList(info.fileList);
  };
  const onSubmit = async (data: CreateCourseData) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("benefit", data.benefit);
    formData.append("field", data.field);
    if (status === "create") {
      formData.append("file", data.file);
      const resp = await createCourse(formData);
      if (resp) {
        setLoading(false);
        navigate("/admin/course");
      }
    }
    if (status === "update" && searchParams.get("id")) {
      if (data.file) {
        formData.append("file", data.file);
      }
      const resp = await updateCourse(
        searchParams.get("id") as string,
        formData
      );
      if (resp) {
        setLoading(false);
        navigate("/admin/course");
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
        onFinish={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Form.Item label="Tiêu đề">
              <Input {...field} size="large" placeholder="Tiêu đề" />
              <p className="text-red-600">{errors.title?.message}</p>
            </Form.Item>
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Form.Item label="Mô tả">
              <Input {...field} size="large" placeholder="Mô tả" />
              <p className="text-red-600">{errors.description?.message}</p>
            </Form.Item>
          )}
        />
        <Controller
          name="benefit"
          control={control}
          render={({ field }) => (
            <Form.Item label="Lợi ích">
              <TextArea
                rows={4}
                {...field}
                size="large"
                placeholder="Lợi ích"
              />
              <p className="text-red-600">{errors.benefit?.message}</p>
            </Form.Item>
          )}
        />
        <Controller
          name="field"
          control={control}
          render={({ field }) => (
            <Form.Item label="Lĩnh vực">
              <Input {...field} size="large" placeholder="Lĩnh vực" />
              <p className="text-red-600">{errors.field?.message}</p>
            </Form.Item>
          )}
        />
        <Form.Item label="Hình ảnh">
          <Upload
            listType="picture-card"
            onPreview={handlePreview}
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleChange}
            fileList={fileList}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
          <p className="text-red-600">{errors.file?.message}</p>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 3,
            span: 20,
          }}
        >
          <Button loading={loading} type="dashed" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default CUCourse;
