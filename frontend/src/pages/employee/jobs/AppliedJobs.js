import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Button, Row, Col, Form, Table } from "antd";
import Title from "antd/lib/skeleton/Title";
import { addFavBook, addReadBook, applyJob, getAppliedJobs } from "../../../util/employee/Jobs";
import { getBooks, getJobs } from "../../../util/common/common";

class AppliedJobs extends React.Component {
  

  applyJobHandler = (id) => {
      alert("hi : " + id );
    const { history ,match} = this.props; 
    applyJob(id).then((result)=>{
      console.log(result);
    }) 
    /*addFavBook(id).then((result)=>{
      alert(result);
    });*/
  }




  state = {
    books: [{}],
    isLoading: true,
    error: null,
  };

  columns = [
    {
      title: "title",
      dataIndex: "title",     
    },
    {
      title: "description",
      dataIndex: "description",
    },
    {
      title: "company",
      dataIndex: "company",
    },
  ];

  componentDidMount() {
    getAppliedJobs()
      .then((jobs) => {
        let data = [];
        console.log(jobs);
        jobs.map((job,index)=>{
          //console.log(job + " : " + index);
         data.push({
            key: job.id,
            title : job.title,
            description : job.description,
            company : job.hiring_company.username,
          });
        });
        this.setState({
          books: data,
          isLoading: false,
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
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
              <Row glutter={[40, 0]}>
                <Col span={24}>
                  <Title level={2}>UserList</Title>
                </Col>
              </Row>
              <Row glutter={[40, 0]}>
                <Col span={24}>
                  <Table columns={this.columns} dataSource={books} />
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

export default withRouter(AppliedJobs);