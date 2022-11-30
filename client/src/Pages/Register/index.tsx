import BackgroundAuth from "../../Assets/img/backgroundAuth.jpg";
import imgRegister from "../../Assets/img/register.png";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div
      className="bg-top bg-cover bg-no-repeat h-screen"
      style={{ backgroundImage: `url(${BackgroundAuth})` }}
    >
      <div className="bg-white h-[550px] w-[900px] absolute left-2/4 top-2/4 translate-y-[-50%] translate-x-[-50%] flex rounded-[10px] shadow-[0_2px_5px_rgba(0,0,0,0.5)] p-[50px]">
        <div className="flex-[50%]">
          <div className="text-[35px] font-bold mb-[15px]">REGISTER</div>
          <form className="flex flex-col">
            <input
              type="text"
              className="h-[40px] outline-transparent "
              placeholder="User name"
            />
            <hr className="mb-[15px]" />
            <input
              type="text"
              className="h-[40px] outline-transparent "
              placeholder="Name account"
            />
            <hr className="mb-[15px]" />
            <input
              type="email"
              className="h-[40px] outline-transparent "
              placeholder="Email"
            />
            <hr className="mb-[15px]" />
            <input
              type="password"
              className="h-[40px] outline-transparent"
              placeholder="Password"
            />
            <hr className="mb-[30px]" />
            <input
              type="password"
              className="h-[40px] outline-transparent"
              placeholder="Password"
            />
            <hr className="mb-[30px]" />
            <button
              type="submit"
              className="h-[35px] w-[100px] bg-[#1890ff] text-[#fff] "
            >
              Register
            </button>
          </form>
        </div>
        <div className="flex-[50%] flex flex-col justify-center items-center">
          <img className="w-[80%]" src={imgRegister} alt="img error" />
          <div className="">
            <Link to="/login" className="font-bold">
              I signed up with an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
