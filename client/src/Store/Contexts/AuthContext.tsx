import { createContext, ReactNode, useReducer } from "react";
import {
  AuthActionType,
  authReducer,
  AuthState,
} from "../Reducers/AuthReducer";
import { LoginData, RegisterData } from "../../Types/Model/auth";
import { fetchCheckLogin, postLogin, postRegister } from "../../Api/auth";
import setAuthToken from "../../Api/untill";

const authDefaultValue: AuthState = {
  isAuthenticated: false,
  user: null,
};

type Props = {
  children: ReactNode;
};
type AuthContextDefault = {
  auth: AuthState;
  login: (payload: LoginData) => Promise<boolean>;
  signup: (payload: RegisterData) => Promise<boolean>;
  checkLogin: () => Promise<boolean>;
  logout: () => void;
};
export const AuthContext = createContext<AuthContextDefault>(
  {} as AuthContextDefault
);

const AuthContextProvider = ({ children }: Props) => {
  const [auth, dispatch] = useReducer(authReducer, authDefaultValue);
  const checkLogin = async () => {
    if (localStorage["token"]) {
      setAuthToken(localStorage["token"]);
    }
    try {
      const response = await fetchCheckLogin();
      if (response.data.success) {
        dispatch({
          type: AuthActionType.SET_AUTH,
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
      return true;
    } catch (error) {
      localStorage.removeItem("token");
      setAuthToken("");
      dispatch({
        type: AuthActionType.SET_AUTH,
        payload: { isAuthenticated: false, user: null },
      });
      return false;
    }
  };
  const login = async (payload: LoginData) => {
    try {
      const resp = await postLogin(payload);
      if (resp.data.success) {
        localStorage.setItem("token", resp.data.accessToken);
        setAuthToken(resp.data.accessToken);
        dispatch({
          type: AuthActionType.LOGIN,
          payload: { isAuthenticated: true, user: resp.data.user },
        });
        window.location.href = "/login";
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
  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken("");
    dispatch({
      type: AuthActionType.SET_AUTH,
      payload: {
        isAuthenticated: false,
        user: null,
      },
    });
  };
  const AuthContextData = { auth, login, signup, checkLogin, logout };

  return (
    <AuthContext.Provider value={AuthContextData}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
