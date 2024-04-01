import axios from 'axios'
import React, { useCallback } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import loadingImg from "./../assets/images/loading.gif"


function Confirm() {

  const cartTotalAmount = useSelector((state) => state?.cart?.totalAmount);
  const email = useSelector((state) => state?.user?.userData?.email);
  const shippingInfo = useSelector((state) => state?.cart?.shippingInfo);
  const ref = useSelector((state) => state?.cart?.receiptInfo?.reference);



  const navigate = useNavigate()

  const dispatch = useDispatch()
  
  useEffect(() =>{



    axios.post(`${process.env.REACT_APP_API_URL}/order`, {
      ...shippingInfo,
      email,
      amount: cartTotalAmount,
      ref
    })
    .then((res) =>{
      navigate("/receipt") 
    })
    .catch((err) =>{
      for(let i in err?.response?.data){
        swal("error", err?.response?.data[i], "error")
      }
    })

  } , [])

  return (
   <div className="d-flex justify-content-center min-vh-100 align-items-center">


    <img src={loadingImg} className="img-fluid" style={{width: "5rem", height: "5rem"}} alt="loading receipt" />

   </div>
  )
}

export default Confirm
