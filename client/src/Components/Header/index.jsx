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
  IdcardOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { Drawer } from "antd";

const Header = () => {
  return (
    <div className="header">
      <Drawer placement="left" className="headerDrawer" closable={false}>
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
              <IdcardOutlined />
              <span> Trang cá nhân</span>
            </div>
            <div className="headerAccountDrawerItem">
              <KeyOutlined />
              <span> Đổi mật khẩu</span>
            </div>
            <div className="headerAccountDrawerItem">
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
          {/* <NavLink to="/monitoring" >
            Giám sát
          </NavLink> */}
          <NavLink to="/course">Các khóa học</NavLink>
        </div>
      </div>
      <div className="headerCenter">
        <div className="headerSearch">
          <div className="headerSearchLogo">
            <SearchOutlined style={{ fontSize: "20px" }} />
          </div>
          <form action="">
            <input type="text" placeholder="Tìm kiếm khóa học"></input>
          </form>
        </div>
      </div>
      <div className="headerRight">
        {
          <div className="headerAuth">
            <p>Đăng nhập</p>
          </div>
        }
        {
          <div className="headerUser">
            <div className="headerUserResp">
              <UserOutlined />
            </div>
            <div className="headerUserIcon">
              <ReadOutlined />
              <div className="headerUserCourse">
                <div className="userCourseHeader">Khóa học của tôi</div>
                <div className="userCourseContent">
                  <div className="userCourseItem">
                    <div className="CourseItemImg"></div>
                    <div className="CourseItemTitle">title</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="headerUserIcon">
              <HeartOutlined />
              <div className="headerUserCourse">
                <div className="userCourseHeader">Khóa học yêu thích</div>
                <div className="userCourseContent">
                  <div className="userCourseItem">
                    <div className="CourseItemImg"></div>
                    <div className="CourseItemTitle">title</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="headerUserLogo">
              <div className="AuthProfileLogo">
                <img src={LogoAD} alt="" />
              </div>
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
                  <p>Trang cá nhân</p>
                  <p>Đổi mật khẩu</p>
                  <p>Đăng xuất</p>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default Header;
