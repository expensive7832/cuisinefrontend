import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Button, Col, Container, Form, Input, InputGroup, Label, Row } from 'reactstrap'
import categoryImg from "./../assets/images/category.jpg"
import swal from 'sweetalert'

function UploadFood() {

    const [cat, setCat] = useState([])
    const [loading, setLoading] = useState("Create")
    useEffect(() =>{
    axios.get("https://cuisinetreat-api.onrender.com/getCat")
    .then((res) => setCat(res?.data?.cat?.rows))
    }, [])

    const { id } = useParams()

    const navigate = useNavigate()
    
    const handleSubmit = async(e) =>{
        e.preventDefault()
        setLoading("Uploading...")
        const form = new FormData(e.currentTarget)

        await axios.post(`https://cuisinetreat-api.onrender.com/food/${id}`, form)
        .then((res) => {
            if(res?.data?.message === "authorisation needed"){
                swal("Authorization", res?.data?.message, "warning")
                navigate("/login")
            }else if(res?.data?.message === "food created"){
                setLoading("Create")
                swal("Good Job", res?.data?.message, "success");
                navigate("/")
            }else if(res?.data?.message === "error"){
                swal("Try Again","Title Already Exists, Try Other Name", "warning");
                setLoading("Try Again")
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
                        <Label className='fw-bold'>Price</Label> 
                        <input type="number" name='price' className='form-control' />
                        </div>

                        <div className='my-3'>
                        <Label className='fw-bold'>Description</Label> 
                        <textarea name='description' rows={8} className='form-control' />
                        </div>

                        <div className='my-3'>
                        <Label className='fw-bold'>Category</Label> 
                        <Input multiple name="cat" id="" type="select"  >
                            {cat?.map((c) => (
                                <option value={c?.title}>{c?.title}</option>
                            ))}
                        </Input>
                        </div>

                        <div className='my-3'>
                        
                        <input multiple type="file" name='photos' className='form-control' />
                        </div>

                        <Button type='submit' className="btn btn-lg btn-info">{loading}</Button>
                        
                    </form>
                </Col>
            </Row>
        </Container>

    </div>
  )
}

export default UploadFood
