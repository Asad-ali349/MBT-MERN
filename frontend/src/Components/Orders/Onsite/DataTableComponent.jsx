import React, { Fragment, useEffect } from "react";
import DataTable from "react-data-table-component";
import { tableColumns } from "./Defaultdata";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  DeleteOnsiteOrder,
  GetOnsiteOrder,
} from "../../../Redux/Slices/OnsiteOrderSlice";
import { useSocket } from "../../../context/SocketContext";
import { formateDate, formatTime } from "../../../utils/global";

const DataTableComponent = () => {
  const { loading, orders } = useSelector((state) => state.OnsiteOrders);
  const dispatch = useDispatch();
  const socket = useSocket();

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Order?"
    );
    if (confirmDelete) {
      dispatch(DeleteOnsiteOrder(id));
    }
  };
  const categoriesRow = orders.map((item, index) => ({
    id: index,
    orderNumber: item.orderNumber,
    orderStatus: (
      <span
        style={{
          backgroundColor: `${item.status === "pending" ? "red" : "green"}`,
          color: "white",
          padding: "0px 15px",
          borderRadius: "17px",
        }}
      >
        {item.status}
      </span>
    ),
    paymentMethod: item.paymentMethod,
    grandTotal: item.grandTotal,
    orderDate: formateDate(item.createdAt),
    orderTime: formatTime(item.createdAt),
    Action: (
      <>
        <Link to={`/onsite_orders/update/${item._id}`}>
          <FaEdit
            style={{
              fontSize: "20px",
              color: "blue",
              cursor: "pointer",
              marginInline: "10px",
            }}
          />
        </Link>
        <MdDelete
          style={{
            fontSize: "20px",
            color: "red",
            cursor: "pointer",
            marginInline: "10px",
          }}
          onClick={() => handleDelete(item._id)}
        />
      </>
    ),
  }));

  useEffect(() => {
    dispatch(GetOnsiteOrder({ date: "" }));

    if (socket) {
      // Listen for new orders
      socket.on("newOrder", (newOrder) => {
        if (newOrder.orderType === "onsite") {
          dispatch(GetOnsiteOrder({ date: "" }));
        }
      });

      // Listen for order status updates
      socket.on("orderStatusUpdate", (updatedOrder) => {
        if (updatedOrder.orderType === "onsite") {
          dispatch(GetOnsiteOrder({ date: "" }));
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("newOrder");
        socket.off("orderStatusUpdate");
      }
    };
  }, [socket, dispatch]);

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
            data={categoriesRow}
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
