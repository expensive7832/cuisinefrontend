import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import {  isLogout, isUserData } from '../store/Slices/UserSlices'
import { useDispatch, useSelector } from 'react-redux'




const del =  window?.confirm("Are you sure you want to delete?")

async function Delete(){

  const token = useSelector((state) => state?.user?.userData?.token);

    const navigate = useNavigate()
    const {id} = useParams()
    const dispatch = useDispatch()

      if(del){
        await axios.post(`https://cuisinetreat-api.onrender.com/delete/${id}`, {token})
        .then((res) =>{
          if(res?.data?.message === 'delete successful'){
              dispatch(isLogout())
              dispatch(isUserData({}))
              alert('Account Deactivated');
              window.location.href = "/"
          }
        })
      }else{
        navigate("/")
      }
    
}




export default Delete
