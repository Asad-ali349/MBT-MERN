import React, { Fragment } from "react";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "../Layout/Loader";

import Signin from "../Auth/Signin";
import ForgotPassword from "../Auth/forgotPassword";

import AppLayout from "../Layout/Layout";
import UsersProfileContain from "../Components/UsersProfile";
import Dashboard from "../Components/Dashboard";
import Products from "../Components/Products";
import AddProducts from "../Components/Products/AddProduct";
import EditProducts from "../Components/Products/EditProduct";
import ProductDetail from "../Components/Products/ProductDetail";
import Categories from "../Components/Categories";

import EditProfile from "../Components/UsersProfile/EditProfile/index.jsx";
import ChangePassword from "../Components/changePassword/index.jsx";
import ResetPassword from "../Auth/resetPassword/index.jsx";
import PageNotFound from "../Auth/PageNotFound/index.jsx";
import Onsite from "../Components/Orders/Onsite/index.jsx";
import AddOnsite from "../Components/Orders/Onsite/Add/index.jsx";
import Online from "../Components/Orders/Online";
import Receipt from "../Components/Receipt/index.jsx";
import Purchase from '../Components/Purchases';
import AddPurchase from '../Components/Purchases/AddPurchase'
// setup fake backend

const Routers = () => {
  return (
    <BrowserRouter basename={"/"}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path={"/"} element={<Signin />} />
          <Route path={"/forgot_password"} element={<ForgotPassword />} />
          <Route path={"/reset_password/:token"} element={<ResetPassword />} />
          <Fragment>
            <Route element={<AppLayout />}>
              <Route path={"/dashboard"} element={<Dashboard />} />
              <Route path={"/onsite_orders"} element={<Onsite />} />
              <Route path={"/onsite_orders/add"} element={<AddOnsite />} />
              <Route
                path={"/onsite_orders/update/:orderId"}
                element={<AddOnsite />}
              />
              <Route path={"/online_orders"} element={<Online />} />
              <Route path={"/purchases"} element={<Purchase />} />
              <Route path={"/purchases/add"} element={<AddPurchase />} />
              <Route path={"/purchases/edit/:id"} element={<AddPurchase />} />
              <Route path={"/products"} element={<Products />} />
              <Route path={"/products/add"} element={<AddProducts />} />
              <Route path={"/products/edit"} element={<EditProducts />} />
              <Route path={"/products/detail"} element={<ProductDetail />} />
              <Route path={"/categories"} element={<Categories />} />
              <Route path={"/profile"} element={<UsersProfileContain />} />
              <Route path={"/edit_profile"} element={<EditProfile />} />
              <Route path={"/change_password"} element={<ChangePassword />} />
              <Route path={"/receipt/:orderId"} element={<Receipt />} />
            </Route>
          </Fragment>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;
