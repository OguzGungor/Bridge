import React from "react";
import { Row, Col, Table, Button } from "antd";
import Title from "antd/lib/skeleton/Title";
import { Route, Switch } from "react-router-dom";
import { roleRequest } from "../../util/LoginManager";
import OfferedJobs from "./jobs/OfferedJobs";
import AddJob from "./jobs/AddJob";
import showApplicantsList from "./jobs/showApplicants"
import CandidateInfo from "./candidate/candidateInfo";
import OngoingJobs from "./jobs/OngoingJobs";
import showEmployeesList from "./jobs/showEmployees"
import EmployeeInfo from "./employees/employeeInfo";

class EmployerMain extends React.Component {
  state = {
    role: null,
    error: null,
  };  
  back = () => {
    const { history, match } = this.props;

    history.push(`login`);
  };
  componentDidMount() {
    roleRequest()
      .then((role) => {
        console.log(role);
        this.setState({ role });
      })
      .catch((error) => this.setState({ error }));
  }
  render() {
    const { role, error } = this.state;
    if (this.state.role == "employer") {
      return (
        <Switch>
          <Route path="/employer/home">
            <h1>Home</h1>
            <body></body>
          </Route>                 
                   
          <Route path="/employer/addJob" component={AddJob} />
          <Route path="/employer/offeredJobs" component={OfferedJobs} /> 
          <Route path="/employer/showApplicants" component={showApplicantsList} />          
          <Route path="/employer/candidateInfo" component={CandidateInfo} />                   
          <Route path="/employer/ongoingJobs" component={OngoingJobs} />
          <Route path="/employer/showEmployees" component={showEmployeesList} />              
          <Route path="/employer/employeeInfo" component={EmployeeInfo} />   
        </Switch>
      );
    }else{
        return (
            <>
              <h1>Unauthorized Request for role :{role}</h1>
              <Button type="primary" onClick={this.back.bind(this)}>
                Back
              </Button>
            </>
          );
    }
  }
}

export default EmployerMain;
