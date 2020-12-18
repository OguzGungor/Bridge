import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Button, Row, Col, Form, Table } from "antd";
import Title from "antd/lib/skeleton/Title";
import { addFavBook, addReadBook, applyJob } from "../../../util/employee/Jobs";
import { getBooks, getJobs } from "../../../util/common/common";
import { closeJob, getOfferedJobs, showApplicants } from "../../../util/admin/Jobs";
import { hireCandidate } from "../../../util/employer/users";

class showApplicantsList extends React.Component {
  

  hireHandler = (id) =>{
    //alert("hi candidate : " + candidateId + " and job : " + job );
    hireCandidate(id,this.state.job).then((response)=>{     
        this.componentDidMount();
    });
    //history.push
}



 examineHandler = (id) => {
    //alert(id + " : " + this.state.job);
    
    const { history ,match} = this.props; 
    history.push(`/employer/candidateInfo?candidateid=${id}&jobid=${this.state.job}`);
 }


  state = {
    job : 0,
    books: [{}],
    isLoading: true,
    error: null,
  };

  columns = [
    {
      title: "name",
      dataIndex: "name",     
    },
    {
      title: "",
      dataIndex: "action",
      render: (id) => (
        <div>        
          <Button id={id} onClick={this.examineHandler.bind(this, id)}>
            Examine
          </Button>
          <Button type="primary" id={id} onClick={this.hireHandler.bind(this, id)}>
            Hire
          </Button>
          
        </div>
      ),
    },
  ];

  componentDidMount() {
    var items = window.location.search.substr(1).split("=");
    //console.log(items);  
    showApplicants(items[1]).then((applicants)=>{
        let data = [];
        applicants.map((applicant,index)=>{
          //console.log(job + " : " + index);
         data.push({
            key: applicant.id,
            name : applicant.username,
            action : applicant.id
          });
        });
        this.setState({
            job : items[1],
          books: data,
          isLoading: false,
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  search() {
      console.log(document.getElementById("searchBox").value);
  }

  render() {
    const { isLoading, books, error } = this.state;

    return (
      <React.Fragment>
        {!isLoading ? (
          error ? (
            `An error occured : ${error}`
          ) : (
            <>
              <Input
                id="searchBox"
                type="text"
                placeholder = "Search"
                onChange={this.search.bind(this)}
              />
              <Row glutter={[40, 0]}>
                <Col span={24}>
                  <Title level={2}>UserList</Title>
                </Col>
              </Row>
              <Row glutter={[40, 0]}>
                <Col span={24}>
                  <Table columns={this.columns} dataSource={books}  />
                </Col>
              </Row>
              
            </>
          )
        ) : (
          <p>Loading...</p>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(showApplicantsList);

