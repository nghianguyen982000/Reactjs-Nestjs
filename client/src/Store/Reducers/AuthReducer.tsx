import { Account } from "../../Types/Model/account";

export type AuthState = {
  authLoading: boolean;
  isAuthenticated: boolean;
  user: Account;
};
export type AuthPayload = {
  authLoading: boolean;
  isAuthenticated: boolean;
  user: Account;
};

export enum AuthActionType {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
}
type AuthAction = { type: AuthActionType; payload: AuthPayload };

export const authReducer = (state: AuthState, action: AuthAction) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      return {
        ...state,
        authLoading: false,
        isAuthenticated: payload.isAuthenticated,
        user: payload.user,
      };

    default:
      return state;
  }
};
