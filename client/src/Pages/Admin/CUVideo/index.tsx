import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Modal, Upload, UploadFile } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { VideoContext } from "../../../Store/Contexts/VideoContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const schemaCreateVideo = yup.object().shape({
  title: yup.string().required("Please fill in this field"),
  chapter: yup.string().required("Please fill in this field"),
  lesson: yup.string().required("Please fill in this field"),
});

interface CreateVideoData {
  title: string;
  chapter: string;
  lesson: string;
  file: File;
}
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const CUVideo = () => {
  const { status, courseId } = useParams();
  const [searchParams] = useSearchParams();
  const { createVideo, detailVideo, updateVideo } = useContext(VideoContext);
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateVideoData>({
    resolver: yupResolver(schemaCreateVideo),
  });
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  useEffect(() => {
    if ((searchParams.get("id"), status === "update")) {
      detailVideo(searchParams.get("id") as string).then((data) => {
        if (data) {
          reset({
            title: data.title,
            chapter: data.chapter,
            lesson: data.lesson,
          });
          setFileList([{ url: data.url, uid: "1", name: "video" }]);
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
  const onSubmit = async (data: CreateVideoData) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("chapter", data.chapter);
    formData.append("lesson", data.lesson);
    if (status === "create" && courseId) {
      formData.append("file", data.file);
      formData.append("courseId", courseId);
      const resp = await createVideo(formData);
      if (resp) {
        setLoading(false);
        navigate(`/admin/video/${courseId}`);
      }
    }
    if (status === "update" && searchParams.get("id")) {
      if (data.file) {
        formData.append("file", data.file);
      }
      const resp = await updateVideo(
        searchParams.get("id") as string,
        formData
      );
      if (resp) {
        setLoading(false);
        navigate(`/admin/video/${courseId}`);
      }
    }
  };
  return (
    <div className="cuVideo">
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
          name="chapter"
          control={control}
          render={({ field }) => (
            <Form.Item label="Chuong">
              <Input {...field} size="large" placeholder="Chuong" />
              <p className="text-red-600">{errors.chapter?.message}</p>
            </Form.Item>
          )}
        />
        <Controller
          name="lesson"
          control={control}
          render={({ field }) => (
            <Form.Item label="Bai hoc">
              <Input {...field} size="large" placeholder="Bai hoc" />
              <p className="text-red-600">{errors.lesson?.message}</p>
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

export default CUVideo;
