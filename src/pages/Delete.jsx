import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import {  isLogout, isUserData } from '../store/Slices/UserSlices'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'



function Delete(){

  const navigate = useNavigate()

  const token = useSelector((state) => state?.user?.userData?.token);

    const {id} = useParams()
    
    const dispatch = useDispatch()


    useEffect(() =>{
      
    let del = window.confirm("are u sure you want to delete?")

    if(del){
      axios.delete(`${process.env.REACT_APP_API_URL }/delete/${id}`, {token})
    .then((res) =>{
      if(res?.data?.message === 'delete successful'){
          dispatch(isLogout())
          dispatch(isUserData({}))
          navigate("/login")
      }

    })
    }else{
      navigate("/")
    }

    }, [])

    return(
      <></>
    )
      
    
}




export default Delete
