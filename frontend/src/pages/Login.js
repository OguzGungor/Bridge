import React from "react";
import { useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Button, Row, Col, Form } from "antd";
import { loginRequest, roleRequest } from "../util/LoginManager";

const Login = () => {
  const history = useHistory();
  
  const registerHandler = () => {
    
    history.push(`/register`);
  };

  const login = (values) => {

    loginRequest(values["username"],values["password"]).then((result)=>{
      history.push(`/${result}/home`)
    });
   
  };

  return (
    <Row type="flex" justify="center" style={{ minHeight: "100vh" }}>
      <Col>
        <Form name="login-form" style={{ maxWidth: 300 }} onFinish={login}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Enter username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: 200 }}>
              Log in
            </Button>
          </Form.Item>
        </Form>

        <Button  onClick={registerHandler.bind(this)} style={{width:200}}>
            register
          </Button>
      </Col>
    </Row>
  );
};

export default Login;
