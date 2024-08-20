import React, { Fragment } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import HeaderCard from '../Common/Component/HeaderCard';
import DataTableComponent from './DataTableComponent';
import { useNavigate } from 'react-router';
const DataTables = () => {
  const navigate= useNavigate();
  return (
    <Fragment>
    <Breadcrumbs mainTitle="Products" parent="View Products"  />
      <Container fluid={true}>
        <Row>
          <Col sm="12">

            <Card>
              <HeaderCard title="View Products" />
              <CardBody>
              <button className='btn btn-primary float-end' onClick={()=>navigate('/products/add')}>
                Add Product
              </button>
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