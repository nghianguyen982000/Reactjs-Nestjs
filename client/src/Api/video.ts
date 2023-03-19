import axios from "axios";
import { Video } from "../Types/Model/video";
import { URL } from "./url";
export interface Response<T = Record<never, never>> {
  data: T;
}

export const fetchVideo = (courseId: string) =>
  axios.get<Response<Video[]>>(`${URL}/videos?courseId=${courseId}`);
export const postVideo = (payload: FormData) =>
  axios.post(`${URL}/videos`, payload);
export const patchVideo = (id: string, payload: FormData) =>
  axios.patch(`${URL}/videos/${id}`, payload);
export const deleteVideo = (id: string) =>
  axios.delete<Response<Video>>(`${URL}/videos?id=${id}`);
export const getVideo = (id: string) =>
  axios.get<Response<Video>>(`${URL}/videos/${id}`);
export const searchVideo = (search: string) =>
  axios.get<Response<Video[]>>(`${URL}/videos?search=${search}`);
