import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { DELETE, GET, POST, UPDATE } from "../../api/AXIOS";

const calculateTotalPrice = (products) => {
  return products.reduce(
    (total, product) => total + parseFloat(product.totalPrice),
    0
  );
};

const calculateGST = (totalPrice, is_service, gst_percentage) => {
  if (!is_service) {
    return 0;
  }
  return parseFloat(totalPrice * gst_percentage).toFixed(2);
};

const calculateGrandTotal = (totalPrice, gst, discount) => {
  let grandTotal = totalPrice + parseFloat(gst);
  if (grandTotal > 0 && grandTotal > discount) {
    grandTotal -= parseFloat(discount);
  }
  return grandTotal.toFixed(2);
};

export const CreateOnsiteOrder = createAsyncThunk(
  "CreateOnsiteOrder",
  async (data) => {
    try {
      const placeOrder = await POST("order", data);
      toast.success("Order Placed Successfully...");
      return placeOrder.data;
    } catch (error) {
      toast.error(error);
      throw error;
    }
  }
);

export const DeleteOnsiteOrder = createAsyncThunk(
  "DeleteOnsiteOrder",
  async (orderId) => {
    try {
      const placeOrder = await DELETE(`order/${orderId}`);
      toast.success("Order Deleted Successfully...");
      return placeOrder.data;
    } catch (error) {
      toast.error(error);
      throw error;
    }
  }
);

export const GetOnsiteOrder = createAsyncThunk(
  "GetOnsiteOrder",
  async ({ date, status }) => {
    try {
      let query = "";
      if (date) {
        query += `?date=${date}`;
      } else if (status) {
        query += `?status=${status}`;
      } else {
        let todayDate = new Date();
        const hours = todayDate.getHours();

        // If the time is before 6 AM, take the previous day's date
        if (hours < 6) {
          
          todayDate.setDate(todayDate.getDate() - 1);
        }

        query += `?date=${todayDate.getFullYear()}-${String(
          todayDate.getMonth() + 1
        ).padStart(2, "0")}-${String(todayDate.getDate()).padStart(2, "0")}`;
      }

      const orders = await GET(`order/onsite${query}`);

      return orders.data;
    } catch (error) {
      toast.error(error);
      throw error;
    }
  }
);

export const GetSingleOnsiteOrder = createAsyncThunk(
  "GetSingleOnsiteOrder",
  async (id) => {
    try {
      const orders = await GET(`order/orderDetail/${id}`);
      return orders.data;
    } catch (error) {
      toast.error(error);
      console.log(error);
      throw error;
    }
  }
);

