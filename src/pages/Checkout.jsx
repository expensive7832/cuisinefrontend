import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";

import "../styles/checkout.css";
import { receiptData, shippingData } from "../store/Slices/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";
import axios from "axios";
import { useEffect } from "react";
import swal from "sweetalert";

const Checkout = () => {

  const cartTotalAmount = useSelector((state) => state?.cart?.totalAmount);
  const shippingInfo = useSelector((state) => state?.cart?.shippingInfo);
  const userEmail = useSelector((state) => state?.user?.userData?.email)





 const dispatch = useDispatch()
  const [enterName, setEnterName] = useState("");
  const [enterNumber, setEnterNumber] = useState("");
  const [enterCountry, setEnterCountry] = useState("");
  const [enterCity, setEnterCity] = useState("");
  const [street, setStreet] = useState("");


  const navigate = useNavigate()

  const totalAmount = cartTotalAmount ;

  

  const config = {
    reference: new Date().getTime().toString(),
    amount: cartTotalAmount * 100,
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
    email: userEmail,
  }


 const initializePayment = usePaystackPayment(config)  

  const submitHandler = (e) => {
    e.preventDefault();

   const userShippingAddress = {
      name: enterName,
      street: street,
      phone: enterNumber,
      country: enterCountry,
      city: enterCity,
     
    };

     

   
      dispatch(shippingData(userShippingAddress))
      

      const onSuccess = (reference) =>{
        dispatch(receiptData(reference))
        navigate("/confirm")
      }
  
  
    const onClose = () => {
      swal("!!!",'oh!! that can be deliver in a jiffy', "info")
    }

     initializePayment(onSuccess, onClose)

  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col md="6">
              <h6 className="mb-4">Shipping Address</h6>
              <form className="checkout__form" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    className="form-control my-1"
                    type="text"
                    placeholder="Enter your name"
                    required
                    onChange={(e) => setEnterName(e.target.value)}
                  />
                </div>

                
                <div className="form__group">
                  <input
                    className="form-control my-1"
                    type="number"
                    placeholder="Phone number"
                    required
                    onChange={(e) => setEnterNumber(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    className="form-control my-1"
                    type="text"
                    placeholder="Country"
                    required
                    onChange={(e) => setEnterCountry(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    className="form-control my-1"
                    type="text"
                    placeholder="City"
                    required
                    onChange={(e) => setEnterCity(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                  className="form-control my-1"
                    type="text"
                    placeholder="Street Name"
                    required
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
                <button type="submit" className="addTOCart__btn btn btn-danger">
                  Payment
                </button>
              </form>
            </Col>

            <Col md={2} className="d-md-block d-none"/>

            <Col md="4">
              <div className="checkout__bill">
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Subtotal: <span>${cartTotalAmount}</span>
                </h6>
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Shipping: <span>$0</span>
                </h6>
                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Total: <span>${totalAmount}</span>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
