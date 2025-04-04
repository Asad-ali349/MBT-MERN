import React, { Fragment, useEffect, useRef} from "react";
import DataTable from "react-data-table-component";
import { tableColumns } from "./Defaultdata";
import { useSelector, useDispatch } from "react-redux";
import {  Col, Row, Spinner } from "reactstrap";
import { MdDelete } from "react-icons/md";
import { CreateOnsiteOrder, GetSingleOnsiteOrder, OnsiteOrdersActions, UpdateSingleOnsiteOrder } from "../../../../Redux/Slices/OnsiteOrderSlice";
import { useParams } from "react-router";
import Logo from "../../../../assets/Logo/logo.svg";
import { toast } from "react-toastify";
const DataTableComponent = () => {
  const { OnsiteOrderloading, products, totalPrice,gst,grandTotal,discount,payment_method,customer, is_Service,status } = useSelector(
    (state) => state.OnsiteOrders
  );
  const {orderId}=useParams()
  const dispatch = useDispatch();
  const LogoRef=useRef();

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
        placeholder={item.quantity}
        type ='number'
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
    if(products.length<=0){
      toast.error("Add Products to Proceed")
      return
    }
    let data={products,totalPrice:Number(totalPrice),discount:Number(discount),gst:Number(gst),grandTotal:Number(grandTotal),customer,orderType:"onsite",paymentMethod:payment_method,is_Service,status}
    
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
    paymentMethod,
  }, Logo) => {
    const rows = products.map((product, index) => ({
      id: index + 1,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      totalPrice: product.totalPrice,
    }));
   
    const logo = LogoRef.current;
    const logoSrc = logo.src

    const tableHead = `
      <th class="ItemName">Item Description</th>
      <th>Qty</th>
      <th>Rate</th>
      <th>Amount</th>
    `;
    const tableBody = rows.map((item) => `
      <tr>
        <td class="ItemName">${item.name}</td>
        <td class="qty">${item.quantity}</td>
        <td class="qty">${item.price}</td>
        <td class="qty">${item.totalPrice}</td>
      </tr>`).join("");
  
    const receiptHtml = `
      <html>
        <head>
          <title>Print Preview</title>
          <style>
            /* Add your CSS here */
            .receipt-header h1 { color: red; font-size: 60px; }
            .qty { text-align: center; width:16% }
            .receipt-header .receipt-info span { display: block; }
            .ItemName { text-align: left; font-size:18px; white-space: nowrap; }
            .orderNumber { color: black; display: inline; font-weight: 800; font-size: 20px; }
            .receipt-body { border-bottom:1px solid black; }
            .receipt-body table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .receipt-body table th, .receipt-body table td { padding: 5px 5px; }
            thead { border-bottom: 1px solid black !important; border-top: 1px solid black !important; }
            .receipt-body table th { color: black; font-weight: 600; }
            .receipt-footer { margin-top: 10px; position: relative; }
            .receipt-footer div { display: flex; justify-content: flex-end; }
            .receipt-footer div table td { padding: 5px; font-size: 16px; }
            .receipt-footer div table .grandTotal td { font-size: 20px !important; font-weight: 700; }
            .ServiceType { font-size: 26px; margin-bottom: 10px; margin-top: 20px; }
            .LogoImage { width: 150px; filter: grayscale(100%); margin-top:-20px }
            .user-info { display: flex; justify-content: space-between; font-size: 14px; }
            .customerInfo { margin-top: 5px; }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="receipt-header">
              <div class="receipt-info" style="text-align:center;">
                <img src="${logoSrc}" class="LogoImage" alt="Logo">
                <span><b>Address:</b> Main Pasroor Road, Opposite Govt College Boys, Satelite Town, Gujranwala</span>
                <span><b>Phone #</b> 03217451009, 03200289000</span>
              </div>
              <div class="ServiceType">
                <span><b>${is_Service ? "Dine In" : "Parcel"}</b></span>
              </div>
              <div class="user-info">
                <div class="receipt-detail">
                  <p class="OrderNumberContainer">
                    <b>Order No:</b> <span class="orderNumber">${orderNumber}</span>
                  </p>
                  <p><b>Date:</b> 12-10-2024</p>
                </div>
                ${customer?.name ? `
                <div class="customerInfo">
                  <p><b>Name:</b> ${customer.name}</p>
                  <p><b>Phone:</b> ${customer.phone}</p>
                </div>` : ""}
                ${customer?.table_number ? `
                <div class="customerInfo">
                  <p><b>Table No:</b> ${customer.table_number}</p>
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
                  <tr><td class="heading">Payment:</td><td>${paymentMethod}</td></tr>
                  <tr class="grandTotal"><td class="heading">Grand Total:</td><td>${grandTotal}</td></tr>
                </table>
              </div>
              <center><h3>Thank You For Purchasing</h3></center>
            </div>
          </div>
        </body>
      </html>
    `;


  
    // Create an iframe
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none";
    document.body.appendChild(iframe);
  
    // Write the HTML content to the iframe
    iframe.contentDocument.open();
    iframe.contentDocument.write(receiptHtml);
    iframe.contentDocument.close();
  
    // Trigger print within the iframe
    iframe.contentWindow.print();
  
    // Remove the iframe after printing
    iframe.onafterprint = () => {
      document.body.removeChild(iframe);
    };
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
  //   paymentMethod,
  //    // Assuming this is a URL string for the logo
  // },Logo) => {
  //   const rows = products.map((product, index) => ({
  //     id: index + 1,
  //     name: product.name,
  //     price: product.price,
  //     quantity: product.quantity,
  //     totalPrice: product.totalPrice,
  //   }));

  //   const printWindow = window.open("", "", "width=302");

  //   // Create rows and columns for table
  //   const tableHead = `
  //   <th class="ItemName">Item Description</th>
  //   <th>Qty</th>
  //   <th>Rate</th>
  //   <th>Amount</th>
  //   `;
  //   const tableBody = rows.map((item) => `
  //     <tr>
  //       <td class="ItemName">${item.name}</td>
  //       <td class="qty">${item.quantity}</td>
  //       <td class="qty">${item.price}</td>
  //       <td class="qty">${item.totalPrice}</td>
  //     </tr>`).join("");
  
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
  //             .qty{
  //               text-align: center;
  //               width:16%
  //             }
  //           .receipt-header .receipt-info span {
  //             display: block;
  //           }
  //             .ItemName{
  //             text-align: left;
  //             font-size:18px;
  //             white-space: nowrap; /* Prevent wrapping */
  //             // width: 40%; /* Flexibly allocate width */
  //             }
  //             .orderNumber{
  //             color: black;
  //             display: inline;
  //             font-weight: 800;
  //             font-size: 20px;
  //             }
          
  //           .receipt-body {
  //             // margin-top: 20px;
  //             border-bottom:1px solid black;
  //           }
  //           .receipt-body table {
  //             width: 100%;
  //             border-collapse: collapse;
  //             margin-bottom: 20px;
  //           }
  //           .receipt-body table th,
  //           .receipt-body table td {
  //             padding: 5px 5px;
  //           }
  //           thead {
  //             border-bottom: 1px solid black !important;
  //             border-top: 1px solid black !important;
  //           }
  //           .receipt-body table th {
  //             color: black;
  //             font-weight: 600;
  //           }
  //           .receipt-footer {
  //             margin-top: 10px;
  //             position: relative;
  //           }
  //           .receipt-footer div {
  //             display: flex;
  //             justify-content: flex-end;
  //           }
  //           .receipt-footer div table td {
  //             padding: 5px;
  //             font-size: 16px;
  //           }
  //           .receipt-footer div table .grandTotal td {
  //             font-size: 20px !important;
  //             font-weight: 700;
  //           }
  //           .ServiceType {
  //             font-size: 26px;
  //             margin-bottom: 10px;
  //             margin-top: 20px;
  //           }
  //           .LogoImage {
  //             width: 150px;
  //             filter: grayscale(100%);
  //             margin-top:-20px
  //           }
  //           .user-info {
  //             display: flex;
  //             justify-content: space-between;
  //             font-size: 14px;
  //           }
  //           .customerInfo {
  //             margin-top: 5px;
  //           }
             
  //         </style>
  //       </head>
  //       <body>
  //         <div class="receipt">
  //           <div class="receipt-header">
  //             <div class="receipt-info" style="text-align:center;">
  //               <img src="${Logo}" alt="Logo" class="LogoImage" />
  //               <span><b>Address:</b> Main Pasroor Road, Opposite Govt College Boys, Satelite Town, Gujranwala</span>
  //               <span><b>Phone #</b> 03217451009, 03200289000</span>
  //             </div>
  //             <div class="ServiceType">
  //               <span><b>${is_Service ? "Dine In" : "Parcel"}</b></span>
  //             </div>
  //             <div class="user-info">
  //               <div class="receipt-detail">
  //                 <p class="OrderNumberContainer">
  //                   <b>Order No:</b> <span class="orderNumber">${orderNumber}</span>
  //                 </p>
  //                 <p><b>Date:</b> 12-10-2024</p>
  //               </div>
  //               ${customer?.name ? `
  //               <div class="customerInfo">
  //                 <p><b>Name:</b> ${customer.name}</p>
  //                 <p><b>Phone:</b> ${customer.phone}</p>
  //               </div>` : ""}
  //             </div>
  //           </div>
  //           <div class="receipt-body">
  //             <table>
  //               <thead>
  //                 <tr>${tableHead}</tr>
  //               </thead>
  //               <tbody>
  //                 ${tableBody}
  //               </tbody>
  //             </table>
  //           </div>
  //           <div class="receipt-footer">
  //             <div>
  //               <table>
  //                 <tr><td class="heading">Sub-Total:</td><td>${totalPrice}</td></tr>
  //                 <tr><td class="heading">Discount:</td><td>${discount}</td></tr>
  //                 <tr><td class="heading">Payment:</td><td>${paymentMethod}</td></tr>
  //                 <tr class="grandTotal"><td class="heading">Grand Total:</td><td>${grandTotal}</td></tr>
  //               </table>
  //             </div>
  //             <center><h3>Thank You For Purchasing</h3></center>
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
  //   printWindow.onafterprint = () => {
  //     printWindow.close()
  //   };
   
    
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
            <Col xs={12} md={12}>
              <img src={Logo} alt="Logo" class="LogoImage" style={{display:'none'}} ref={LogoRef}/>
            </Col>
            <Col md={4}>
                
                <div className="form-group mt-2">
                  <label htmlFor="customer_name">Table No:</label>
                  <input type="number" className="form-control" name="table_number" placeholder="Enter Table No." onChange={(e)=>dispatch(OnsiteOrdersActions.updateCustomer({table_number:e.target.value}))} value={customer?.table_number}/>
                </div>
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
                      <div className='mx-1' onClick={()=>dispatch(OnsiteOrdersActions.updatePaymentMethod())} style={{cursor:'pointer'}}><input type="radio" name="payment_method" checked={payment_method==="cash"}/> Cash</div>
                      <div className='mx-1' onClick={()=>dispatch(OnsiteOrdersActions.updatePaymentMethod())} style={{cursor:'pointer'}}><input type="radio" name="payment_method" checked={payment_method==="online"}/> Online</div>
                    </div> 
                  </td>
                </tr>
                <tr>
                  <th>Order status</th>
                  <td>
                    <div className="d-flex justify-content-between">
                      <div className='mx-1' onClick={()=>dispatch(OnsiteOrdersActions.updateOrderStatus())} style={{cursor:'pointer'}}><input type="radio" name="status" checked={status==="pending"}/> Pending</div>
                      <div className='mx-1' onClick={()=>dispatch(OnsiteOrdersActions.updateOrderStatus())} style={{cursor:'pointer'}}><input type="radio" name="status" checked={status==="completed"}/> Completed</div>
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

          <button 
            className="btn btn-primary float-end mt-4" 
            onClick={handleSubmit}  
            disabled={OnsiteOrderloading}
          >
            {OnsiteOrderloading ? (
              orderId ? "Updating Order..." : "Placing Order..."
            ) : (
              orderId ? "Update Order" : "Place Order"
            )}
          </button>
        </>
      )}

     
    </Fragment>
  );
};
export default DataTableComponent;
