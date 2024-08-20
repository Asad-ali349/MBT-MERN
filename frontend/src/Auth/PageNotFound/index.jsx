import React, { Fragment } from "react";
import { Col, Container,Row } from "reactstrap";
import Lottie from "lottie-react";
import { ToastContainer, toast } from "react-toastify";
import NotFound from '../../assets/Lotties/notfound.json'

const PageNotFound = ({ selected }) => {
  

  return (
    <Fragment>
      <Container fluid={true} className="p-0 login-page">
        <Row>
          <Col xs="12" >
            <div style={{display:'flex',justifyContent:"center",alignItems:'center',height:'100vh'}}>
                <div style={{width:'400px'}}>
                    <Lottie animationData={NotFound} loop={true}  style={{width:'100%'}}/>
                    <h3 className="text-center">Page Not Found</h3>
                </div>
            </div>
            
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};

export default PageNotFound;
