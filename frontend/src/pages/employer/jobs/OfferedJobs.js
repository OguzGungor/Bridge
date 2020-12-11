import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Button, Row, Col, Form, Table } from "antd";
import Title from "antd/lib/skeleton/Title";
import { addFavBook, addReadBook, applyJob } from "../../../util/employee/Jobs";
import { getBooks, getJobs } from "../../../util/common/common";
import { closeJob, getOfferedJobs, openJob, removeJob, showApplicants } from "../../../util/admin/Jobs";

class OfferedJobs extends React.Component {
  

    closeHandler = (id) => {
    const { history ,match} = this.props; 
    closeJob(id).then((result)=>{
        this.componentDidMount();
    })
  }

  showApplicantsHandler = (id) => {
     
    const { history ,match} = this.props; 
      history.push(`/employer/showApplicants?id=${id}`)
  }

  addJobHandler = () =>{
    const { history, match } = this.props;

    history.push(`addJob`);
  }

  showDetailsHandler = (id) => {
    
    alert("not implemented");
  }

  removeHandler = (id) =>{
    
    const { history ,match} = this.props;  
    removeJob(id).then((result)=>{
      this.componentDidMount();
    });

    
  }

  openHandler = (id) =>{
    
    const { history ,match} = this.props;  
    openJob(id).then((result)=>{
      this.componentDidMount();
    });

    
  }

  updateHandler = (id) =>{
    const { history, match } = this.props;

    history.push(`addJob?id=${id}`);
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
      title: "status",
      dataIndex: "status",
    },
    {
      title: "quota",
      dataIndex : "quota"
    },
    {
      title: "",
      dataIndex: "action",
      render: (id) => (
        <div>    
            
          <Button style={{width:"20%"}} type="primary" id={id} onClick={this.showApplicantsHandler.bind(this, id)}>
            Applicants
          </Button>      
          <Button style={{width:"20%"}} id={id} onClick={this.showDetailsHandler.bind(this, id)}>
            Details
          </Button>
          <br/>
          <Button style={{width:"20%"}} id={id} onClick={this.openHandler.bind(this, id)}>
            Open
          </Button> 
          <Button style={{width:"20%"}} type="primary" id={id} onClick={this.closeHandler.bind(this, id)}>
            Close
          </Button>  
          <br/>        
          <Button style={{width:"20%"}} type="primary" id={id} onClick={this.updateHandler.bind(this, id)}>
            Update
          </Button>                        
          <Button style={{width:"20%"}} id={id} onClick={this.removeHandler.bind(this, id)}>
            Remove
          </Button>  
          
          
        </div>
      ),
    },
  ];

  componentDidMount() {
    getOfferedJobs()
      .then((jobs) => {
        let data = [];
        jobs.map((job,index)=>{
         data.push({
            key: job.id,
            title : job.title,
            description : job.description,
            status : job.status,
            quota : job.employeeCount + "/" + job.quota,
            action : job.id
          });
        });
        this.setState({
          books: data,
          isLoading: false,
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  search() {

    getOfferedJobs(document.getElementById("searchBox").value)
      .then((jobs) => {
        let data = [];
        jobs.map((job,index)=>{
         data.push({
            key: job.id,
            title : job.title,
            description : job.description,
            status : job.status,
            quota : job.employeeCount + "/" + job.quota,
            action : job.id
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
              
              <Button onClick={this.addJobHandler.bind(this)}>Add New Job</Button>
            </>
          )
        ) : (
          <p>Loading...</p>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(OfferedJobs);

