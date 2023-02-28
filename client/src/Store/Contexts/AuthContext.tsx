import { createContext, ReactNode, useReducer } from "react";
import axios from "axios";
import { authReducer, AuthState } from "../Reducers/AuthReducer";
import { LoginData } from "../../Types/Model/login";

const authDefaultValue: AuthState = {
  authLoading: true,
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
type MusicContextDefault = {
  auth: AuthState;
  login: (payload: LoginData) => Promise<boolean>;
};
export const AuthContext = createContext<MusicContextDefault>({
    auth:authDefaultValue,
    login: (payload: LoginData) =>false ;
});

const AuthContextProvider = ({ children }: Props) => {
  const [auth, dispatch] = useReducer(authReducer, authDefaultValue);
  const login = async (payload: LoginData) => {
    try {
      const resp = await fetchLogin(payload)
      if (resp.data.success) {
        localStorage.setItem("token", rep.data.accessToken);
      }
      return true;
    } catch (error) {
      console.error(error)
      return false;
    }
  };
  const AuthContextData = { auth, login };

  return (
    <AuthContext.Provider value={AuthContextData}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
