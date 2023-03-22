import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { VideoContext } from "../../../Store/Contexts/VideoContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { UploadChangeParam, UploadFile } from "antd/es/upload";

const schemaCreateVideo = yup.object().shape({
  title: yup.string().required("Please fill in this field"),
  chapter: yup.string().required("Please fill in this field"),
  lesson: yup.string().required("Please fill in this field"),
  url: yup.string().required("Please fill in this field"),
  public_id: yup.string(),
});

interface CreateVideoData {
  title: string;
  chapter: string;
  lesson: string;
  file: File;
  url: string;
  public_id: string;
  duration: string;
}
const CUVideo = () => {
  const { status, courseId } = useParams();
  const [searchParams] = useSearchParams();
  const { createVideo, detailVideo, updateVideo, uploadVideo, destroyVideo } =
    useContext(VideoContext);
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateVideoData>({
    resolver: yupResolver(schemaCreateVideo),
  });
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  useEffect(() => {
    if ((searchParams.get("id"), status === "update")) {
      detailVideo(searchParams.get("id") as string).then((data) => {
        if (data) {
          reset({
            title: data.title,
            chapter: data.chapter,
            lesson: data.lesson,
            url: data.url,
            public_id: data.publicId,
            duration: data.duration,
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, status]);
  const handleCancel = () => setPreviewOpen(false);

  const handleChange = async (info: UploadChangeParam<UploadFile<File>>) => {
    setLoadingVideo(true);
    const formData = new FormData();
    formData.append("file", info.fileList[0].originFileObj as File);
    const resp = await uploadVideo(formData);
    if (resp) {
      setValue("url", resp.url);
      setValue("public_id", resp.public_id);
      setValue("duration", resp.duration);
      setLoadingVideo(false);
    }
  };
  const handleDelete = async () => {
    setLoadingDelete(true);
    const resp = await destroyVideo(watch("public_id"));
    if (resp) {
      setValue("url", "");
      setValue("public_id", "");
      setValue("duration", "");
      setLoadingDelete(false);
    }
  };

  const onSubmit = async (data: CreateVideoData) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("chapter", data.chapter);
    formData.append("lesson", data.lesson);
    formData.append("url", data.url);
    formData.append("publicId", data.public_id);
    formData.append("duration", data.duration);
    if (status === "create" && courseId) {
      formData.append("courseId", courseId);
      const resp = await createVideo(formData);
      if (resp) {
        setLoading(false);
        navigate(`/admin/video/${courseId}`);
      }
    }
    if (status === "update" && searchParams.get("id")) {
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
        <Form.Item label="Video">
          {!watch("url") ? (
            <Upload
              beforeUpload={() => false}
              onChange={handleChange}
              maxCount={1}
              showUploadList={false}
            >
              <Button loading={loadingVideo} icon={<UploadOutlined />}>
                Upload
              </Button>
            </Upload>
          ) : (
            <div>
              <video
                className="relative"
                controls
                style={{ width: "100%" }}
                src={watch("url")}
              ></video>
              <Button
                loading={loadingDelete}
                className="absolute top-0 right-0 bg-sky-500"
                onClick={handleDelete}
              >
                X
              </Button>
            </div>
          )}
          <p className="text-red-600">{errors.url?.message}</p>
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
        title="video"
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={""} />
      </Modal>
    </div>
  );
};

export default CUVideo;
