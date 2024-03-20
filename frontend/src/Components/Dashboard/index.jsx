import React, { Fragment } from "react";
import { Container, Row } from "reactstrap";
import { Breadcrumbs } from "../../../src/AbstractElements";



const Dashboard = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Dashboard" parent="Dashboard" title=""/>
      <Container fluid={true}>
        <div className="user-profile">
          <Row>
            {/* <h1>Dashboard</h1> */}
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};
export default Dashboard;
