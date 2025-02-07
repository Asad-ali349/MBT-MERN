import React, { Fragment, useEffect } from "react";
import DataTable from "react-data-table-component";
import { tableColumns } from "./Defaultdata";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deletePurchase, fetchAllPurchases } from "../../Redux/Slices/purchaseSlice";
import { formateDate } from "../../utils/global";

const DataTableComponent = () => {
  const dispatch = useDispatch();
  const { loading, purchases } = useSelector((state) => state.purchases);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      dispatch(deletePurchase(id));
    }
  };
  const navigate = useNavigate();
  const purchaseRow = purchases.map((item, index) => ({
    id: index,
    Name: item.product.name,
    Quantity: item.quantity,
    Unit: item.unit,
    Price: item.purchase_price,
    Date: formateDate(item.createdAt),
    Action: (
      <>
        <FaEdit
          className="mx-1"
          style={{ fontSize: "20px", color: "blue", cursor: "pointer" }}
          onClick={() => navigate(`/purchases/edit/${item?._id}`, { state: { item: item } })}
        />
        <MdDelete
          className="mx-1"
          style={{ fontSize: "20px", color: "red", cursor: "pointer" }}
          onClick={() => handleDelete(item._id)}
        />
      </>
    ),
  }));
  useEffect(() => {
    dispatch(fetchAllPurchases());
  }, []);
  return (
    <Fragment>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner animation="border" size="sm" />
        </div>
      ) : (
        <>
          <DataTable
            data={purchaseRow}
            columns={tableColumns}
            striped={true}
            center={true}
            pagination
          />
        </>
      )}
    </Fragment>
  );
};
export default DataTableComponent;
