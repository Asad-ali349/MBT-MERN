import React, { Fragment, useState} from "react";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { H5,} from "../../AbstractElements";
import { EmailAddress } from "../../Constant";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Image } from '../../AbstractElements';
import {useDispatch, useSelector} from 'react-redux';
import { forgotPassword } from "../../Redux/Slices/authSlice";

const Signin = ({ selected }) => {
  const [email, setEmail] = useState("");
  const history = useNavigate();
  const {loading}=useSelector(state=>state.auth);
  const dispatch = useDispatch();

  const loginAuth = async (e) => {
    e.preventDefault();
    console.log(email)
    dispatch(forgotPassword({email}))
  };

  return (
    <Fragment>
      <Container fluid={true} className="p-0 login-page">
        <Row>
          <Col xs="12">
            <div className="login-card">
              <div className="login-main login-tab">
                <Form className="theme-form" onSubmit={loginAuth}>
                    <div className="mb-4"><Image  attrImage={{ className: 'img-fluid d-inline', src: `${require('../../assets/Logo/logo.png')}`, style:{width:"50%"}}} /></div>

                    <H5>{"Recover Your Account With Email"}</H5>
                    <FormGroup>
                        <Label className="col-form-label">{EmailAddress}</Label>
                        <Input className="form-control" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="test@gmail.com" value={email} required={true}/>
                    </FormGroup>
                    
                    <div className="position-relative form-group mb-0">
                        
                        <button className="btn btn-primary w-100" disabled={loading}>{loading?"Recovering...":"Recover"}</button>
                    </div>
                  
                    <p className="mt-3 mb-0 text-center">Back to <Link to={"/"}>Signin</Link></p>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};

export default Signin;
