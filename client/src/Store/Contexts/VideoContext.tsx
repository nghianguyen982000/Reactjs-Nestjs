import { createContext, ReactNode, useReducer } from "react";
import {
  deleteVideo,
  fetchVideo,
  getVideo,
  patchVideo,
  postVideo,
  searchVideo,
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
  removedVideo: (id: string) => Promise<boolean>;
  detailVideo: (id: string) => Promise<Video | undefined>;
  updateVideo: (id: string, formData: FormData) => Promise<boolean>;
  searchVideos: (search: string) => Promise<boolean>;
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
      } = await fetchVideo(courseId);
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
      await postVideo(formData);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const updateVideo = async (id: string, formData: FormData) => {
    try {
      await patchVideo(id, formData);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const removedVideo = async (id: string) => {
    try {
      const {
        data: { data },
      } = await deleteVideo(id);
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
  const detailVideo = async (id: string) => {
    try {
      const {
        data: { data },
      } = await getVideo(id);
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
      } = await searchVideo(search);
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
    removedVideo,
    detailVideo,
    updateVideo,
    searchVideos,
  };

  return (
    <VideoContext.Provider value={VideoContextData}>
      {children}
    </VideoContext.Provider>
  );
};
export default VideoContextProvider;
