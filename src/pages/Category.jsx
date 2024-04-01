import axios from 'axios'
import React, { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Button, Col, Container, Form, InputGroup, Label, Row } from 'reactstrap'
import categoryImg from "./../assets/images/category.jpg"
import swal from 'sweetalert';

function Category() {

    const { id } = useParams()

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    
    const handleSubmit = async(e) =>{
        e.preventDefault()
        setLoading(true)
        const form = new FormData(e.currentTarget)

        await axios.post(`${process.env.REACT_APP_API_URL}/category/${id}`, form)
        .then((res) => {
            if(res?.data?.message === "authorisation needed"){
                setLoading(false)
                swal("Required",res?.data?.message, "info")
                navigate("/login")
            }else if(res?.data?.message === "category created"){
                setLoading(false)
                swal("Good Job",res?.data?.message, "success")
                navigate("/")
            }else if(res?.data?.message === "error"){
                setLoading(false)
                swal("Try Again",res?.data?.message,"warning")
            }
        })
        .catch((err) => console.log(err))
    }


  return (
    <div className="category">
        
        <Container>
            <Row>
                <Col className='d-none d-md-block' md={6}>
                    <img src={categoryImg} alt="category" />
                </Col>

                <Col md={6}>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className='my-3'>
                        <Label className='fw-bold'>Title</Label> 
                        <input type="text" name='title' className='form-control' />
                        </div>

                        <div className='my-3'>
                        
                        <input type="file" name='photo' className='form-control' />
                        </div>

                        <Button type='submit' className="btn btn-lg btn-info">{loading ? "Loading..." : "create"}</Button>
                        
                    </form>
                </Col>
            </Row>
        </Container>

    </div>
  )
}

export default Category
