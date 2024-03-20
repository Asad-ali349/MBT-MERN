import React, { Fragment } from 'react';
import { Row, Col, Card, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { H5 ,Btn} from '../../../src/AbstractElements'
import {CardHeader,CardFooter} from 'reactstrap';


const BasicFormControlClass = () => {
    return (
        <Fragment>
            <Card>
            <CardHeader > <H5>Change Password</H5>   </CardHeader>
                <Form className="form theme-form">
                    <CardBody>
                        <Row className='mb-3'>
                            <Col className='col-lg-4'>
                                <FormGroup>
                                    <Label htmlFor="exampleFormControlInput1">name@example.com"</Label>
                                    <Input className="form-control" type="email" placeholder="name@example.com" />
                                </FormGroup>
                            </Col>

                            <Col className='col-lg-4'>
                                <FormGroup>
                                    <Label htmlFor="exampleFormControlInput1">name@example.com"</Label>
                                    <Input className="form-control" type="email" placeholder="name@example.com" />
                                </FormGroup>
                            </Col>

                            <Col className='col-lg-4'>
                                <FormGroup>
                                    <Label htmlFor="exampleFormControlInput1">name@example.com"</Label>
                                    <Input className="form-control" type="email" placeholder="name@example.com" />
                                </FormGroup>
                            </Col>
                        </Row>
                      
                    </CardBody>
                    <CardFooter className="text-end">
                <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >Submit</Btn>
                <Btn attrBtn={{ color: "secondary", type: "submit" }} >Cancel</Btn>
                 </CardFooter>
                </Form>
            </Card>
        </Fragment>
    );
};

export default BasicFormControlClass;