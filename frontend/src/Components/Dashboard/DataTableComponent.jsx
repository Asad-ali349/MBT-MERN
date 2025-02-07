import React, { Fragment, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { SoldProducts as tableColumns } from './Defaultdata';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'reactstrap';
import {fetchProductStatData} from '../../Redux/Slices/dashboardSlice'
import { Row, Col, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, ModalFooter } from "reactstrap";

const DataTableComponent = () => {
    const {loading,productStats}=useSelector(state=>state.dashboard);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [filterDate,setFilterDate]=useState('')
    const openModal = () => {
        setShowModal(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
    };
    const categoriesRow = productStats.map((item, index) => ({
        id: index,
        productName: item.productName,
        quantity: item.totalSold,
        revenue: item.soldAmount
    }));

    useEffect(()=>{
        dispatch(fetchProductStatData({date:filterDate}))
        return ()=>{}
    },[filterDate])

    return (
        <Fragment>
            <div>
                <button className="btn btn-primary float-end" onClick={openModal}>Filter By Date</button>
            </div>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner animation="border" size="sm" />
                </div>
            ) : (
                <DataTable
                    data={categoriesRow}
                    columns={tableColumns}
                    striped={true}
                    center={true}
                    pagination
                    />
            )} 
            
            <FilterModal showModal={showModal} closeModal={closeModal} filterDate={filterDate} setFilterDate={setFilterDate}/>
        </Fragment>
    )
}


const FilterModal = ({ showModal, closeModal, setFilterDate}) => {

    const handleSubmit=(e)=>{
        e.preventDefault();
        // Extract form values using FormData
        const formData = new FormData(e.target);
        const date = formData.get('date');
        setFilterDate(date)
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
export default DataTableComponent