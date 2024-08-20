import React, { Fragment } from "react";
import { Container, Row } from "reactstrap";
import { Breadcrumbs } from "../../../src/AbstractElements";
import UserProfile from "./UserProfile";


const UsersProfileContain = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle="User Profile" parent="User Profile" />
      <Container fluid={true}>
        <div className="user-profile">
          <Row>
            <UserProfile />
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};
export default UsersProfileContain;
