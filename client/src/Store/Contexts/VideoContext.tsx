import { createContext, ReactNode, useReducer } from "react";
import {
  DeleteVideo,
  DestroyVideo,
  FetchVideo,
  GetVideo,
  PatchVideo,
  PostVideo,
  SearchVideo,
  UploadVideo,
} from "../../Api/video";
import { Video } from "../../Types/Model/video";
import {
  VideoActionType,
  videoReducer,
  VideoState,
} from "../Reducers/VideoReducer";

const videoDefaultValue: VideoState = {
  videos: [],
  video: {} as Video,
};

type Props = {
  children: ReactNode;
};
type VideoContextDefault = {
  data: VideoState;
  listVideo: (courseId: string) => Promise<boolean>;
  createVideo: (formData: FormData) => Promise<boolean>;
  uploadVideo: (
    formData: FormData
  ) => Promise<{ url: string; public_id: string } | undefined>;
  removeVideo: (id: string) => Promise<boolean>;
  detailVideo: (id: string) => Promise<Video | undefined>;
  updateVideo: (id: string, formData: FormData) => Promise<boolean>;
  searchVideos: (search: string) => Promise<boolean>;
  destroyVideo: (publicId: string) => Promise<boolean>;
};

export const VideoContext = createContext<VideoContextDefault>(
  {} as VideoContextDefault
);

const VideoContextProvider = ({ children }: Props) => {
  const [data, dispatch] = useReducer(videoReducer, videoDefaultValue);

  const listVideo = async (courseId: string) => {
    try {
      const {
        data: { data },
      } = await FetchVideo(courseId);
      dispatch({
        type: VideoActionType.LIST_VIDEO,
        payload: { videos: data },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const createVideo = async (formData: FormData) => {
    try {
      await PostVideo(formData);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const updateVideo = async (id: string, formData: FormData) => {
    try {
      await PatchVideo(id, formData);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const removeVideo = async (id: string) => {
    try {
      const {
        data: { data },
      } = await DeleteVideo(id);
      dispatch({
        type: VideoActionType.DELETE_VIDEO,
        payload: { videos: [data] },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const destroyVideo = async (publicId: string) => {
    try {
      const {
        data: { success },
      } = await DestroyVideo(publicId);
      if (!success) {
        throw new Error("Delete fail!");
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const uploadVideo = async (formData: FormData) => {
    try {
      const {
        data: { data },
      } = await UploadVideo(formData);
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };
  const detailVideo = async (id: string) => {
    try {
      const {
        data: { data },
      } = await GetVideo(id);
      dispatch({
        type: VideoActionType.DETAIL_VIDEO,
        payload: { videos: [data] },
      });
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };
  const searchVideos = async (search: string) => {
    try {
      const {
        data: { data },
      } = await SearchVideo(search);
      dispatch({
        type: VideoActionType.SEARCH_VIDEO,
        payload: { videos: data },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const VideoContextData = {
    data,
    listVideo,
    createVideo,
    removeVideo,
    detailVideo,
    updateVideo,
    searchVideos,
    destroyVideo,
    uploadVideo,
  };

  return (
    <VideoContext.Provider value={VideoContextData}>
      {children}
    </VideoContext.Provider>
  );
};
export default VideoContextProvider;
