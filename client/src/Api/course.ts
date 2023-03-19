import axios from "axios";
import { Course } from "../Types/Model/course";
import { URL } from "./url";
export interface Response<T = Record<never, never>> {
  data: T;
}

export const fetchCourse = () =>
  axios.get<Response<Course[]>>(`${URL}/courses`);
export const postCourse = (payload: FormData) =>
  axios.post(`${URL}/courses`, payload);
export const patchCourse = (id: string, payload: FormData) =>
  axios.patch(`${URL}/courses/${id}`, payload);
export const deleteCourse = (id: string) =>
  axios.delete<Response<Course>>(`${URL}/courses?id=${id}`);
export const getCourse = (id: string) =>
  axios.get<Response<Course>>(`${URL}/courses/${id}`);
export const searchCourse = (search: string) =>
  axios.get<Response<Course[]>>(`${URL}/courses?search=${search}`);
