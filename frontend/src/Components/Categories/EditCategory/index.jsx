import React from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Col, Row } from 'reactstrap';
import * as yup from 'yup';
import { useFormik } from 'formik' ;
import { UpdateCategory } from "../../../Redux/Slices/categorySlice";
import { useSelector, useDispatch } from 'react-redux';

export default function Index({modalData,showModal,closeModal}) {
    const dispatch=useDispatch();
    const {loading}=useSelector(state=>state.categories);
    const validationSchema = yup.object({
        name: yup.string().required().min(3),
    });

    const formik = useFormik({
        initialValues: {
            _id:modalData._id,
            name: modalData.name,
            image: '', 
        },
        validationSchema: validationSchema,
     
        onSubmit: async (values) => {
            dispatch(UpdateCategory(values)).then(()=>{
                formik.resetForm();
                closeModal();
            });
                // formik.resetForm();
            },
       });

  return (
    <div>
      <Modal isOpen={showModal} toggle={closeModal} centered>
        <ModalHeader toggle={closeModal}>Edit Category</ModalHeader>
        <ModalBody>
            <form onSubmit={formik.handleSubmit} method="post">
                <Row>
                    <Col md={12}>
                    <label htmlFor="name">Category Name</label>
                    <input
                        name="name"
                        className="form-control"
                        value={formik.values['name']} 
                        onBlur={formik.handleBlur} 
                        onChange={formik.handleChange} 
                    />
                    <small style={{color : "red"}}>  {formik.touched['name'] && formik.errors['name'] }</small>
                    </Col>
                    <Col md={12} className="mt-2">
                    <label htmlFor="team">Image</label>
                    <input
                        type="file"
                        id=""
                        className="form-control"
                        placeholder="choose Image"
                        name={'image'}
                        onChange= {(e) => formik.setFieldValue('image', e.currentTarget.files[0])  }
                    />
                    <small style={{color : "red"}}>  {formik.touched['image'] && formik.errors['image'] }</small>
                    </Col>
                    <Col md={12} className="mt-2">
                    <button
                        type="submit"
                        className="btn btn-primary mt-4"
                        name="submit"
                        disabled={loading}
                    >
                        {loading?'Updating....':"Update"}
                    </button>
                    </Col>
                </Row>
            </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
