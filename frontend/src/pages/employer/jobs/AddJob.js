import React, { useState, useEffect } from "react";
import { Form, Input, Button, Cascader, Radio } from "antd";
import { useHistory } from "react-router-dom";
import { addUser, getUser } from "../../../util/admin/Users";
import { addJob, getJobInfo } from "../../../util/admin/Jobs";

const AddJob = () => {
  const history = useHistory();

  const [id, setID] = useState();
  //Title
  const [title,setTitle] = useState();
  //description
  const[description,setDescription] = useState();
  //quota
  const [quota, setQuota] = useState();
  

  useEffect(() => {
    var items = window.location.search.substr(1).split("=");
    if(items[1]){      
      setID(items[1]);
      getJobInfo(items[1]).then((result)=>{
        setTitle(result.title);
        setDescription(result.description);
        setQuota(result.quota);
      })

    }
    
  }, []);

  const add = (values) => {
    if (id) {
      values["id"] = id;
    }
    addJob(values).then((result) => {
        history.push("/employer/offeredJobs");
    });
    /*
    addUser(values).then((result) => {
      history.push("/employer/offeredJobs");
    });*/
  };

  const back = (values) => {
    history.push("/employer/offeredJobs");
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
          <Form.Item name="title" label="Current Title">
            {title}
          </Form.Item>
          <Form.Item name="description" label="Current Description">
            {description}
          </Form.Item>
          
          <Form.Item name="quota" label="Current Quota" >
            {quota}
          </Form.Item>


          <Form.Item name="title" label="title" >
            <Input  />
          </Form.Item>
          <Form.Item name="description" label="description">
            <Input />
          </Form.Item>
          
          <Form.Item name="quota" label="quota" >
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
           <Form.Item name="title" label="title">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="description">
            <Input />
          </Form.Item>
          
          
          <Form.Item name="quota" label="quota">
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

export default AddJob;