import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Button, Col, Container, Form, Input, InputGroup, Label, Row } from 'reactstrap'
import categoryImg from "./../assets/images/category.jpg"
import swal from 'sweetalert'

function UploadFood() {

    const [cat, setCat] = useState(null)
    const [loading, setLoading] = useState("Create")

    useEffect(() =>{
    axios.get(`${process.env.REACT_APP_API_URL}/getCat`)
    .then((res) => setCat(res?.data?.cat?.rows))
    .catch((err) => console.log(err))

    }, [])

    const { id } = useParams()

    const navigate = useNavigate()
    
    const handleSubmit = async(e) =>{
        e.preventDefault()
        setLoading("Uploading...")
        const form = new FormData(e.currentTarget)

        await axios.post(`${process.env.REACT_APP_API_URL}/food/${id}`, form)
        .then((res) => {
            setLoading("Create")
            swal("Good", res.data.message, "success")
            navigate("/")

        })
        .catch((err) => {
            for(let i in err?.response?.data){
                swal("error", err.response.data[i], "error")
            }

            setLoading("Create")

        })
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
                        <input type="text" name='price' className='form-control' />
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
