import React, { Fragment, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { Breadcrumbs } from "../../AbstractElements";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import "./styless.css";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleOnsiteOrder } from "../../Redux/Slices/OnsiteOrderSlice";
import Logo from "../../assets/Logo/logo.png";
const columns = ["Item Name", "Rate", "Qty", "Amount"];

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
    payment_method
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
              .qty{
                text-align: center;
                width:16%
              }
            .receipt-header .receipt-info span {
              display: block;
            }
              .ItemName{
              text-align: left;
              font-size:18px;
              white-space: nowrap; /* Prevent wrapping */
              // width: 40%; /* Flexibly allocate width */
              }
              .orderNumber{
              color: black;
              display: inline !important;
              font-weight: 800;
              font-size: 20px;
              }
          
            .receipt-body {
              margin-top: 10px;
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
            }
            thead {
              border-bottom: 1px solid black !important;
              border-top: 1px solid black !important;
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
              margin-top:-20px
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
                      <div style={{textAlign:'center'}}>
                        <img src={Logo} alt="Logo" className="LogoImage" />
                        <span>
                          <b>Address:</b> Main Pasroor Road, Opposite Govt College Boys, Satelite Town,Gujranwala
                        </span>
                        <span>
                          <b>Phone #</b> 03217451009, 03200289000
                        </span>
                      </div>
                      <div className="ServiceType">
                        <span >
                          <b>{is_Service ? "Dine In" : "Parcel"}</b>
                        </span>
                      </div>
                      <div
                        className="user-info"
                        
                      >
                        <div className="receipt-detail">
                          <span className="OrderNumberContainer">
                            <b>Order No:</b>{" "}
                            <span className="orderNumber"> {orderNumber}</span>
                          </span>
                          <span>
                            <b>Date:</b> 12-10-2024
                          </span>
                        </div>
                        {customer?.name && (
                          <div className="customerInfo">
                            {/* <h5>Billed To</h5> */}
                            <span>
                              <b>Name:</b> {customer?.name}
                            </span>
                            <span>
                              <b>Phone:</b> {customer?.phone}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="receipt-body">
                    <table>
                      <thead>
                        <th class="ItemName">Item Description</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Amount</th>
                      </thead>
                      <tbody>
                        {rows.map((item, index) => {
                          return (
                            <tr key={index}>
                              {/* <td>{item.id}</td> */}
                              <td class="ItemName">{item.name}</td>
                              <td class="qty">{item.price}</td>
                              <td class="qty">{item.quantity}</td>
                              <td class="qty">{item.totalPrice}</td>
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
                        {/* <tr>
                          <td className="heading">GST:</td>
                          <td>{gst}</td>
                        </tr> */}
                        <tr>
                          <td className="heading">Discount:</td>
                          <td>{discount}</td>
                        </tr>
                        <tr>
                          <td className="heading">payment:</td>
                          <td>{payment_method}</td>
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
