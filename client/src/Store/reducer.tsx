import { Account } from "../Types/Model/account";

export enum MusicActionType {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
}
type AuthAction = { type: MusicActionType; payload: {} };

export interface AuthState {
  currentAcount: Account;
}

export const musicReducer = (state: AuthState, action: AuthAction) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};
