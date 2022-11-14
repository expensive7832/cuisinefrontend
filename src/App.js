import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Home = React.lazy(() => import("./pages/Home"));
const AllFoods = React.lazy(() =>import("./pages/AllFoods"));
const FoodDetails = React.lazy(() =>import("./pages/FoodDetails"));
const  Cart = React.lazy(() => import("./pages/Cart"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() =>import("./pages/Register"));
const Header = React.lazy(() => import("./components/Header"))
const Footer = React.lazy(() => import("./components/Footer"))
const Carts = React.lazy(() => import("./components/UI/cart/Carts"))
const Update = React.lazy(() => import("./pages/Update"))
const Delete = React.lazy(() => import("./pages/Delete"))
const Cat = React.lazy(() => import("./pages/Category"))
const UploadFood = React.lazy(() => import("./pages/UploadFood"))
const Confirm = React.lazy(() => import("./pages/Confirm"))
const Receipt = React.lazy(() => import("./pages/Receipt"))


const App = () => {
  const showCart = useSelector((state) => state?.cartUI?.cartIsVisible);
  const login = useSelector((state) => state?.user?.login);
  return (
    <>
    <Header/>

    { showCart && <Carts/>}

    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/foods" element={<AllFoods />} />
      <Route path="/foods/:id" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={login === true ? <Checkout /> : <Login/>} />
      <Route path="/confirm" element={login === true ? <Confirm/> : <Login/>} />
      <Route path="/receipt" element={login === true ? <Receipt/> : <Login/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/update/:id" element={<Update />} />
      <Route path="/delete/:id" element={<Delete />} />
      <Route path="/category/:id" element={<Cat />} />
      <Route path="/food/:id" element={<UploadFood />} />
    </Routes>

   
    <Footer/>

    </>
  );
};

export default App;
