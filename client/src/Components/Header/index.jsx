import "./style.scss";
import Logo from "../../Assets/img/logoWeb.png";
import LogoAD from "../../Assets/img/logoUser.png";
import {
  SearchOutlined,
  ReadOutlined,
  HeartOutlined,
  MenuOutlined,
  HomeOutlined,
  KeyOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { Drawer } from "antd";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Store/Contexts/AuthContext";
import { CourseContext } from "../../Store/Contexts/CourseContext";

const Header = () => {
  const [btnUser, setBtnUser] = useState(false);
  const [visible, setVisible] = useState(false);
  const [btnCourse, setBtnCourse] = useState(false);
  const [btnFavorite, setBtnFavorite] = useState(false);
  const { auth, logout } = useContext(AuthContext);
  const { searchCourses, listCourse } = useContext(CourseContext);
  const search = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    if (search.current.value === "") {
      listCourse();
    } else {
      searchCourses(search.current.value);
      search.current.value = "";
    }
  };
  const navigate = useNavigate();
  const onFocus = () => {
    navigate("/course");
  };
  const onClose = () => {
    setVisible(false);
  };
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="header">
      <Drawer
        placement="left"
        className="headerDrawer"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <div className="headerAccountDrawer">
          <div className="UserAuthProfile">
            <div className="AuthProfileLogo">
              <img src={LogoAD} alt="" />
            </div>
            <div className="AuthProfileName">
              <p>nameAccount</p>
              <p> coin</p>
            </div>
          </div>
          <div className="UserAuthContent">
            <div className="headerAccountDrawerItem">
              <ReadOutlined />
              <span> Các khóa học đã mua</span>
            </div>
          </div>
        </div>

        <div className="headerLogoDrawer">
          <img src={Logo} alt="" />
        </div>
        <div className="headerMenuDrawer">
          <div className="headerMenuDrawerItem">
            <HomeOutlined />
            <span> Trang chủ</span>
          </div>
          <div className="headerMenuDrawerItem">
            <ProfileOutlined />
            <span> Các khóa học</span>
          </div>
        </div>
        {
          <div className="headerDrawerFooter">
            <div className="headerAccountDrawerItem">
              <KeyOutlined />
              <span> Đổi mật khẩu</span>
            </div>
            <div className="headerAccountDrawerItem" onClick={handleLogout}>
              <LogoutOutlined />
              <span> Đăng xuất</span>
            </div>
          </div>
        }
      </Drawer>
      <div className="headerMenuResp">
        <MenuOutlined />
      </div>
      <div className="headerLeft">
        <div className="headerLogo">
          <img src={Logo} alt="" />
        </div>
        <div className="headerMenu">
          <NavLink to="/">Trang chủ</NavLink>
          <NavLink to="/course">Các khóa học</NavLink>
        </div>
      </div>
      <div className="headerCenter">
        <div className="headerSearch">
          <div className="headerSearchLogo">
            <SearchOutlined style={{ fontSize: "20px" }} />
          </div>
          <form action="" onSubmit={(e) => onSubmit(e)}>
            <input
              type="text"
              ref={search}
              onFocus={() => onFocus()}
              placeholder="Tìm kiếm khóa học"
            ></input>
          </form>
        </div>
      </div>
      <div className="headerRight">
        {/* <div className="headerAuth">
          <p>Đăng nhập</p>
        </div> */}
        {auth.isAuthenticated ? (
          <div className="headerUser">
            <div className="headerUserResp">
              <UserOutlined />
            </div>
            <div className="headerUserIcon">
              <ReadOutlined
                onClick={() => {
                  setBtnCourse(!btnCourse);
                  setBtnFavorite(false);
                  setBtnUser(false);
                }}
              />
              {btnCourse && (
                <div className="headerUserCourse">
                  <div className="userCourseHeader">Khóa học của tôi</div>
                  <div className="userCourseContent">
                    <div className="userCourseItem">
                      <div className="CourseItemImg"></div>
                      <div className="CourseItemTitle">title</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="headerUserIcon">
              <HeartOutlined
                onClick={() => {
                  setBtnFavorite(!btnFavorite);
                  setBtnCourse(false);
                  setBtnUser(false);
                }}
              />
              {btnFavorite && (
                <div className="headerUserCourse">
                  <div className="userCourseHeader">Khóa học yêu thích</div>
                  <div className="userCourseContent">
                    <div className="userCourseItem">
                      <div className="CourseItemImg"></div>
                      <div className="CourseItemTitle">title</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="headerUserLogo">
              <div
                className="AuthProfileLogo"
                onClick={() => {
                  setBtnFavorite(false);
                  setBtnCourse(false);
                  setBtnUser(!btnUser);
                }}
              >
                <img src={LogoAD} alt="" />
              </div>
              {btnUser && (
                <div className="headerUserAuth">
                  <div className="UserAuthProfile">
                    <div className="AuthProfileLogo">
                      <img src={LogoAD} alt="" />
                    </div>
                    <div className="AuthProfileName">
                      <p></p>
                      <p>coin</p>
                    </div>
                  </div>
                  <div className="UserAuthContent">
                    <p>Đổi mật khẩu</p>
                    <p onClick={handleLogout}>Đăng xuất</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="headerAuth" onClick={() => navigate("/login")}>
            <p>Đăng nhập</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
