import { createContext, ReactNode, useReducer } from "react";
import { fetchCourse, postCourse } from "../../Api/course";
import {
  CourseActionType,
  courseReducer,
  CourseState,
} from "../Reducers/CourseReducer";

const courseDefaultValue: CourseState = {
  course: [],
};

type Props = {
  children: ReactNode;
};
type CourseContextDefault = {
  data: CourseState;
  listCourse: () => Promise<boolean>;
  createCourse: (formData: FormData) => Promise<boolean>;
};
export const CourseContext = createContext<CourseContextDefault>(
  {} as CourseContextDefault
);

const CourseContextProvider = ({ children }: Props) => {
  const [data, dispatch] = useReducer(courseReducer, courseDefaultValue);

  const listCourse = async () => {
    try {
      const resp = await fetchCourse();
      if (resp.data.success) {
        dispatch({
          type: CourseActionType.LIST_COURSE,
          payload: { course: resp.data.data },
        });
      }
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

  const CourseContextData = { data, listCourse, createCourse };

  return (
    <CourseContext.Provider value={CourseContextData}>
      {children}
    </CourseContext.Provider>
  );
};
export default CourseContextProvider;
