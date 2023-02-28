import { Course } from "../../Types/Model/course";

export type CourseState = {
  course: Course[];
};
export type CoursePayload = {
  course: Course[];
};

export enum CourseActionType {
  LIST_COURSE = "LIST_COURSE",
}
type CourseAction = { type: CourseActionType; payload: CoursePayload };

export const courseReducer = (state: CourseState, action: CourseAction) => {
  const { type, payload } = action;

  switch (type) {
    case "LIST_COURSE":
      return {
        ...state,
        course: payload.course,
      };

    default:
      return state;
  }
};
