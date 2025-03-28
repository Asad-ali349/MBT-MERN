import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { H5 ,Btn} from '../../../AbstractElements'
import {CardHeader,CardFooter} from 'reactstrap';
import { Data } from './Data';
import * as yup from 'yup';
import { useFormik } from 'formik' ;
import {useSelector,useDispatch} from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchAllCategories } from '../../../Redux/Slices/categorySlice';
import { UpdateProduct } from '../../../Redux/Slices/productSlice';

const BasicFormControlClass = () => {
    const location = useLocation();
    const product = location.state.item;
    const {categories}=useSelector(state=>state.categories)
    const {loading}=useSelector(state=>state.products);
    const dispatch=useDispatch()
    const validationSchema = yup.object({
        name: yup.string().required().min(3),
        category_id:yup.string().required(),
        price:yup.string().required(),
        description:yup.string().required(),
        status:yup.string().required(),
    });

    const formik = useFormik({
        initialValues: {...product,category_id:product.category_id._id,image:''},
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            dispatch(UpdateProduct(values))
            // formik.resetForm();
        },
    });
    useEffect(()=>{
        dispatch(fetchAllCategories());
    },[])
    return (
        <Fragment>
            <Card>
            <CardHeader><H5>Edit Product</H5></CardHeader>
                <Form className="form theme-form" onSubmit={formik.handleSubmit} method='post'>
                    <CardBody>
                        <Row className='mb-3'>

                        { Data.map((item, index) => ( 
                            <Col  md={item.name=="description"?12:4} key={index}>
                                <FormGroup>
                                    <Label htmlFor="exampleFormControlInput1">{item.title}</Label>
                                    { item.type =='file' ?
                                    <>
                                        <Input className="form-control" id="fileInput"  name={item.name} type={item.type} onChange= {(e) => formik.setFieldValue(item.name, e.currentTarget.files[0]) } />
                                    </>
                                   : item.type ==='select' ?(
                                    
                                    item.name === 'status'? (
                                        <select name={item.name} id="" value={formik.values[item.name]} onBlur={formik.handleBlur} onChange={formik.handleChange } className='form-control'>
                                            <option value="">Select Status</option>
                                            <option value="available">Available</option>
                                            <option value="notAvailble">Not Available</option>
                                            
                                        </select>
                                    ) : 
                                    item.name==='category_id'?(
                                        <select name={item.name} id="" value={formik.values[item.name]} onBlur={formik.handleBlur} onChange={formik.handleChange } className='form-control'>
                                            <option value="">Select Category</option>
                                            {
                                                categories.map((category)=>(
                                                    <option value={category._id}>{category.name}</option>
                                                ))
                                            }
                                        </select>
                                    ):''
                                   ):item.name ==='description' ?(
                                    <textarea name="description" className='form-control' rows="5" onBlur={formik.handleBlur} onChange={formik.handleChange }>{formik.values[item.name]}</textarea>
                                   ):

                                    <Input className="form-control" name={item.name} type={item.type} placeholder={item.placeholder}  value={formik.values[item.name]} onBlur={formik.handleBlur} onChange={formik.handleChange } />
                                    }            
                                    <small style={{color : "red"}}>  {formik.touched[item.name] && formik.errors[item.name] }</small>
                                </FormGroup>
                            </Col>

                         ))}

                        </Row>
                      
                    </CardBody>
                    <CardFooter className="text-end">
                        <button className='btn btn-primary mx-1' disabled={loading} type='submit'>{loading?'Updating...':'Update'}</button>
                        <button className='btn btn-primary mx-1' type='button' disabled={loading} onClick={()=>formik.resetForm()}>Cancel</button>
                    </CardFooter>
                </Form>
            </Card>
        </Fragment>
    );
};

export default BasicFormControlClass;