import React, { useState, useEffect } from "react";
import { Form, Input, Button, Cascader, Radio } from "antd";
import { useHistory } from "react-router-dom";
import { addBook } from "../../../util/admin/Books";
import { getBook } from "../../../util/common/common";
import { roleRequest } from "../../../util/LoginManager";
import { getCandidate, hireCandidate, unhireEmployee } from "../../../util/employer/users";

const EmployeeInfo = () => {
  const history = useHistory();

  const [name, setName] = useState();
  const [job,setJob] = useState();
  const [candidateId,setCandidate] = useState();

  useEffect(() => {
      var items1 = window.location.search.substr(1).split("&");
    var items2 = items1[0].split("=");
    var items3 = items1[1].split("=");
    //alert("here : " + items2[1] + " : " + items3[1] );
    console.log("there : " + items2[1]);
    getCandidate(items2[1]).then((applicant)=>{
        setName(applicant.username);
        setJob(items3[1]);
        setCandidate(items2[1]);
        //console.log(applicant);
        //console.log(applicant.username + " : " + applicant.id );
    })

  }, []);

  const hireHandler = () =>{
      unhireEmployee(candidateId,job).then((response)=>{
        console.log("here: " + response.username );
        history.push(`/employer/showEmployees?id=${job}`);
    });
  }


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
        >
          <Form.Item name="currentname" label="Name">
            {name}
          </Form.Item>
          <Form.Item label=" ">
            <Button type="primary" htmlType="submit"  onClick={hireHandler}>
              Unhire
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  
};

export default EmployeeInfo;
