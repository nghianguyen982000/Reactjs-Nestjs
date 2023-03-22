import axios from "axios";
import { Video } from "../Types/Model/video";
import { URL } from "./url";
export interface Response<T = Record<never, never>> {
  data: T;
  success: boolean;
}
export interface VideoResp {
  url: string;
  public_id: string;
  duration: string;
}

export const FetchVideo = (courseId: string) =>
  axios.get<Response<Video[]>>(`${URL}/videos?courseId=${courseId}`);
export const PostVideo = (payload: FormData) =>
  axios.post(`${URL}/videos`, payload);
export const UploadVideo = (payload: FormData) =>
  axios.post<Response<VideoResp>>(`${URL}/videos/upload`, payload);
export const PatchVideo = (id: string, payload: FormData) =>
  axios.patch(`${URL}/videos/${id}`, payload);
export const DestroyVideo = (public_id: string) =>
  axios.delete<{ success: boolean }>(
    `${URL}/videos/destroy?public_id=${public_id}`
  );
export const DeleteVideo = (id: string) =>
  axios.delete<Response<Video>>(`${URL}/videos?id=${id}`);
export const GetVideo = (id: string) =>
  axios.get<Response<Video>>(`${URL}/videos/${id}`);
export const SearchVideo = (search: string) =>
  axios.get<Response<Video[]>>(`${URL}/videos?search=${search}`);