export const UpdateSingleOnsiteOrder = createAsyncThunk(
  "UpdateSingleOnsiteOrder",
  async ({ orderId, data }) => {
    try {
      const orders = await UPDATE(`order/${orderId}`, data);
      toast.success("Order Updated Successfully...");
      return orders.data.order;
    } catch (error) {
      toast.error(error);
      console.log(error);
      throw error;
    }
  }
);
export const UpdateOrderStatus = createAsyncThunk(
  "UpdateOrderStatus",
  async ({ orderId, data }) => {
    try {
      const orders = await UPDATE(`order/updateOrderStatus/${orderId}`, data);
      toast.success("Order Status Successfully...");
      return orders.data.order;
    } catch (error) {
      toast.error(error);
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  OnsiteOrderloading: false,
  submitting: false,
  products: [],
  totalPrice: 0,
  gst: 0,
  discount: 0,
  grandTotal: 0,
  is_Service: true,
  payment_method: "cash",
  // gst_percentage:0.14,
  gst_percentage: 0,
  customer: {
    name: "",
    phone: "",
    table_number: ""
  },
  orderDetail: null,
  orders: [],
  orderNumber: "",
  createdAt: "",
  status: "pending",
};

const OnsiteOrders = createSlice({
  name: "OnsiteOrders",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = { ...action.payload };
      const existingProductIndex = state.products.findIndex(
        (item) => item._id === product._id
      );

      if (existingProductIndex === -1) {
        state.products.push(product);
      } else {
        state.products[existingProductIndex].quantity += parseInt(
          product.quantity || 1
        );
        state.products[existingProductIndex].totalPrice += parseFloat(
          product.totalPrice
        );
      }

      state.totalPrice = calculateTotalPrice(state.products);
      state.gst = calculateGST(
        state.totalPrice,
        state.is_Service,
        state.gst_percentage
      );
      state.grandTotal = calculateGrandTotal(
        state.totalPrice,
        state.gst,
        state.discount
      );
    },
    removeProduct: (state, action) => {
      const id = action.payload;
      const indexToRemove = state.products.findIndex(
        (product) => product._id === id
      );

      if (indexToRemove !== -1) {
        const removedProduct = state.products.splice(indexToRemove, 1)[0];
        state.totalPrice -= parseFloat(removedProduct.totalPrice);
        state.gst = calculateGST(
          state.totalPrice,
          state.is_Service,
          state.gst_percentage
        );
        state.grandTotal = calculateGrandTotal(
          state.totalPrice,
          state.gst,
          state.discount
        );
      } else {
        console.error("Product not found.");
      }
    },
    changeQuantity: (state, action) => {
      const { id, value } = action.payload;
      const product = state.products.find((item) => item._id === id);

      let quantity = Number(parseFloat(value));
      if (quantity < 0.0) {
        toast.warning("The minimum order quantity should be greater than 0!");
        return;
      }
      if (Number.isNaN(parseFloat(quantity))) {
        product.quantity = 0;
      } else {
        product.quantity = quantity;
      }

      const newTotalPrice = parseFloat(Math.ceil(product.price * product.quantity));
      state.totalPrice = Math.abs(
        state.totalPrice - product.totalPrice + newTotalPrice
      );
      product.totalPrice = newTotalPrice;
      state.gst = calculateGST(
        state.totalPrice,
        state.is_Service,
        state.gst_percentage
      );
      state.grandTotal = calculateGrandTotal(
        state.totalPrice,
        state.gst,
        state.discount
      );
    },
    handleChangeDiscount: (state, action) => {
      state.discount = action.payload;
      state.grandTotal = calculateGrandTotal(
        state.totalPrice,
        state.gst,
        state.discount
      );
    },
    updateIsService: (state) => {
      state.is_Service = !state.is_Service;
      if (!state.is_Service) {
        state.status = "completed";
      } else {
        state.status = "pending";
      }
      if (state.is_Service && state.payment_method === "cash") {
        // state.gst_percentage = 0.14
        state.gst_percentage = 0;
      } else if (state.is_Service && state.payment_method === "online") {
        state.gst_percentage = 0;
        // state.gst_percentage=0.04
      } else {
        state.gst_percentage = 0;
      }

      state.gst = calculateGST(
        state.totalPrice,
        state.is_Service,
        state.gst_percentage
      );
    },
    updatePaymentMethod: (state) => {
      state.payment_method =
        state.payment_method === "cash" ? "online" : "cash";
      if (state.is_Service && state.payment_method === "cash") {
        // state.gst_percentage=0.14
        state.gst_percentage = 0;
      } else if (state.is_Service && state.payment_method === "online") {
        // state.gst_percentage=0.04
        state.gst_percentage = 0;
      } else {
        state.gst_percentage = 0;
      }
      state.gst = calculateGST(
        state.totalPrice,
        state.is_Service,
        state.gst_percentage
      );
      state.grandTotal = calculateGrandTotal(
        state.totalPrice,
        state.gst,
        state.discount
      );
    },
    updateOrderStatus: (state) => {
      state.status = state.status === "pending" ? "completed" : "pending";
    },
    updateCustomer: (state, action) => {
      state.customer = { ...state.customer, ...action.payload };
    },
    resetState: (state) => {
      state.OnsiteOrderloading = false;
      state.orderDetail = null;
      state.products = [];
      state.totalPrice = 0;
      state.gst = 0;
      state.discount = 0;
      state.grandTotal = 0;
      state.is_Service = true;
      state.payment_method = "cash";
      // state.gst_percentage = 0.14
      state.gst_percentage = 0;
      state.customer = {
        name: "",
        phone: "",
        table_number: ""
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateOnsiteOrder.fulfilled, (state, action) => {
        state.OnsiteOrderloading = false;
        state.orderDetail = action.payload;
        state.products = [];
        state.totalPrice = 0;
        state.gst = 0;
        state.discount = 0;
        state.grandTotal = 0;
        state.is_Service = true;
        state.payment_method = "cash";
        // state.gst_percentage = 0.14
        state.gst_percentage = 0;
        state.customer = {
          name: "",
          phone: "",
          table_number: ""
        };
        state.status = "pending";
      })
      .addCase(CreateOnsiteOrder.pending, (state) => {
        state.OnsiteOrderloading = true;
      })
      .addCase(CreateOnsiteOrder.rejected, (state) => {
        state.OnsiteOrderloading = false;
      })
      .addCase(GetOnsiteOrder.fulfilled, (state, action) => {
        state.OnsiteOrderloading = false;
        state.orders = action.payload;
      })
      .addCase(GetOnsiteOrder.pending, (state) => {
        state.OnsiteOrderloading = true;
      })
      .addCase(GetOnsiteOrder.rejected, (state) => {
        state.OnsiteOrderloading = false;
      })
      .addCase(GetSingleOnsiteOrder.fulfilled, (state, action) => {
        state.OnsiteOrderloading = false;
        state.products = action.payload.products;
        state.totalPrice = Number(action.payload.totalPrice);
        state.gst = Number(action.payload.gst);
        state.discount = Number(action.payload.discount);
        state.grandTotal = Number(action.payload.grandTotal);
        state.payment_method = action.payload.paymentMethod;
        state.gst_percentage =
          Number(action.payload.gst) / Number(action.payload.totalPrice);
        state.customer = action.payload.customer;
        state.orderNumber = action.payload.orderNumber;
        state.is_Service = action.payload.is_Service;
        state.status = action.payload.status;
        state.createdAt = action.payload.createdAt;
      })
      .addCase(GetSingleOnsiteOrder.pending, (state) => {
        state.OnsiteOrderloading = true;
        state.products = [];
        state.totalPrice = 0;
        state.gst = 0;
        state.discount = 0;
        state.grandTotal = 0;
        state.is_Service = true;
        state.payment_method = "cash";
        // state.gst_percentage = 0.14
        state.gst_percentage = 0;
        state.customer = {
          name: "",
          phone: "",
          table_number: ""
        };
      })
      .addCase(GetSingleOnsiteOrder.rejected, (state) => {
        state.OnsiteOrderloading = false;
      })
      .addCase(UpdateSingleOnsiteOrder.fulfilled, (state, action) => {
        state.OnsiteOrderloading = false;
        state.products = action.payload.products;
        state.totalPrice = Number(action.payload.totalPrice);
        state.gst = Number(action.payload.gst);
        state.discount = Number(action.payload.discount);
        state.grandTotal = Number(action.payload.grandTotal);
        state.payment_method = action.payload.paymentMethod;
        state.gst_percentage =
          Number(action.payload.gst) / Number(action.payload.totalPrice);
        state.customer = action.payload.customer;
        state.orderNumber = action.payload.orderNumber;
        state.status = action.payload.status;
        state.createdAt = action.payload.createdAt;
      })
      .addCase(UpdateSingleOnsiteOrder.pending, (state) => {
        state.OnsiteOrderloading = true;
        state.products = [];
        state.totalPrice = 0;
        state.gst = 0;
        state.discount = 0;
        state.grandTotal = 0;
        state.is_Service = true;
        state.payment_method = "cash";
        // state.gst_percentage = 0.14
        state.gst_percentage = 0;
        state.customer = {
          name: "",
          phone: "",
          table_number:""
        };
      })
      .addCase(UpdateOrderStatus.fulfilled, (state, action) => {
        state.status = action.payload.status;
      })
      .addCase(UpdateOrderStatus.pending, (state) => {
        state.status = null;
      })
      .addCase(UpdateOrderStatus.rejected, (state) => {
        state.OnsiteOrderloading = false;
      })
      .addCase(DeleteOnsiteOrder.fulfilled, (state, action) => {
        let deleteOrderId = action.payload.order._id;
        state.orders = state.orders.filter(
          (order) => order._id !== deleteOrderId
        );
      });
  },
});

export const OnsiteOrdersActions = OnsiteOrders.actions;
export default OnsiteOrders.reducer;
