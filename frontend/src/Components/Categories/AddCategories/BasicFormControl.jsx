import React, { Fragment, useState } from 'react';
import { Row, Col, Card, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { H5 ,Btn} from '../../../AbstractElements'
import {CardHeader,CardFooter} from 'reactstrap';
import { Data } from './Data';
import * as yup from 'yup';
import { useFormik } from 'formik' ;
import {useSelector,useDispatch} from 'react-redux';
import { changePassword } from '../../../Redux/Slices/authSlice';
import { addCategory } from '../../../Redux/Slices/categorySlice';

const BasicFormControlClass = () => {
    const {loading}=useSelector(state=>state.categories);
    const dispatch=useDispatch()
    const validationSchema = yup.object({
        name: yup.string().required().min(3),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            image: '', 
        },
        validationSchema: validationSchema,
     
        onSubmit: async (values) => {
                dispatch(addCategory(values)).then(()=>{
                    formik.resetForm();
                });
                console.log(values)
            },
       });
    return (
        <Fragment>
            <Card>
            <CardHeader><H5>Add Category</H5></CardHeader>
                <Form className="form theme-form" onSubmit={formik.handleSubmit} method='post'>
                    <CardBody>
                        <Row className='mb-3'>

                        { Data.map((item, index) => ( 
                            <Col  md="4" key={index}>
                                <FormGroup>
                                    <Label htmlFor="exampleFormControlInput1">{item.title}</Label>
                                    { item.type =='file' ?
                                    <>
                                        <label htmlFor="fileInput" style={{ cursor: 'pointer',border:'1px solid #dee2e6',width:'100%',height:'40px',borderRadius:'5px',padding:'7px' }}>
                                        {/* Custom text for the file input */}
                                        Choose File: {formik.values[item.name]!=null ? formik.values[item.name].name: 'no file choosen'}
                                        
                                        </label>
                                        <Input className="form-control" id="fileInput" style={{ display: 'none' }}  name={item.name} type={item.type} onChange= {(e) => formik.setFieldValue(item.name, e.currentTarget.files[0]) } />
                                    </>
                                   :
                                    <Input className="form-control" name={item.name} type={item.type} placeholder={item.placeholder}  value={formik.values[item.name]} onBlur={formik.handleBlur} onChange={formik.handleChange } />
                                    }            
                                    <small style={{color : "red"}}>  {formik.touched[item.name] && formik.errors[item.name] }</small>
                                </FormGroup>
                            </Col>

                         ))}

                        </Row>
                      
                    </CardBody>
                    <CardFooter className="text-end">
                        <button className='btn btn-primary mx-1' disabled={loading} type='submit'>{loading?'Adding...':'Add'}</button>
                        <button className='btn btn-primary mx-1' type='button' disabled={loading} onClick={()=>formik.resetForm()}>Cancel</button>
                    </CardFooter>
                </Form>
            </Card>
        </Fragment>
    );
};

export default BasicFormControlClass;