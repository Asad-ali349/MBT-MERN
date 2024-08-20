import React, { Fragment } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { Breadcrumbs } from '../../../../AbstractElements';
import HeaderCard from '../../../Common/Component/HeaderCard';
import DataTableComponent from './DataTableComponent';
import AddOnsiteOrder from './AddOnsiteOrderForm';
const DataTables = () => {
  return (
    <Fragment>
    <Breadcrumbs mainTitle="Onsite Orders" parent="Onsite Orders" title="Add"  />
      <Container fluid={true}>
        <Row>
          <Col sm={12}>
            <AddOnsiteOrder/>
          </Col>
          <Col sm="12">
            <Card>
              <HeaderCard title="Order Details" />
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