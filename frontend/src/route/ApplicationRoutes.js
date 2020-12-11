
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { Layout } from "antd";
import { useState } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import Login from "../pages/Login";
import AdminMain from "../pages/admin/AdminMain";
import AdminSideNavigation from "../layout/AdminSideNavigation";
import Register from "../pages/Register";
import EmployeeMain from "../pages/employee/EmployeeMain";
import EmployeeSideNavigation from "../layout/EmployeeSideNavigation";
import EmployerMain from "../pages/employer/EmployerMain";
import EmployerSideNavigation from "../layout/EmployerSideNavigation";

const { Header, Sider, Content } = Layout;

const ApplicationRoutes = () => {
  const [collapse, setCollapse] = useState(false);

  const handleToggle = (event) => {
    event.preventDefault();
    collapse ? setCollapse(false) : setCollapse(true);
  };
  return (
    <Router>
      <Layout>
        <Sider trigger={null} collabsible collapsed={collapse}>          
          <Switch>
            <Route exact path="/admin/:id" component={AdminSideNavigation} />
            <Route exact path="/admin" component={AdminSideNavigation} />            
            <Route exact path="/employee/:id" component={EmployeeSideNavigation} />
            <Route exact path="/employee" component={EmployeeSideNavigation} />                    
            <Route exact path="/employer/:id" component={EmployerSideNavigation} />
            <Route exact path="/employer" component={EmployerSideNavigation} />           
          </Switch>
        </Sider>
        <Layout>
          <Header
            className="siteLayoutBackground"
            style={{ padding: 0, background: "#001529" }}
          >
            {React.createElement(
              collapse ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: handleToggle,
                style: { color: "#fff" },
              }
            )}
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: "calc(100vh - 114px",
              background: "#fff",
            }}
          >
            <Content >
              <Switch>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login} />                
                <Route path="/admin/:id" component={AdminMain} />
                <Route path="/admin" component={AdminMain} />                
                <Route path="/employee/:id" component={EmployeeMain} />
                <Route path="/employee" component={EmployeeMain} />          
                <Route path="/employer/:id" component={EmployerMain} />
                <Route path="/employer" component={EmployerMain} />

                <Redirect from="/" to="/login" />
              </Switch>
            </Content>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default ApplicationRoutes;
