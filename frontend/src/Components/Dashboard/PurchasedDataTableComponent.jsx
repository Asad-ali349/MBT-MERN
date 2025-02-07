import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from "reactstrap";
import { fetchAllPurchases } from "../../Redux/Slices/purchaseSlice";
import { formateDate } from "../../utils/global";
import { purchaseProducts } from "./Defaultdata";

const PurchasedDataTableComponent = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };
  const { loading, purchases } = useSelector((state) => state.purchases);
  const purchaseRow = purchases.map((item, index) => ({
    id: index,
    Name: item.product.name,
    Quantity: item.quantity,
    Unit: item.unit,
    Price: item.purchase_price,
    Date: formateDate(item.createdAt),
  }));
  useEffect(() => {
    dispatch(fetchAllPurchases());
  }, []);
  return (
    <Fragment>
        <div>
            <button className="btn btn-primary float-end" onClick={openModal}>Filter By Date</button>
        </div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner animation="border" size="sm" />
        </div>
      ) : (
        <>
          <DataTable
            data={purchaseRow}
            columns={purchaseProducts}
            striped={true}
            center={true}
            pagination
          />
          <FilterModal showModal={showModal} closeModal={closeModal}/>
        </>
      )}
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
      dispatch(fetchAllPurchases(date))
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
export default PurchasedDataTableComponent;
