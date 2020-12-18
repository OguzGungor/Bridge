import React, { useState, useEffect } from "react";
import { Form, Input, Button, Cascader, Radio } from "antd";
import { useHistory } from "react-router-dom";
import { addBook } from "../../../util/admin/Books";
import { getBook } from "../../../util/common/common";
import { roleRequest } from "../../../util/LoginManager";
import { getCandidate, hireCandidate } from "../../../util/employer/users";

const CandidateInfo = () => {
  const history = useHistory();

  const [name, setName] = useState();
  const [job,setJob] = useState();
  const [candidateId,setCandidate] = useState();

  useEffect(() => {
      var items1 = window.location.search.substr(1).split("&");
    var items2 = items1[0].split("=");
    var items3 = items1[1].split("=");
    getCandidate(items2[1]).then((applicant)=>{
        setName(applicant.username);
        setJob(items3[1]);
        setCandidate(items2[1]);
        //console.log(applicant);
        //console.log(applicant.username + " : " + applicant.id );
    })

  }, []);

  const hireHandler = () =>{
      //alert("hi candidate : " + candidateId + " and job : " + job );
      hireCandidate(candidateId,job).then((response)=>{
      });
      history.push(`/employer/showApplicants?id=${job}`);
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
              Hire
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  
};

export default CandidateInfo;
