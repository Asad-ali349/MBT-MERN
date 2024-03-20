import React, { Fragment } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import HeaderCard from '../Common/Component/HeaderCard';
import DataTableComponent from './DataTableComponent';
import AddCategories from './AddCategories'
const DataTables = () => {
  return (
    <Fragment>
    <Breadcrumbs mainTitle="Categories" parent="View Categories"  />
      <Container fluid={true}>
        <Row>
          <Col sm={12}>
            <AddCategories/>
          </Col>
          <Col sm="12">
            <Card>
              <HeaderCard title="View Categories" />
              <CardBody>
                <DataTableComponent />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );

};

export default DataTables;