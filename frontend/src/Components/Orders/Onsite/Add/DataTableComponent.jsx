import React, { Fragment} from "react";
import DataTable from "react-data-table-component";
import { tableColumns } from "./Defaultdata";
import { useSelector, useDispatch } from "react-redux";
import {  Col, Row, Spinner } from "reactstrap";
import { MdDelete } from "react-icons/md";
import { CreateOnsiteOrder, OnsiteOrdersActions } from "../../../../Redux/Slices/OnsiteOrderSlice";

const DataTableComponent = () => {
  const { OnsiteOrderloading, products, totalPrice,gst,grandTotal,discount,payment_method,gst_percentage,customer } = useSelector(
    (state) => state.OnsiteOrders
  );

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Product from Order?"
    );
    if (confirmDelete) {
      dispatch(OnsiteOrdersActions.removeProduct(id));
      // Additional logic after deletion if needed
    }
  };
  const handleChangeQuantity = (id, value) => {
    dispatch(OnsiteOrdersActions.changeQuantity({ id, value }));
  };
  const OrderRow = products.map((item, index) => ({
    id: index,
    Name: item.name,
    Quantity: (
      <input
        className="form-control w-50"
        value={item.quantity}
        onChange={(e) => {
          handleChangeQuantity(item._id, e.target.value);
        }}
      />
    ),
    Price: item.price,
    TotalPrice: item.totalPrice,
    Action: (
      <>
        <MdDelete
          style={{ fontSize: "20px", color: "red", cursor: "pointer" }}
          onClick={() => handleDelete(item._id)}
        />
      </>
    ),
  }));
  const handleSubmit=()=>{
    console.log("===================> Before Placing Order:",{products,totalPrice:Number(totalPrice),discount:Number(discount),gst:Number(gst),grandTotal:Number(grandTotal),customer,orderType:"onsite",payment_method})
    dispatch(CreateOnsiteOrder({products,totalPrice:Number(totalPrice),discount:Number(discount),gst:Number(gst),grandTotal:Number(grandTotal),customer,orderType:"onsite",paymentMethod:payment_method}));
  }

  return (
    <Fragment>
      {OnsiteOrderloading ? (
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
            data={OrderRow}
            columns={tableColumns}
            striped={true}
            center={true}
            pagination
          />
          <Row className="justify-content-between">
            <Col md={4}>
              
                <div className="form-group mt-2">
                  <label htmlFor="customer_name">Customer Name</label>
                  <input type="text" className="form-control" name="customer_name" placeholder="Enter Customer Name" onChange={(e)=>dispatch(OnsiteOrdersActions.updateCustomer({name:e.target.value}))} value={customer?.name}/>
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="customer_phone">Customer Phone</label>
                  <input type="phone" className="form-control" name="customer_phone" placeholder="Enter Phone Number" onChange={(e)=>dispatch(OnsiteOrdersActions.updateCustomer({phone:e.target.value}))} value={customer?.phone}/>
                </div>
            </Col>
            <Col md={4} sm={12}>
              <table className="table table-responsive">
                <tr>
                  <th>Total:</th>
                  <td className="text-center">{totalPrice}</td>
                </tr>
                <tr>
                  <th>Discount (Price): </th>
                  <td>
                    <input
                      type="number"
                      min={1}
                      className="form-control w-50 mx-auto"
                      placeholder="0"
                      style={{textAlign:'center'}}
                      onChange={(e)=>e.target.value?
                          dispatch(OnsiteOrdersActions.handleChangeDiscount(parseInt(e.target.value))):
                          dispatch(OnsiteOrdersActions.handleChangeDiscount(0))
                        }
                    />
                  </td>
                </tr>
                <tr>
                  <th>Payment Method</th>
                  <td>
                    <div className="d-flex justify-content-between">
                      <div className='mx-1' onClick={()=>dispatch(OnsiteOrdersActions.updatePaymentMethod())} style={{cursor:'pointer'}}><input type="radio" name="payment_method" checked={payment_method=="cash"}/> Cash</div>
                      <div className='mx-1' onClick={()=>dispatch(OnsiteOrdersActions.updatePaymentMethod())} style={{cursor:'pointer'}}><input type="radio" name="payment_method" id="" checked={payment_method=="online"}/> Online</div>
                    </div> 

                  </td>
                </tr>

                <tr>
                  <th>GST ({parseInt(gst_percentage*100)}%):</th>
                  <td className="text-center">{gst}</td>
                </tr>
                <tr>
                  <th>Grand Total:</th>
                  <td className="text-center">{grandTotal}</td>
                </tr>
              </table>
            </Col>
          </Row>
          <button className="btn btn-primary float-end mt-4" onClick={handleSubmit}  disabled={OnsiteOrderloading}>
            {OnsiteOrderloading?"Placing Order....":"Confirm Order"}
          </button>
        </>
      )}
    </Fragment>
  );
};
export default DataTableComponent;
