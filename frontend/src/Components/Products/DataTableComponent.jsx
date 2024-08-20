import React, { Fragment, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { tableColumns } from './Defaultdata';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Spinner } from 'reactstrap';
import { FaList } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteProduct, fetchAllProducts } from '../../Redux/Slices/productSlice';
import ProductDetail from './ProductDetail'
const products=[
    {
        _id:'132121',
        name:'Chicken Tikka',
        image:'test image',
        price:'100',
        category:'Chicken',
    },
    {
        _id:'1379987',
        name:'Beef Kabbab',
        image:'test image',
        category:'Beef',
        price:'200',
    }
]


const DataTableComponent = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModelData] = useState({});
    const dispatch=useDispatch();
    const {loading,products}=useSelector(state=>state.products);
    const openModal = (data) => {
        setShowModal(true);
        setModelData(data)
        
    };
    const closeModal = () => {
        setShowModal(false);
        
    };
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
          dispatch(deleteProduct(id));
          // Additional logic after deletion if needed
        }
      };
    const navigate=useNavigate();
    const categoriesRow = products.map((item, index) => ({
        id: index,
        Name: item.name,
        Category: item.category_id?.name,
        Price: item.price,
        Image: item.image && item.image.url?<img src={item.image.url} alt=""  style={{width:'60px',height:'60px',borderRadius:'5px'}}/>:"No Image",
        Action: <>
        <FaList className='mx-2' style={{fontSize:'20px',color:'green',cursor:'pointer'}} onClick={()=>openModal(item)}/>
        <FaEdit className='mx-1' style={{fontSize:'20px',color:'blue',cursor:'pointer'}} onClick={()=>navigate('/products/edit',{ state: { item: item } })}/>
        <MdDelete className='mx-1' style={{fontSize:'20px',color:'red',cursor:'pointer'}}  onClick={()=>    handleDelete(item._id)}/>
        </>
    }));
    useEffect(()=>{
        dispatch(fetchAllProducts())
    },[])
    return (
        <Fragment>
            
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner animation="border" size="sm" />
                </div>
            ) : (

                <> 

                <DataTable
                    data={categoriesRow}
                    columns={tableColumns}
                    striped={true}
                    center={true}
                    pagination
                    />
                {showModal && <ProductDetail modalData={modalData} showModal={showModal} closeModal={closeModal}/>}
                </>
            )}  
        </Fragment>
    )
}
export default DataTableComponent