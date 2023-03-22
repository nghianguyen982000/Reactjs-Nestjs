import { createContext, ReactNode, useReducer } from "react";
import {
  deleteCourse,
  fetchCourse,
  getCourse,
  patchCourse,
  postCourse,
  searchCourse,
} from "../../Api/course";
import { Course } from "../../Types/Model/course";
import {
  CourseActionType,
  courseReducer,
  CourseState,
} from "../Reducers/CourseReducer";

const courseDefaultValue: CourseState = {
  courses: [],
  course: {} as Course,
};

type Props = {
  children: ReactNode;
};
type CourseContextDefault = {
  data: CourseState;
  listCourse: () => Promise<boolean>;
  createCourse: (formData: FormData) => Promise<boolean>;
  removedCourse: (id: string) => Promise<boolean>;
  detailCourse: (id: string) => Promise<Course | undefined>;
  updateCourse: (id: string, formData: FormData) => Promise<boolean>;
  searchCourses: (search: string) => Promise<boolean>;
};

export const CourseContext = createContext<CourseContextDefault>(
  {} as CourseContextDefault
);

const CourseContextProvider = ({ children }: Props) => {
  const [data, dispatch] = useReducer(courseReducer, courseDefaultValue);

  const listCourse = async () => {
    try {
      const {
        data: { data },
      } = await fetchCourse();
      dispatch({
        type: CourseActionType.LIST_COURSE,
        payload: { courses: data },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const createCourse = async (formData: FormData) => {
    try {
      await postCourse(formData);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const updateCourse = async (id: string, formData: FormData) => {
    try {
      await patchCourse(id, formData);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const removedCourse = async (id: string) => {
    try {
      const {
        data: { data },
      } = await deleteCourse(id);
      dispatch({
        type: CourseActionType.DELETE_COURSE,
        payload: { courses: [data] },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const detailCourse = async (id: string) => {
    try {
      const {
        data: { data },
      } = await getCourse(id);
      dispatch({
        type: CourseActionType.DETAIL_COURSE,
        payload: { courses: [data] },
      });
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };
  const searchCourses = async (search: string) => {
    try {
      const {
        data: { data },
      } = await searchCourse(search);
      dispatch({
        type: CourseActionType.SEARCH_COURSE,
        payload: { courses: data },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const CourseContextData = {
    data,
    listCourse,
    createCourse,
    removedCourse,
    detailCourse,
    updateCourse,
    searchCourses,
  };

  return (
    <CourseContext.Provider value={CourseContextData}>
      {children}
    </CourseContext.Provider>
  );
};
export default CourseContextProvider;
