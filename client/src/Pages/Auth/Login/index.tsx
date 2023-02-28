import BackgroundAuth from "../../../Assets/img/backgroundAuth.jpg";
import imgLogin from "../../../Assets/img/login.png";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../../Store/Contexts/AuthContext";
import { notification } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const schemaLogin = yup.object().shape({
  userName: yup.string().required("Please fill in this field"),
  password: yup.string().required("Please fill in this field").min(6),
});

interface LoginProps {
  userName: string;
  password: string;
}
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>({
    resolver: yupResolver(schemaLogin),
  });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const onSubmit = async (data: LoginProps) => {
    const resp = await login(data);
    if (resp) {
      navigate("/");
    } else {
      notification.open({
        message: "Sai tài khoản hoặc mật khẩu",
        icon: <CloseCircleOutlined style={{ color: "red" }} />,
      });
    }
  };
  return (
    <div
      className="bg-top bg-cover bg-no-repeat h-screen"
      style={{ backgroundImage: `url(${BackgroundAuth})` }}
    >
      <div className="bg-white h-[400px] w-[900px] absolute left-2/4 top-2/4 translate-y-[-50%] translate-x-[-50%] flex rounded-[10px] shadow-[0_2px_5px_rgba(0,0,0,0.5)] p-[50px]">
        <div className="flex-[50%] flex flex-col justify-center items-center">
          <img className="w-[80%]" src={imgLogin} alt="img error" />
          <div className="">
            <Link to="/register" className="font-bold">
              Do not have an account
            </Link>
          </div>
        </div>
        <div className="flex-[50%]">
          <div className="text-[35px] font-bold mb-[15px]">LOGIN</div>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className="h-[40px] outline-transparent "
              placeholder="User name"
              {...register("userName")}
            />
            <hr className="mb-[15px]" />
            {errors.userName && (
              <p className="text-[red] text-[12px]">
                {errors.userName.message}
              </p>
            )}
            <input
              {...register("password")}
              type="password"
              className="h-[40px] outline-transparent"
              placeholder="Password"
            />
            <hr className="mb-[15px]" />
            {errors.password && (
              <p className="text-[red] text-[12px]">
                {errors.password.message}
              </p>
            )}
            <button
              type="submit"
              className="h-[35px] w-[100px] bg-[#1890ff] text-[#fff] mt-[15px]"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
