import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./Slices/authSlice";
import categorySlice from "./Slices/categorySlice";
import productSlice from "./Slices/productSlice";
import OnsiteOrderSlice from "./Slices/OnsiteOrderSlice";
import dashboardSlice from "./Slices/dashboardSlice";
import purchaseSlice from "./Slices/purchaseSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    categories: categorySlice,
    products: productSlice,
    OnsiteOrders: OnsiteOrderSlice,
    dashboard: dashboardSlice,
    purchases: purchaseSlice,
  },
});

export default store;
