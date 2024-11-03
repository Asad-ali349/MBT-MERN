import React, { Fragment, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { H5 } from "../../../../../AbstractElements";
import { CardHeader, CardFooter } from "reactstrap";
import { Data } from "./Data";
import * as yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../../../../../Redux/Slices/productSlice";
import Select from "react-select";
import { OnsiteOrdersActions, UpdateOrderStatus } from "../../../../../Redux/Slices/OnsiteOrderSlice";
import { useNavigate, useParams } from "react-router";
import { IoReceiptOutline } from "react-icons/io5";
import { MdHourglassTop } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
const BasicFormControlClass = () => {
  const { products } = useSelector((state) => state.products);
  const { is_Service, status } = useSelector((state) => state.OnsiteOrders);
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const validationSchema = yup.object({
    name: yup.object().required(),
    quantity: yup.number().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      quantity: 1,
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      const product = {
        ...products.find((product) => {
          return product._id === values.name.value;
        }),
      };

      if (product) {
        product.quantity = Number(values.quantity); // Ensure quantity exists
        product.totalPrice = product.price * product.quantity;
        dispatch(OnsiteOrdersActions.addProduct(product));
        formik.resetForm();
      } else {
        console.error("Product not found.");
      }
    },
  });
  const transformedProducts = products.filter(product=> product.status==="available").map((product) => {
    return {
      value: product._id,
      label: product.name,
    };
  });
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  const updateStatus =(status,orderId)=>{
    dispatch(UpdateOrderStatus({orderId,data:{status}}))
  }
  return (
    <Fragment>
      <Card>
        <CardHeader
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <H5>{orderId ? "Update" : "Add"} Order</H5>
          {orderId && (
            <div>
              {
                status==='pending'?(
                  <span
                    style={{ fontSize: "1rem", fontWeight: 500, color: 'green', cursor:'pointer', marginInline:'20px' }}
                    onClick={() => updateStatus('completed',orderId)}
                  >
                    <FaRegCheckCircle /> Marks as completed
                  </span>

                ):(
                  <span
                    style={{ fontSize: "1rem", fontWeight: 500, color: 'red', cursor:'pointer', marginInline:'20px' }}
                    onClick={() => updateStatus('pending',orderId)}
                  >
                    <MdHourglassTop /> Marks as pending
                  </span>
                )
              }
              <span
                style={{ fontSize: "1rem", fontWeight: 500, color: "red", cursor:'pointer',marginInline:'20px' }}
                onClick={() => Navigate(`/receipt/${orderId}`)}
              >
                <IoReceiptOutline /> View Receipt
              </span>
            </div>
          )}
        </CardHeader>
        <Form
          className="form theme-form"
          onSubmit={formik.handleSubmit}
          method="post"
        >
          <CardBody>
            <div
              className="d-flex"
              style={{ marginTop: "-20px", marginBottom: "30px" }}
            >
              <div
                className="mx-1"
                onClick={() => dispatch(OnsiteOrdersActions.updateIsService())}
                style={{ cursor: "pointer" }}
              >
                <input
                  type="radio"
                  name="is_parcel"
                  id=""
                  checked={is_Service === false}
                />{" "}
                Parcel
              </div>
              <div
                className="mx-1 cursor-pointer"
                onClick={() => dispatch(OnsiteOrdersActions.updateIsService())}
                style={{ cursor: "pointer" }}
              >
                <input
                  type="radio"
                  name="is_parcel"
                  id=""
                  checked={is_Service}
                />{" "}
                Service
              </div>
            </div>
            <Row className="mb-3">
              {Data.map((items, index) => (
                <Col md={items.name === "description" ? 12 : 4} key={index}>
                  <FormGroup>
                    <Label htmlFor="exampleFormControlInput1">
                      {items.title}
                    </Label>
                    {items.type === "file" ? (
                      <>
                        <Input
                          className="form-control"
                          id="fileInput"
                          name={items.name}
                          type={items.type}
                          onChange={(e) =>
                            formik.setFieldValue(
                              items.name,
                              e.currentTarget.files[0]
                            )
                          }
                        />
                      </>
                    ) : items.type === "select" ? (
                      <Select
                        name={items.name}
                        value={formik.values[items.name]}
                        onBlur={formik.handleBlur}
                        onChange={(selectedOption) =>
                          formik.setFieldValue(items.name, selectedOption)
                        }
                        options={transformedProducts}
                        className="js-example-basic-single"
                      />
                    ) : items.name === "description" ? (
                      <textarea
                        name="description"
                        className="form-control"
                        rows="5"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      >
                        {formik.values[items.name]}
                      </textarea>
                    ) : (
                      <Input
                        className="form-control"
                        name={items.name}
                        type={items.type}
                        placeholder={items.placeholder}
                        value={formik.values[items.name]}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        style={{ height: "40px" }}
                      />
                    )}
                    <small style={{ color: "red" }}>
                      {" "}
                      {formik.touched[items.name] && formik.errors[items.name]}
                    </small>
                  </FormGroup>
                </Col>
              ))}
            </Row>
          </CardBody>
          <CardFooter className="text-end">
            <button className="btn btn-primary mx-1" type="submit">
              {"Add"}
            </button>
            <button
              className="btn btn-primary mx-1"
              type="button"
              onClick={() => formik.resetForm()}
            >
              Cancel
            </button>
          </CardFooter>
        </Form>
      </Card>
    </Fragment>
  );
};

export default BasicFormControlClass;
