import React from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Col, Row } from 'reactstrap';


export default function Index({modalData,showModal,closeModal}) {
   

  return (
    <div>
      <Modal isOpen={showModal} toggle={closeModal} centered>
        <ModalHeader toggle={closeModal}>Product Detail</ModalHeader>
        <ModalBody>
          <Row>
            <Col md={12}>{modalData.image && modalData.image.url?<img src={modalData.image.url} width="100%" height="300px" alt="Product_Image"/>:''}</Col>
            <Col md={12} className="mt-4">
                <h5>Name: {modalData?.name}</h5>
                <span>Category: {modalData?.category_id?.name}</span>
                <p>Price: {modalData?.price}</p>
                <p>Price: {modalData?.discount}</p>
                <p>Description: {modalData?.description}</p>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
}
