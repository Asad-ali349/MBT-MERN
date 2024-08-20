import React, { Fragment } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import HeaderCard from '../../Common/Component/HeaderCard';
import DataTableComponent from './DataTableComponent';
import { useNavigate } from 'react-router';

const DataTables = () => {
  const navigate=useNavigate();
  return (
    <Fragment>
    <Breadcrumbs mainTitle="Onsite Orders" parent="Onsite Orders"  />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="View Orders" />
              <CardBody>
                <button className='btn btn-primary float-end' onClick={()=>navigate('/onsite_orders/add')}>Create Order</button>
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