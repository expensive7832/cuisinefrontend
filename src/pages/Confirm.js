import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Confirm() {

  const cartTotalAmount = useSelector((state) => state?.cart?.totalAmount);
  const email = useSelector((state) => state?.user?.userData?.email);
  const shippingInfo = useSelector((state) => state?.cart?.shippingInfo);
  const ref = useSelector((state) => state?.cart?.receiptInfo?.reference);



  const navigate = useNavigate()

  const dispatch = useDispatch()
  
  useEffect(() =>{
    axios.post("/order", {
      ...shippingInfo,
      email,
      amount: cartTotalAmount,
      ref
    })
    .then((res) =>{
      if(res?.data?.message === "empty field"){
        navigate("/foods");

      }else if(res?.data?.message === "order save"){
       navigate("/receipt")
      }
    })
  }, [shippingInfo, ref])

  return (
   <></>
  )
}

export default Confirm