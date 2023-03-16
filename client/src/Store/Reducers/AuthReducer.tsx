import { Account } from "../../Types/Model/account";

export type AuthState = {
  isAuthenticated: boolean;
  user: Account | null;
};
export type AuthPayload = {
  isAuthenticated: boolean;
  user: Account | null;
};

export enum AuthActionType {
  LOGIN = "LOGIN",
  SET_AUTH = "SET_AUTH",
}
type AuthAction = { type: AuthActionType; payload: AuthPayload };

export const authReducer = (state: AuthState, action: AuthAction) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: payload.isAuthenticated,
        user: payload.user,
      };
    case "SET_AUTH":
      return {
        ...state,
        isAuthenticated: payload.isAuthenticated,
        user: payload.user,
      };

    default:
      return state;
  }
};
