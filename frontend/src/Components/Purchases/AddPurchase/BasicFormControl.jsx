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
import { fetchAllProducts } from "../../../Redux/Slices/productSlice";
import {
  addPurchase,
  fetchPurchaseDetail,
  UpdatePurchase,
} from "../../../Redux/Slices/purchaseSlice";
import { useLocation, useNavigate, useParams } from "react-router";

const BasicFormControlClass = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const purchase = location?.state?.item;
  const { loading, products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    product: yup.string().required(),
    unit: yup.string().required(),
    quantity: yup
      .number()
      .required()
      .min(0.01, "Quantity must be greater than zero")
      .typeError("Quantity must be a number"),
    purchase_price: yup.number().required().typeError("Price must be a number"),
  });

  const formik = useFormik({
    initialValues:
      id && purchase
        ? { ...purchase, product: purchase?.product?._id }
        : {
            product: "",
            quantity: 1.0,
            purchase_price: "",
            unit: "",
          },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const action = id && purchase ? UpdatePurchase : addPurchase;
      dispatch(action(values)).then(() => {
        formik.resetForm();
      }).then(() => {
      navigate('/purchases');
    });
    },
  });
  useEffect(() => {
    if (id) {
      dispatch(fetchPurchaseDetail(id));
    }
    dispatch(fetchAllProducts());
  }, []);
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <H5>{id && purchase ? "Edit" : "Add"} Purchase</H5>
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
                    ) : item.type === "select" && item.name === "product" ? (
                      <select
                        name={item.name}
                        value={formik.values[item.name]}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control"
                      >
                        <option value="">Select Product</option>
                        {products.map((product) => (
                          <option key={product._id} value={product._id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    ) : item.type === "select" && item.name === "unit" ? (
                      <select
                        name={item.name}
                        value={formik.values[item.name]}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control"
                      >
                        <option value="">Select Unit</option>
                        <option value="kg">Kilogram</option>
                        <option value="unit">Per Unit</option>
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
              {loading
                ? `${id && purchase ? "Updating..." : "Adding..."}`
                : `${id && purchase ? "Update" : "Add"}`}
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
