import React, { Fragment, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { tableColumns } from './Defaultdata';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from 'reactstrap';
import { FaList } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteCategory, fetchAllCategories } from '../../../Redux/Slices/categorySlice';
import { GetOnsiteOrder } from '../../../Redux/Slices/OnsiteOrderSlice';




const DataTableComponent = () => {
    const {loading,orders}=useSelector(state=>state.OnsiteOrders);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Category?");
        if (confirmDelete) {
          dispatch(deleteCategory(id));
        }
      };

    const categoriesRow = orders.map((item, index) => ({
        id: index,
        orderNumber: item.orderNumber,
        orderType: item.orderType,
        paymentMethod: item.paymentMethod,
        grandTotal: item.grandTotal,
        Action: <>
            <Link to={`/onsite_orders/update/${item._id}`}><FaEdit style={{fontSize:'20px',color:'blue',cursor:'pointer'}}/></Link>
            <MdDelete style={{fontSize:'20px',color:'red',cursor:'pointer'}}  onClick={()=>handleDelete(item._id)}/>
        </>
    }));

    useEffect(()=>{
        dispatch(GetOnsiteOrder())
        return ()=>{}
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
                </>
            )} 
                
        </Fragment>
    )
}
export default DataTableComponent