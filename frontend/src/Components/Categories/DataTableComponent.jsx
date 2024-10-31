import React, { Fragment, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { tableColumns } from './Defaultdata';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'reactstrap';
import EditCategory from './EditCategory'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteCategory, fetchAllCategories } from '../../Redux/Slices/categorySlice';


const DataTableComponent = () => {
    const {loading,categories}=useSelector(state=>state.categories);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModelData] = useState({});
    const openModal = (data) => {
        setShowModal(true);
        setModelData(data)
        
    };
    const closeModal = () => {
        setShowModal(false);
        
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Category?");
        if (confirmDelete) {
          dispatch(deleteCategory(id));
          // Additional logic after deletion if needed
        }
      };

    const categoriesRow = categories.map((item, index) => ({
        id: index,
        Name: item.name,
        Image: item.image && item.image.url?<img src={item.image.url} alt=""  style={{width:'60px',height:'60px',borderRadius:'5px'}}/>:"No Image",
        Action: <><FaEdit style={{fontSize:'20px',color:'blue',cursor:'pointer'}} onClick={()=>openModal(item)}/>
        <MdDelete style={{fontSize:'20px',color:'red',cursor:'pointer'}}  onClick={()=>handleDelete(item._id)}/></>
    }));

    useEffect(()=>{
        dispatch(fetchAllCategories())
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
                {showModal && <EditCategory modalData={modalData} showModal={showModal} closeModal={closeModal}/>}
                
        </Fragment>
    )
}
export default DataTableComponent