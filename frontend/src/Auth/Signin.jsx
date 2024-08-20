import React, { Fragment, useState, useEffect, useContext } from "react";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Btn, H4, P } from "../AbstractElements";
import { EmailAddress, ForgotPassword, Password, RememberPassword, SignIn } from "../Constant";

import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Image } from '../AbstractElements';
import { login } from "../Redux/Slices/authSlice";
import { useDispatch, useSelector } from 'react-redux';
const Signin = ({ selected }) => {
  const {loading}= useSelector(state=>state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const history = useNavigate();
  const dispatch=useDispatch();
  

  const loginAuth = async (e) => {
    e.preventDefault();
    let res=await dispatch(login({email,password}));
    if(res.payload && res.payload.token)
      history('dashboard')
  };

  return (
    <Fragment>
      <Container fluid={true} className="p-0 login-page">
        <Row>
          <Col xs="12">
            <div className="login-card">
              <div className="login-main login-tab">
                <Form className="theme-form" onSubmit={loginAuth}>
                  <div className="mb-4 text-center"><Image  attrImage={{ className: 'img-fluid d-inline', src: `${require('../assets/Logo/logo.png')}`, style:{width:"50%"}}} /></div>
                  <H4>{selected === "simpleLogin" ? "" : "Sign In With Simple Login"}</H4>
                  <P>{"Enter your email & password to login"}</P>
                  <FormGroup>
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input className="form-control" type="email" onChange={(e) => setEmail(e.target.value)} value={email} required={true} placeholder="test@example.com"/>
                  </FormGroup>
                  <FormGroup className="position-relative">
                    <Label className="col-form-label">{Password}</Label>
                    <div className="position-relative">
                      <Input className="form-control" type={togglePassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} value={password} required={true} minLength={8} placeholder="*************"/>
                      <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}>
                        <span className={togglePassword ? "" : "show"}></span>
                      </div>
                    </div>
                  </FormGroup>
                  <div className="position-relative form-group mb-0">
                    
                    <Link className="forgot_link mb-3" to="/forgot_password" style={{float:'right'}}>
                      {ForgotPassword}
                    </Link>
                    <button className="btn btn-primary w-100" disabled={loading} >{loading?'Signing in....':SignIn}</button>
                  </div>
                  
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
