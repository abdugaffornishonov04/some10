import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";    
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LoginOutlined
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { ISLOGGEDIN } from "..";
const { Header, Sider, Content } = Layout;
const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation()
  console.log(location.pathname);
   
  const logout = () => {
    let confirmLog = confirm("Are you sure you want to log out?");
    if (confirmLog) {
      localStorage.removeItem(ISLOGGEDIN);
      location.reload();
    }
  };
  return (
    <Layout className="admin-layout-layout">
      <Sider
        className="admin-aside"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />
        <div className="admin-logo-adl">
          <h1>{collapsed ? "LMS" : "LMS project"}</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/dashboard",
              icon: <UserOutlined />,
              label: <Link to="dashboard">Dashboard</Link>,
            },
            {
              key: "/teachers",
              icon: <VideoCameraOutlined />,
              label: <Link to="teachers">Teachers</Link>,
            },
            {
              key: "/students",
              icon: <UploadOutlined />,
              label: <Link to="students">Students</Link>,
            },
            {
              key: "4",
              icon: <LoginOutlined />,
              label: (
                <Button className="logoutbtn-admin" onClick={logout}>
                  Log Out
                </Button>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="admin-header"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          className="admin-content"
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;


// done
