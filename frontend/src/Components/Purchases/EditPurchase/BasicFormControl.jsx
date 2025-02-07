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
import { H5 } from "../../../AbstractElements";
import { CardHeader, CardFooter } from "reactstrap";
import { Data } from "./Data";
import * as yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchAllProducts, UpdateProduct } from "../../../Redux/Slices/productSlice";

const BasicFormControlClass = () => {
  const location = useLocation();
  const product = location.state.item;
  const { loading, products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    product: yup.string().required().min(3),
    quantity: yup.number().required().typeError("Quantity must be a number"),
    price: yup.number().required().typeError("Price must be a number"),
  });

  const formik = useFormik({
    initialValues: {
      ...product,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      dispatch(UpdateProduct(values));
    },
  });
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <H5>Edit Purchase</H5>
        </CardHeader>
        <Form
          className="form theme-form"
          onSubmit={formik.handleSubmit}
          method="post"
        >
          <CardBody>
            <Row className="mb-3">
              {Data.map((item, index) => (
                <Col md={item.name == "description" ? 12 : 4} key={index}>
                  <FormGroup>
                    <Label htmlFor="exampleFormControlInput1">
                      {item.title}
                    </Label>
                    {item.type == "file" ? (
                      <>
                        <Input
                          className="form-control"
                          id="fileInput"
                          name={item.name}
                          type={item.type}
                          onChange={(e) =>
                            formik.setFieldValue(
                              item.name,
                              e.currentTarget.files[0]
                            )
                          }
                        />
                      </>
                    ) : item.type === "select" ? (
                      <select
                        name={item.name}
                        id=""
                        value={formik.values[item.name]}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control"
                      >
                        <option value="">Select Product</option>
                        {products.map((product) => (
                          <option value={product._id}>{product.name}</option>
                        ))}
                      </select>
                    ) : item.name === "description" ? (
                      <textarea
                        name="description"
                        className="form-control"
                        rows="5"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      >
                        {formik.values[item.name]}
                      </textarea>
                    ) : (
                      <Input
                        className="form-control"
                        name={item.name}
                        type={item.type}
                        placeholder={item.placeholder}
                        value={formik.values[item.name]}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                    )}
                    <small style={{ color: "red" }}>
                      {" "}
                      {formik.touched[item.name] && formik.errors[item.name]}
                    </small>
                  </FormGroup>
                </Col>
              ))}
            </Row>
          </CardBody>
          <CardFooter className="text-end">
            <button
              className="btn btn-primary mx-1"
              disabled={loading}
              type="submit"
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              className="btn btn-primary mx-1"
              type="button"
              disabled={loading}
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
