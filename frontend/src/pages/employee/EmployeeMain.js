import React from "react";
import { Row, Col, Table, Button } from "antd";
import Title from "antd/lib/skeleton/Title";
import { Route, Switch } from "react-router-dom";
import { roleRequest } from "../../util/LoginManager";
import Jobs from "./jobs/Jobs";
import HiredJobs from "./jobs/HiredJobs";
import AppliedJobs from "./jobs/AppliedJobs";

class EmployeeMain extends React.Component {
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
        this.setState({ role });
      })
      .catch((error) => this.setState({ error }));
  }
  render() {
    const { role, error } = this.state;
    if (this.state.role == "employee") {
      return (
        <Switch>
          <Route path="/employee/home">
            <h1>Home</h1>
          </Route>
          <Route path="/employee/jobs" component={Jobs} />
          <Route path="/employee/hiredJobs" component={HiredJobs} />             
          <Route path="/employee/appliedJobs" component={AppliedJobs} />         
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

export default EmployeeMain;
