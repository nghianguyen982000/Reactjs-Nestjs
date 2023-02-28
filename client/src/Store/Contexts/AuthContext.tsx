import { createContext, ReactNode, useReducer } from "react";
import {
  AuthActionType,
  authReducer,
  AuthState,
} from "../Reducers/AuthReducer";
import { LoginData, RegisterData } from "../../Types/Model/auth";
import { postLogin, postRegister } from "../../Api/auth";
import setAuthToken from "../../Api/untill";

const authDefaultValue: AuthState = {
  isAuthenticated: false,
  user: {
    email: "",
    id: "",
    nameAccount: "",
    userName: "",
    role: "",
  },
};

type Props = {
  children: ReactNode;
};
type AuthContextDefault = {
  auth: AuthState;
  login: (payload: LoginData) => Promise<boolean>;
  signup: (payload: RegisterData) => Promise<boolean>;
};
export const AuthContext = createContext<AuthContextDefault>(
  {} as AuthContextDefault
);

const AuthContextProvider = ({ children }: Props) => {
  const [auth, dispatch] = useReducer(authReducer, authDefaultValue);
  const login = async (payload: LoginData) => {
    try {
      const resp = await postLogin(payload);
      console.log(resp);
      if (resp.data.success) {
        localStorage.setItem("token", resp.data.accessToken);
        setAuthToken(resp.data.accessToken);
        dispatch({
          type: AuthActionType.LOGIN,
          payload: { isAuthenticated: true, user: resp.data.user },
        });
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const signup = async (payload: RegisterData) => {
    try {
      await postRegister(payload);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const AuthContextData = { auth, login, signup };

  return (
    <AuthContext.Provider value={AuthContextData}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
