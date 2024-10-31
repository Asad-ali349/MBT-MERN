import React, { Fragment, useState } from 'react';
import { Container, Row, Col, Card, CardBody, Modal, ModalHeader, ModalBody, FormGroup, Input, Label, ModalFooter } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import HeaderCard from '../../Common/Component/HeaderCard';
import DataTableComponent from './DataTableComponent';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { GetOnsiteOrder } from '../../../Redux/Slices/OnsiteOrderSlice';

const DataTables = () => {
  const navigate=useNavigate();
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <Fragment>
    <Breadcrumbs mainTitle="Onsite Orders" parent="Onsite Orders"  />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="View Orders" mainClasses={'d-flex justify-content-between'} button={{text:'Filter',onClick:openModal}}/>
              <CardBody>
                <button className='btn btn-primary float-end' onClick={()=>navigate('/onsite_orders/add')}>Create Order</button>
                <DataTableComponent />
              </CardBody>
            </Card>
          </Col>
          <FilterModal showModal={showModal} closeModal={closeModal}/>
        </Row>
      </Container>
    </Fragment>
  );
};

const FilterModal = ({ showModal, closeModal}) => {
  const dispatch= useDispatch()
  const handleSubmit=(e)=>{
    e.preventDefault();
    // Extract form values using FormData
    const formData = new FormData(e.target);
    const date = formData.get('date');
    dispatch(GetOnsiteOrder({date}))
    closeModal()
   
  }
 
  return (
    <Modal isOpen={showModal} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>Filter Orders</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for='name'>Enter date</Label>
                <Input
                  type='date'
                  name='date'
                  id='date'
                  placeholder='Enter Date'

                />
              </FormGroup>
            </Col>
          </Row>
          
          <div>
          <ModalFooter>
              <button className='btn btn-primary' type='submit' >
                Submit
              </button>
              <button className='btn btn-primary' type='button' onClick={closeModal}>
                Cancel
              </button>
          </ModalFooter>
          </div>
        </form>
      </ModalBody>
       
    </Modal>
  );
};

export default DataTables;