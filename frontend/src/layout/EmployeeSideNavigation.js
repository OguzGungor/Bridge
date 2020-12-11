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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[`${select}`]}>
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
      </div>
    );
  } else {
    return <></>;
  }
};

export default EmployeeSideNavigation;
