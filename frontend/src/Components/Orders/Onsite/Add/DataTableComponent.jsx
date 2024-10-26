import React, { Fragment, useEffect} from "react";
import DataTable from "react-data-table-component";
import { tableColumns } from "./Defaultdata";
import { useSelector, useDispatch } from "react-redux";
import {  Col, Row, Spinner } from "reactstrap";
import { MdDelete } from "react-icons/md";
import { CreateOnsiteOrder, GetSingleOnsiteOrder, OnsiteOrdersActions, UpdateSingleOnsiteOrder } from "../../../../Redux/Slices/OnsiteOrderSlice";
import { useParams } from "react-router";
import Logo from "../../../../assets/Logo/logo.png";
const DataTableComponent = () => {
  const { OnsiteOrderloading, products, totalPrice,gst,grandTotal,discount,payment_method,gst_percentage,customer, is_Service } = useSelector(
    (state) => state.OnsiteOrders
  );
  const {orderId}=useParams()
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
    let data={products,totalPrice:Number(totalPrice),discount:Number(discount),gst:Number(gst),grandTotal:Number(grandTotal),customer,orderType:"onsite",paymentMethod:payment_method,is_Service}
    if(orderId){
      dispatch(UpdateSingleOnsiteOrder({orderId,data}));
    }else{
      dispatch(CreateOnsiteOrder(data)).then((response)=>{
        if(response.type==="CreateOnsiteOrder/fulfilled"){
          handlePrint(response.payload.order,Logo)
        }
      });
    }
  }
  const handlePrint = ({
    products,
    totalPrice,
    gst,
    grandTotal,
    discount,
    customer,
    orderNumber,
    is_Service,
    payment_method,
     // Assuming this is a URL string for the logo
  },Logo) => {
    const rows = products.map((product, index) => ({
      id: index + 1,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      totalPrice: product.totalPrice,
    }));
    
    const columns = ["Item Name", "Rate", "Qty", "Amount"];
    const printWindow = window.open("", "", "width=302");
  
    // Create rows and columns for table
    const tableHead = columns.map((column) => `<th>${column}</th>`).join("");
    const tableBody = rows.map((item) => `
      <tr>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        <td>${item.totalPrice}</td>
      </tr>`).join("");
  
    // Write the HTML content into the new window
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Preview</title>
          <style>
            .receipt-header h1 {
              color: red;
              font-size: 60px;
            }
            .receipt-header .receipt-info span {
              display: block;
              margin-top: 5px;
            }
            .receipt-header .receipt-info .receipt-detail .orderNumber {
              color: black;
              display: inline;
              font-weight: 800;
              font-size: 20px;
            }
            .receipt-body {
              margin-top: 20px;
              border-bottom:1px solid black;
            }
            .receipt-body table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            .receipt-body table th,
            .receipt-body table td {
              padding: 5px 5px;
              text-align: left;
            }
            thead {
              border: 1px solid black !important;
            }
            .receipt-body table th {
              color: black;
              font-weight: 600;
            }
            .receipt-footer {
              margin-top: 10px;
              position: relative;
            }
            .receipt-footer div {
              display: flex;
              justify-content: flex-end;
            }
            .receipt-footer div table td {
              padding: 5px;
              font-size: 16px;
            }
            .receipt-footer div table .grandTotal td {
              font-size: 20px !important;
              font-weight: 700;
            }
            .ServiceType {
              font-size: 26px;
              margin-bottom: 10px;
              margin-top: 20px;
            }
            .LogoImage {
              width: 150px;
              filter: grayscale(100%);
            }
            .user-info {
              display: flex;
              justify-content: space-between;
              font-size: 14px;
            }
            .customerInfo {
              margin-top: 5px;
            }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="receipt-header">
              <div class="receipt-info" style="text-align:center;">
                <img src="${Logo}" alt="Logo" class="LogoImage" />
                <span><b>Address:</b> Main Pasroor Road, Opposite Govt College Boys, Satelite Town, Gujranwala</span>
                <span><b>Phone #</b> 03217451009, 03200289000</span>
              </div>
              <div class="ServiceType">
                <span><b>${is_Service ? "Dine In" : "Parcel"}</b></span>
              </div>
              <div class="user-info">
                <div class="receipt-detail">
                  <span class="OrderNumberContainer">
                    <b>Order No:</b> <span class="orderNumber">${orderNumber}</span>
                  </span>
                  <span><b>Date:</b> 12-10-2024</span>
                </div>
                ${customer?.name ? `
                <div class="customerInfo">
                  <span><b>Name:</b> ${customer.name}</span>
                  <span><b>Phone:</b> ${customer.phone}</span>
                </div>` : ""}
              </div>
            </div>
            <div class="receipt-body">
              <table>
                <thead>
                  <tr>${tableHead}</tr>
                </thead>
                <tbody>
                  ${tableBody}
                </tbody>
              </table>
            </div>
            <div class="receipt-footer">
              <div>
                <table>
                  <tr><td class="heading">Sub-Total:</td><td>${totalPrice}</td></tr>
                  <tr><td class="heading">Discount:</td><td>${discount}</td></tr>
                  <tr><td class="heading">Payment:</td><td>${payment_method}</td></tr>
                  <tr class="grandTotal"><td class="heading">Grand Total:</td><td>${grandTotal}</td></tr>
                </table>
              </div>
              <h3>Thank You For Purchasing</h3>
            </div>
          </div>
        </body>
      </html>
    `);
  
    // Close the document to trigger the loading of styles
    printWindow.document.close();
  
    // Trigger the print dialog
    printWindow.print();
  
    // Close the print window after printing
    printWindow.onafterprint = () => printWindow.close();
  };
  

  // const handlePrint = ({
  //   products,
  //   totalPrice,
  //   gst,
  //   grandTotal,
  //   discount,
  //   customer,
  //   orderNumber,
  //   is_Service,
  //   payment_method
  // }) => {
  //   const rows = products.map((product, index) => ({
  //     id: index + 1,
  //     name: product.name,
  //     price: product.price,
  //     quantity: product.quantity,
  //     totalPrice: product.totalPrice,
  //   }));
  //   const columns = ["Item Name", "Rate", "Qty", "Amount"];
  //   const printWindow = window.open("", "", "width=302");

  //   // Write the HTML content into the new window
  //   printWindow.document.write(`
  //     <html>
  //       <head>
  //         <title>Print Preview</title>
          
  //         <style>
  //           .receipt-header h1 {
  //             color: red;
  //             font-size: 60px;
  //           }
            
  //           // .receipt-header .receipt-info {
  //           //   display: flex;
  //           //   justify-content: space-between;
  //           // }
            
  //           .receipt-header .receipt-info span {
  //             display: block;
  //             margin-top: 5px;
  //           }
            
  //           .receipt-header .receipt-info .receipt-detail .orderNumber {
  //             color: black;
  //             display: inline;
  //             font-weight: 800;
  //             font-size: 20px;
  //           }
            
  //           .receipt-body .rdt_Table {
  //             border-bottom: 2px solid red;
  //           }
            
  //           .receipt-body .rdt_TableHeadRow {
  //             background-color: red !important;
  //             color: white;
  //             border-radius: 5px;
  //           }
            
  //           .receipt-footer {
  //             margin-top: 10px;
  //             position:relative;
  //           }
            
  //           .receipt-footer div {
  //             display: flex;
  //             justify-content: flex-end;
  //           }
            
  //           .receipt-footer div table td {
  //             padding: 5px;
  //             font-size: 16px;
  //           }
            
  //           .receipt-footer div table .heading {
  //             font-weight: 500;
  //           }
            
  //           .receipt-footer div table .grandTotal {
  //             color: black;
  //             border-radius: 10px;
  //           }
            
  //           .receipt-footer div table .grandTotal td {
  //             font-size: 20px !important;
  //             font-weight: 700;
  //           }
            
  //           .receipt-footer h3 {
  //             font-size: 22px;
  //             position:absolute:
  //             bottom:0px;
  //             text-align: center;
  //           }
            

  //           .receipt-body {
  //             margin-top: 20px;
  //             border-bottom:1px solid black;
  //           }

  //           .receipt-body table {
  //             width: 100%;
  //             border-collapse: collapse;
  //             margin-bottom: 20px;
  //             // border-bottom:1px solid black;
  //           }

  //           .receipt-body table th,
  //           .receipt-body table td {
  //             padding: 5px 5px;
  //             text-align: left;
  //           }
  //           thead{
  //           border:1px solid black !important;
  //           }

  //           .receipt-body table th {
  //             color:red
  //             font-weight: 600;
  //           }

  //           .receipt-body table tbody tr:nth-child(even) {
  //             background-color: #f9f9f9;
  //           }

  //           .receipt-body table tbody tr:hover {
  //             background-color: #f1f1f1;
  //           }

  //           .receipt-body .rdt_Table {
  //             border-bottom: 2px solid red;
  //           }

  //           .receipt-body .rdt_TableHeadRow {
  //             background-color: red !important;
  //             color: white;
  //             border-radius: 5px;
  //           }

  //           .receipt-body table tbody td {
  //             font-size: 16px;
  //           }

  //           .receipt-body table tfoot {
  //             font-weight: 700;
  //           }

  //           .receipt-body table tfoot td {
  //             padding: 15px;
  //             background-color: #f2f2f2;
  //           }
  //           .ServiceType{
  //             font-size: 26px;
  //             margin-bottom:10px;
  //             margin-top:20px;
  //           }
  //           .LogoImage{
  //             width: 150px;
  //             filter: grayscale(100%);
  //           }
  //           .user-info{
  //             display: flex;
  //             justify-content:space-between;
  //             font-size:14px
  //           }
  //             .customerInfo{
  //             margin-top:5px
  //             }
  //         </style>
  //       </head>
  //       <body>
  //         <div className="receipt">
  //           <div className="receipt-header">
  //             <div className="receipt-info">
  //               <div style={{textAlign:'center'}}>
  //                 <img src={${Logo}} alt="Logo" className="LogoImage" />
  //                 <span>
  //                   <b>Address:</b> Main Pasroor Road, Opposite Govt College Boys, Satelite Town,Gujranwala
  //                 </span>
  //                 <span>
  //                   <b>Phone #</b> 03217451009, 03200289000
  //                 </span>
  //               </div>
  //               <div className="ServiceType">
  //                 <span >
  //                   <b>${is_Service ? "Dine In" : "Parcel"}</b>
  //                 </span>
  //               </div>
  //               <div
  //                 className="user-info"
                  
  //               >
  //                 <div className="receipt-detail">
  //                   <span className="OrderNumberContainer">
  //                     <b>Order No:</b>{" "}
  //                     <span className="orderNumber"> ${orderNumber}</span>
  //                   </span>
  //                   <span>
  //                     <b>Date:</b> 12-10-2024
  //                   </span>
  //                 </div>
  //                 ${customer?.name && (
  //                   <div className="customerInfo">
  //                     {/* <h5>Billed To</h5> */}
  //                     <span>
  //                       <b>Name:</b> {customer?.name}
  //                     </span>
  //                     <span>
  //                       <b>Phone:</b> {customer?.phone}
  //                     </span>
  //                   </div>
  //                 )}
  //               </div>
  //             </div>
  //           </div>
  //           <div className="receipt-body">
  //             <table>
  //               <thead>
  //                 ${columns.map((column, index) => {
  //                   return <th key={index}>{column}</th>;
  //                 })}
  //               </thead>
  //               <tbody>
  //                 ${rows.map((item, index) => {
  //                   return (
  //                     <tr key={index}>
  //                       {/* <td>{item.id}</td> */}
  //                       <td>{item.name}</td>
  //                       <td>{item.price}</td>
  //                       <td>{item.quantity}</td>
  //                       <td>{item.totalPrice}</td>
  //                     </tr>
  //                   );
  //                 })}
  //               </tbody>
  //             </table>
  //           </div>
  //           <div className="receipt-footer">
  //             <div>
  //               <table>
  //                 <tr>
  //                   <td className="heading">Sub-Total:</td>
  //                   <td>${totalPrice}</td>
  //                 </tr>
  //                 {/* <tr>
  //                   <td className="heading">GST:</td>
  //                   <td>${gst}</td>
  //                 </tr> */}
  //                 <tr>
  //                   <td className="heading">Discount:</td>
  //                   <td>${discount}</td>
  //                 </tr>
  //                 <tr>
  //                   <td className="heading">payment:</td>
  //                   <td>${payment_method}</td>
  //                 </tr>
  //                 <tr className="grandTotal">
  //                   <td className="heading">Grand Total:</td>
  //                   <td>${grandTotal}</td>
  //                 </tr>
  //               </table>
  //             </div>
  //             <h3>Thank You For Purchasing</h3>
  //           </div>
  //         </div>
  //       </body>
  //     </html>
  //   `);

  //   // Close the document to trigger the loading of styles
  //   printWindow.document.close();

  //   // Trigger the print dialog
  //   printWindow.print();

  //   // Close the print window after printing
  //   printWindow.onafterprint = () => printWindow.close();
  // };
  useEffect(()=>{
    if(orderId){
      dispatch(GetSingleOnsiteOrder(orderId))
    }
    if(!orderId){
      dispatch(OnsiteOrdersActions.resetState());
    }
  },[orderId])
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

                {/* <tr>
                  <th>GST ({parseInt(gst_percentage*100)}%):</th>
                  <td className="text-center">{gst}</td>
                </tr> */}
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
