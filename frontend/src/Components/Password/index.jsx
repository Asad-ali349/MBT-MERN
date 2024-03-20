import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Breadcrumbs } from '../../../src/AbstractElements'
import BasicFormControlClass from './BasicFormControl';


const BaseInput = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle='Base Inputs' parent='Forms' title='Base Inputs' subParent='Forms Controls' />
      <Container fluid={true}>
        <Row>
          <Col sm='12'>
            <BasicFormControlClass />
       
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default BaseInput;
