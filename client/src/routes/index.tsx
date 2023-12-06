import { Route, Routes } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import SignupPage from "../pages/auth/Signup";
import AdminLayout from "../layouts/AdminLayout";
import ManageDashboardPage from "../pages/manager/dashboard";
import ManagerProductPage from "../pages/manager/product";
import ImageUpload from "../pages/manager/product/compopent/uploadImage";
import SigninPage from "../pages/auth/Signin";
import ListCate from "../pages/manager/product/compopent/categories/List";
import PrivateRouter from "../pages/PrivateRouter";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useStorage";

const Routers = () => {
  const [user, , removeUser] = useLocalStorage('user', {})

  
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
      </Route>
      <Route path="signin" element={<SigninPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route
        path="admin"
        element={
          <PrivateRouter User={user}>
            <AdminLayout />
          </PrivateRouter>
        }
      >
        <Route index element={<ManageDashboardPage />} />
        <Route path="products" element={<ManagerProductPage />} />
        <Route path="category" element={<ListCate />} />
        <Route path="upload" element={<ImageUpload />} />
      </Route>
    </Routes>
  );
};

export default Routers;
