import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ReadOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import logoAd from "../../Assets/img/logoUser.png";
import CourseAdmin from "./CourseAdmin";
import CUVideo from "./CUVideo";
import CUCourse from "./CUCourse";
import { AuthContext } from "../../Store/Contexts/AuthContext";
import VideoAdmin from "./VideoAdmin";

const { Header, Sider, Content } = Layout;

const Admin = () => {
  const navigate = useNavigate();
  const [colapsed, setColapsed] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { checkLogin, auth, logout } = useContext(AuthContext);
  useEffect(() => {
    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (auth) {
      if (auth.user?.role === "user") {
        navigate("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="admin">
      <Layout>
        <Sider
          className="site-layout-background"
          width={260}
          trigger={null}
          collapsed={collapsed}
          breakpoint="lg"
          collapsedWidth={colapsed ? "0" : "80"}
          onCollapse={() => {
            setCollapsed(!collapsed);
            setColapsed(!colapsed);
          }}
          style={{
            height: "100vh",
          }}
        >
          <div className="logo" onClick={() => navigate("/")}>
            <img src={logoAd} alt="" />
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            className="SiderMenu"
          >
            <Menu.Item key="1" icon={<ReadOutlined />}>
              <Link to="/admin/course">Quản lý khóa học</Link>
            </Menu.Item>
            {/* <Menu.Item key="2" icon={<TeamOutlined />}>
              <Link to="/admin/account">Quản lý tài khoản</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<CommentOutlined />}>
              <Link to="/admin/comment">Quản lý comment</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<BarChartOutlined />}>
              <Link to="/admin/statistical">Thống kê</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<KeyOutlined />}>
              <span>Đổi mật khẩu</span>
            </Menu.Item> */}
            <Menu.Item key="6" icon={<LogoutOutlined />}>
              <span onClick={handleLogout}>Đăng xuất</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="headerContent site-layout-background headerAdmin"
            style={{ padding: 0 }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
            <div className="backHome">
              <HomeOutlined onClick={() => navigate("/")} />
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 24px",
              padding: 24,
              minHeight: 280,
              height: "500px",
              overflow: "auto",
            }}
          >
            <Routes>
              <Route path="/course" element={<CourseAdmin />} />
              <Route path="/video/:courseId" element={<VideoAdmin />} />
              <Route
                path="/video/:courseId/edit/:status"
                element={<CUVideo />}
              />
              <Route path="/course/:status" element={<CUCourse />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default Admin;
