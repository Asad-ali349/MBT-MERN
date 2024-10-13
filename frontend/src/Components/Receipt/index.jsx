import React, { Fragment, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { Breadcrumbs } from "../../AbstractElements";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import "./styless.css";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleOnsiteOrder } from "../../Redux/Slices/OnsiteOrderSlice";
import Logo from "../../assets/Logo/logo.png";
const columns = [ "Item Name", "Unit Price", "Quantiy", "Total Price"];

export default function Receipt() {
  const {
    OnsiteOrderloading,
    products,
    totalPrice,
    gst,
    grandTotal,
    discount,
    customer,
    orderNumber,
    is_Service,
  } = useSelector((state) => state.OnsiteOrders);
  const { orderId } = useParams();
  const printRef = useRef();
  const dispatch = useDispatch();

  const rows = products.map((product, index) => ({
    id: index + 1,
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    totalPrice: product.totalPrice,
  }));

  const handlePrint = () => {
    const printContent = printRef.current;
    const printWindow = window.open("", "", "width=302");

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
            
            // .receipt-header .receipt-info {
            //   display: flex;
            //   justify-content: space-between;
            // }
            
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
              margin-top: 50px;
            }
            
            .receipt-body .rdt_Table {
              border-bottom: 2px solid red;
            }
            
            .receipt-body .rdt_TableHeadRow {
              background-color: red !important;
              color: white;
              border-radius: 5px;
            }
            
            .receipt-footer {
              margin-top: 35px;
              position:relative;
            }
            
            .receipt-footer div {
              display: flex;
              justify-content: flex-end;
            }
            
            .receipt-footer div table td {
              padding: 10px 25px;
              font-size: 16px;
            }
            
            .receipt-footer div table .heading {
              font-weight: 500;
            }
            
            .receipt-footer div table .grandTotal {
              color: black;
              border-radius: 10px;
            }
            
            .receipt-footer div table .grandTotal td {
              font-size: 20px !important;
              font-weight: 700;
            }
            
            .receipt-footer h3 {
              font-size: 22px;
              position:absolute:
              bottom:0px;
              text-align: center;
            }
            

            .receipt-body {
              margin-top: 50px;
            }

            .receipt-body table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }

            .receipt-body table th,
            .receipt-body table td {
              // padding: 12px 15px;
              text-align: left;
              // border-bottom: 1px solid #ddd;
            }
            thead{
            border:1px solid black !important;
            }

            .receipt-body table th {
              color:red
              font-weight: 600;
              
            }

            .receipt-body table tbody tr:nth-child(even) {
              background-color: #f9f9f9;
            }

            .receipt-body table tbody tr:hover {
              background-color: #f1f1f1;
            }

            .receipt-body .rdt_Table {
              border-bottom: 2px solid red;
            }

            .receipt-body .rdt_TableHeadRow {
              background-color: red !important;
              color: white;
              border-radius: 5px;
            }

            .receipt-body table tbody td {
              font-size: 16px;
            }

            .receipt-body table tfoot {
              font-weight: 700;
            }

            .receipt-body table tfoot td {
              padding: 15px;
              background-color: #f2f2f2;
            }
            .ServiceType{
              font-size: 26px;
              margin-bottom:30px;
            }
            .LogoImage{
              width: 150px;
              filter: grayscale(100%);
            }
              
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
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
  useEffect(() => {
    dispatch(GetSingleOnsiteOrder(orderId));
  }, [orderId]);
  if (OnsiteOrderloading) {
    return <p>Loading...</p>;
  }
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Receipt" parent="Receipt" />

      <Container fluid={true}>
        <Row>
          <Col sm={12}></Col>
          <Col sm="12">
            <Card>
              <CardBody>
                <button
                  className="btn btn-primary float-end"
                  onClick={handlePrint}
                >
                  Print
                </button>
                <div className="receipt" ref={printRef}>
                  <div className="receipt-header">
                    <div className="receipt-info">
                      <div>
                        <img src={Logo} alt="Logo" className="LogoImage"/>
                        <span>
                          <b>Phone:</b>123456789
                        </span>
                        <span>
                          <b>Address:</b> 123, Sector 1, Lahore
                        </span>
                      </div>
                      
                        <div className="user-info" style={{display:"flex",justifyContent:`${customer.name?'space-between':'flex-start'}`}}>
                          {
                            customer?.name && (
                            <div className="customerInfo">
                              <h5>Billed To</h5>
                              <span>
                                <b>Name:</b> {customer?.name }
                              </span>
                              <span>
                                <b>Phone:</b> {customer?.phone}
                              </span>
                            </div>
                            )
                          }
                          <div className="receipt-detail">
                            <span className="ServiceType">
                              <b>{is_Service ? "Dine In" : "Parcel"}</b>
                            </span>
                            <span className="OrderNumberContainer">
                              <b>Order No:</b>{" "}
                              <span className="orderNumber">
                                {" "}
                                {orderNumber}
                              </span>
                            </span>
                            <span>
                              <b>Date:</b> 12-10-2024
                            </span>
                           
                          </div>
                          
                        </div>
                      
                    </div>
                  </div>
                  <div className="receipt-body">
                    <table>
                      <thead>
                        {columns.map((column, index) => {
                          return <th key={index}>{column}</th>;
                        })}
                      </thead>
                      <tbody>
                        {rows.map((item, index) => {
                          return (
                            <tr key={index}>
                              {/* <td>{item.id}</td> */}
                              <td>{item.name}</td>
                              <td>{item.price}</td>
                              <td>{item.quantity}</td>
                              <td>{item.totalPrice}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="receipt-footer">
                    <div>
                      <table>
                        <tr>
                          <td className="heading">Sub-Total:</td>
                          <td>{totalPrice}</td>
                        </tr>
                        <tr>
                          <td className="heading">GST:</td>
                          <td>{gst}</td>
                        </tr>
                        <tr>
                          <td className="heading">Discount:</td>
                          <td>{discount}</td>
                        </tr>
                        <tr className="grandTotal">
                          <td className="heading">Grand Total:</td>
                          <td>{grandTotal}</td>
                        </tr>
                      </table>
                    </div>
                    <h3>Thank You For Purchasing</h3>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
