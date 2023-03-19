import { Course } from "../../Types/Model/course";

export type CourseState = {
  courses: Course[];
  course: Course | undefined;
};
export type CoursePayload = {
  courses: Course[];
};

export enum CourseActionType {
  LIST_COURSE = "LIST_COURSE",
  DELETE_COURSE = "DELETE_COURSE",
  DETAIL_COURSE = "DETAIL_COURSE",
  SEARCH_COURSE = "SEARCH_COURSE",
}
type CourseAction = { type: CourseActionType; payload: CoursePayload };

export const courseReducer = (state: CourseState, action: CourseAction) => {
  const { type, payload } = action;

  switch (type) {
    case "LIST_COURSE":
      return {
        ...state,
        courses: payload.courses,
      };
    case "DELETE_COURSE":
      return {
        ...state,
        courses: state.courses.filter(
          (course) => course.id !== payload.courses[0].id
        ),
      };
    case "DETAIL_COURSE":
      return {
        ...state,
        course: state.courses.find((item) => payload.courses[0].id === item.id),
      };
    case "SEARCH_COURSE":
      return {
        ...state,
        courses: payload.courses,
      };

    default:
      return state;
  }
};
