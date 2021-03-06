import React, { useState, useEffect } from "react";
import { Form, Input, Button, Cascader, Radio } from "antd";
import { useHistory } from "react-router-dom";
import { addUser, getUser } from "../../../util/admin/Users";

const UserSpecification = () => {
  const history = useHistory();

  const [id, setID] = useState();
  const [name, setName] = useState();
  const [role, setRole] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    var items = window.location.search.substr(1).split("=");
    if (items.length >= 2) {
      getUser(items[1]).then((result) => {
        setID(items[1]);
        setName(result.username);
        setRole(result.roles[0].role);
        var imagetemp =
          result.image != null
            ? result.image
            : "data:image/png;base64,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";

        setImage(imagetemp);
      });
    }
  }, []);

  const add = (values) => {
    if (id) {
      values["id"] = id;
    }
    addUser(values).then((result) => {
      history.push("/admin/users");
    });
  };

  const back = (values) => {
    history.push("/admin/users");
  };
  if (id) {
    return (
      <>
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          onFinish={add}
        >
          <Form.Item name="currentname" label="current Name">
            <h1>{name}</h1>
          </Form.Item>
          <Form.Item name="currentAuthor" label="current Role">
            <h1>{role}</h1>
          </Form.Item>
          <Form.Item name="currentImage" label="current Image">
            <img alt={image} src={image} width="50" />
          </Form.Item>
          <Form.Item
            label="Role"
            name="roles"
            rules={[{ required: true, message: "Please select a role!" }]}
          >
            <Radio.Group>
              <Radio.Button value="admin">Admin</Radio.Button>
              <Radio.Button value="user">User</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="username" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="encryptedPassword" label="Password">
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Image">
            <Input />
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              Done
            </Button>
          </Form.Item>
          <Form.Item label=" ">
            <Button type="primary" onClick={back}>
              Back
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }else{
    return (
      <>
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          onFinish={add}
        >
          
          <Form.Item
            label="Role"
            name="roles"
            rules={[{ required: true, message: "Please select a role!" }]}
          >
            <Radio.Group>
              <Radio.Button value="admin">Admin</Radio.Button>
              <Radio.Button value="user">User</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="username" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="encryptedPassword" label="Password">
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Image">
            <Input />
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              Done
            </Button>
          </Form.Item>
          <Form.Item label=" ">
            <Button type="primary" onClick={back}>
              Back
            </Button>
          </Form.Item>
        </Form>
        </>
    );
  }
};

export default UserSpecification;
