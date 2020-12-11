import React, { useState, useEffect } from "react";
import { Form, Input, Button, Cascader, Radio,Select } from "antd";
import { useHistory } from "react-router-dom";
import { addBook } from "../util/admin/Books";
import { getBook } from "../util/common/common";
import { loginRequest, roleRequest } from "../util/LoginManager";
import {registerRequest} from "../util/guest/register"

const { Option } = Select;

const Register = () => {
  const history = useHistory();

  const [id, setID] = useState();
  const [name, setName] = useState();
  const [author, setAuthor] = useState();
  const [image , setImage] = useState();

  useEffect(() => {
    var items = window.location.search.substr(1).split("=");
    if (items.length >= 2) {
      getBook(items[1]).then((result) => {
        setID(items[1]);
        setName(result.name);
        setAuthor(result.authors[0].name);
        setImage(result.image);
      });
    }
  }, []);

  const backButtonHandler = () =>{
    history.push(`/login`);
  }
  const register = (values) => {
    registerRequest(values).then(()=>{     
      loginRequest(values["name"],values["password"]).then((result)=>{
        history.push(`/${result}/home`)
      });
    });

    
     
     /* console.log(values);
    if (id) {
      values["id"] = id;
    }
    addBook(values).then((result) => {
      history.push("/admin/books");
    });*/
  };  
    return (
      <>
      <div
                  
                  >
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          onFinish={register}
        >
          <Form.Item name="name" label="Name"  rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password"  rules={[{ required: true }]}>
            <Input  />
          </Form.Item>
          <Form.Item name="role" label="Role"  rules={[{ required: true }]}>
              <Select
              placeholder="Select a option and change input text above"
            >
              <Option value="employee">employee</Option>
              <Option value="employer">employer</Option>
            </Select>
          </Form.Item>
          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
          <Form.Item label=" ">
            <Button  onClick={backButtonHandler.bind(this)} type="primary">
                  Back
            </Button>
          </Form.Item>
           
        </Form>
        
                 
        </div>
      </>
    );
  
};

export default Register;
