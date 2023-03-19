import { Video } from "../../Types/Model/video";

export type VideoState = {
  videos: Video[];
  video: Video | undefined;
};
export type VideoPayload = {
  videos: Video[];
};

export enum VideoActionType {
  LIST_VIDEO = "LIST_VIDEO",
  DELETE_VIDEO = "DELETE_VIDEO",
  DETAIL_VIDEO = "DETAIL_VIDEO",
  SEARCH_VIDEO = "SEARCH_VIDEO",
}
type VideoAction = { type: VideoActionType; payload: VideoPayload };

export const videoReducer = (state: VideoState, action: VideoAction) => {
  const { type, payload } = action;

  switch (type) {
    case "LIST_VIDEO":
      return {
        ...state,
        videos: payload.videos,
      };
    case "DELETE_VIDEO":
      return {
        ...state,
        videos: state.videos.filter(
          (video) => video.id !== payload.videos[0].id
        ),
      };
    case "DETAIL_VIDEO":
      return {
        ...state,
        video: state.videos.find((item) => payload.videos[0].id === item.id),
      };
    case "SEARCH_VIDEO":
      return {
        ...state,
        videos: payload.videos,
      };

    default:
      return state;
  }
};
