import React, { useEffect, useState } from 'react'
import jsPDFInvoiceTemplate, { jsPDF, OutputType } from "jspdf-invoice-template-nodejs";
import logo from "./../assets/images/res-logo.png"
import qr from "./../assets/images/qr_code.jpg"
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { shippingData, receiptData, emptyCart, emptyQty, emptyAmt } from "./../store/Slices/cartSlice"
import "./../styles/receipt.css"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function Receipt() {

  const navigate = useNavigate()
  const shippingInfo = useSelector((state) => state?.cart?.shippingInfo);
  const ref = useSelector((state) => state?.cart?.receiptInfo?.reference);


const dispatch = useDispatch()

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {

    setTimeout(() => {
      setModal(true)
    }, 2000);

  }, [])

 
  const handleShop = () =>{
    dispatch(shippingData({}))
    dispatch(receiptData({}))
    dispatch(emptyCart([]))
    dispatch(emptyQty())
    dispatch(emptyAmt())
    
    toggle()
    navigate("/foods")
  }
  
  const handleCancel = () =>{
    dispatch(shippingData({}))
    dispatch(receiptData({}))
    dispatch(emptyCart([]))
    dispatch(emptyQty())
    dispatch(emptyAmt())
    
    toggle()
    
  }




  return (
    <div className='receipt'>

      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader>Thanks For Patronage</ModalHeader>
        <ModalBody>
          <p>Hi, <span className='fw-bold'>{shippingInfo?.name}</span></p>
          <p>Your order: <span className='fw-bold'>{ref}</span> is on the way</p>
          <p>Do you want more? please check or shop page by clicking the red button</p>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={handleShop}>
            BACK TO SHOP
          </button>{' '}
          <Button color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

    </div>
  )
}

export default Receipt