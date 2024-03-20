import React, { Fragment } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { Breadcrumbs, H5 } from '../../../AbstractElements'
import { useParams } from 'react-router';


const ProductDetail = () => {
    const {id}=useParams();
  return (
    <Fragment>
      <Breadcrumbs mainTitle='Products' parent='Products' title='Edit'/>
      <Container fluid={true}>
        <Row>
          <Col sm='12'>
          <Card>
            <CardHeader><H5>Product Detail</H5></CardHeader>
            <CardBody>
                <Row>
                    <Col md={6}><img src={require('../../../assets/images/user.jpg')} alt="" width="100%"/></Col>
                    <Col md={6}>
                        <H5>Name: Chicken Tikka</H5>
                        <span>Category: Chicken</span>
                        <p>Price: 100</p>
                        <p>Description: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum veniam quo dignissimos expedita possimus natus veritatis enim asperiores mollitia repudiandae id dolorum, cum hic architecto vitae, quis voluptas quos voluptatibus!</p>
                    </Col>
                </Row>
            </CardBody>
          </Card>

          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ProductDetail;
