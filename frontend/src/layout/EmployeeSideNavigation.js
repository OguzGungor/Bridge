import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch, useLocation } from "react-router-dom";
import {
  DatabaseFilled, 
  LogoutOutlined,
  BookFilled,
  HomeFilled,
  StarFilled,
} from "@ant-design/icons";
import { roleRequest } from "../util/LoginManager";
import PhoneBreakpoint from "../responsive_util/phone";
import DesktopBreakpoint from "../responsive_util/desktop";
const { Menu } = require("antd");

const EmployeeSideNavigation = () => {
  const [role, setRole] = useState();

  useEffect(() => {
    roleRequest().then((result) => {
      setRole(result);
    });
  }, []);

  let match = useRouteMatch();

  let location = useLocation();

  const history = useHistory();

  const handleHomeClick = () => {
    history.push(`home`);
  };

  const handleLogoutClick = () => {
    history.push("/login");
  };
  const handleJobsClick = () => {
    history.push("jobs");
  };

  const handleHiredJobsClick = () => {
    history.push("hiredJobs");
  };

  const handleAppliedJobsClick = () => {
    history.push("appliedJobs");
  };

  var select = match.params.id;
  if (match.params.id == undefined) {
    select = "home";
  }

  if (role == "employee") {
    return (
      <div>
        <div
          style={{
            height: "32px",
            background: "rgba(255,255,255,0.2",
            margin: "16px",
          }}
        ></div>
        <DesktopBreakpoint>            
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[`${select}`] }>
              <Menu.Item key="home" onClick={handleHomeClick}>
                <HomeFilled />
                <span>Home</span>
              </Menu.Item>
              <Menu.Item key="books" onClick={handleJobsClick}>
                <BookFilled />
                <span>Jobs</span>
              </Menu.Item>
              <Menu.Item key="favourites" onClick={handleHiredJobsClick}>
                <StarFilled />
                <span>HiredJobs</span>
              </Menu.Item>
              <Menu.Item key="readList" onClick={handleAppliedJobsClick}>
                <DatabaseFilled />
                <span>AppliedJobs</span>
              </Menu.Item>
              <Menu.Item key="logout" onClick={handleLogoutClick}>
                <LogoutOutlined />
                <span>Logout</span>
              </Menu.Item>
            </Menu>
        </DesktopBreakpoint>
        <PhoneBreakpoint>            
        <Menu theme="dark" mode="horizontal" style={{maxWidth:"200px"}} defaultSelectedKeys={[`${select}`] }>
            <Menu.Item key="home" onClick={handleHomeClick}>
              <HomeFilled />
            </Menu.Item>            
            <Menu.Item key="logout" onClick={handleLogoutClick}>
              <LogoutOutlined />
            </Menu.Item>
            <Menu.Item key="books" onClick={handleJobsClick}>
              <BookFilled />Anounced Jobs
            </Menu.Item>
            <Menu.Item key="favourites" onClick={handleHiredJobsClick} >
              <StarFilled />Hired Jobs
            </Menu.Item>
            <Menu.Item key="readList" onClick={handleAppliedJobsClick}>
              <DatabaseFilled />Applied Jobs
            </Menu.Item>
          </Menu>
        </PhoneBreakpoint>
      </div>
    );
  } else {
    return <></>;
  }
};

export default EmployeeSideNavigation;
