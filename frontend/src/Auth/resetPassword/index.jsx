import React, { Fragment, useState } from 'react';
import { Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { Btn, H4, P, Image } from '../../AbstractElements';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../Redux/Slices/authSlice';

import { ToastContainer, toast } from "react-toastify";

const UnlockUser = ({ logoClassMain }) => {
  const { token } = useParams();
  const [changePassword, setChangePassword] = useState({
    password: '',
    confirm_password: '',
  });
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleChangePassword, setToggleChangePassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
 

  const handleSend = async (e) => {
    e.preventDefault();
    dispatch(resetPassword({ token, password: changePassword }));
  };

  return (
    <Fragment>
      <section>
        <Container fluid className="p-0 login-page">
          <Row className="m-0">
            <Col className="p-0">
              <div className="login-card">
                <div>
                  <div>
                    {/* Logo */}
                  </div>
                  <div className="login-main unlock-user">
                    <Form className="theme-form login-form" onSubmit={handleSend}>
                      <div className="mb-4">
                        <Image
                          attrImage={{
                            className: 'img-fluid d-inline',
                            src: require('../../assets/Logo/logo.png').default,
                            style: { width: '50%' },
                          }}
                        />
                      </div>
                      <H4>Recover Your Password</H4>
                      <FormGroup className="position-relative">
                        <Label className="col-form-label">New Password</Label>
                        <div className="position-relative">
                          <Input
                            className="form-control"
                            required
                            type={togglePassword ? 'text' : 'password'}
                            placeholder="*************"
                            value={changePassword.password}
                            onChange={(e) => setChangePassword({ ...changePassword, password: e.target.value })}
                            minLength={8}
                          />
                          <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}>
                            <span className={togglePassword ? '' : 'show'}></span>
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup className="position-relative">
                        <Label className="col-form-label">Confirm New Password</Label>
                        <div className="position-relative">
                          <Input
                            className="form-control"
                            required
                            placeholder="*************"
                            type={toggleChangePassword ? 'text' : 'password'}
                            value={changePassword.confirm_password}
                            onChange={(e) => setChangePassword({ ...changePassword, confirm_password: e.target.value })}
                            minLength={8}
                          />
                          <div className="show-hide" onClick={() => setToggleChangePassword(!toggleChangePassword)}>
                            <span className={toggleChangePassword ? '' : 'show'}></span>
                          </div>
                        </div>
                      </FormGroup>
                      
                      <FormGroup>
                        <button className="btn btn-primary w-100" disabled={loading}>
                          {loading ? 'Updating...' : 'Update Password'}
                        </button>
                      </FormGroup>
                      <P attrPara={{ className: 'mb-0 text-center' }}>
                        Go to Signin?
                        <Link className="ms-2" to="/">
                          Signin
                        </Link>
                      </P>
                    </Form>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <ToastContainer />
    </Fragment>
  );
};

export default UnlockUser;
