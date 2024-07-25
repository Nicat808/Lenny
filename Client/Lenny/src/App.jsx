import React from "react";
import Home from "./pages/Home";
import "./style/Index.scss";
import { Route, Routes } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail"
import Chart from "./pages/Chart";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/chart" element={<Chart/>}></Route>
        </Route>
        <Route path="/categories/:id" element={<Products />} />
        <Route path="/category/:catId/product/:id" element={<ProductDetail/>}/>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
