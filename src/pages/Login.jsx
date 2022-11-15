import React, { useState, useRef } from "react";
import {useDispatch} from "react-redux"
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col, Form, FormGroup, Input, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { isLogin, isUserData } from "./../store/Slices/UserSlices"
import swal from 'sweetalert';

const Login = () => {
  const loginNameRef = useRef();
  const loginPasswordRef = useRef();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showPwd, setShowPwd] = useState("SHOW")
  const [loading, setLoading] = useState(false)

  const handleShow = () =>{

    if(showPwd === "SHOW"){
      loginPasswordRef.current.type = "text"
      setShowPwd("HIDE")
    }else{
      loginPasswordRef.current.type = "password"
      setShowPwd("SHOW")
    }
  }

  const submitHandler = async() =>{
    setLoading(true)
    await axios.post("https://cuisinetreat-api.onrender.com/login",{email: loginNameRef.current.value, pwd: loginPasswordRef.current.value},
    )
    .then((res) =>{
      if(res.data.message === "input field cannot be empty"){
        setLoading(false)
        swal("Required",res?.data?.message, "info")

      }else if(res.data.message === "login Successful"){
        dispatch(isLogin())
        dispatch(isUserData(res?.data?.user))
        setLoading(false)
        swal("Good Job",res?.data?.message, "success")
        navigate("/")
      }else if(res.data.message === "Incorrect Password"){
        setLoading(false)
        swal("Required",res?.data?.message, "warning")
      
      }else if(res.data.message === "Email Not Found"){
        setLoading(false)
        swal("Required",res?.data?.message, "info")
      
      }else if(res.data.message === "password didnt match"){
        setLoading(false)
        swal("Required",res?.data?.message, "info")
      }
    })
  }


  return (
    <Helmet title="Login">
      <CommonSection title="Login" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <Form className="form mb-5">
                <FormGroup>
                  <input
                  className="form-control"
                    type="email"
                    placeholder="Email"
                    
                    ref={loginNameRef}
                  />
                </FormGroup>
                
                <FormGroup className="d-flex justify-content-between align-items-center">
                  <input
                  className="form-control"
                    type="password"
                    placeholder="Password"
                   
                    ref={loginPasswordRef}
                  />
                  <small style={{cursor: "pointer"}} className="text-primary fw-bold" onClick={() => handleShow()}>{showPwd}</small>
                </FormGroup>
                
                <Button onClick={submitHandler} type="button" className="addTOCart__btn">
                 {loading ? "login you in now..." : "Login"}
                </Button>
              </Form>
              <Link to="/register">
                Don't have an account? Create an account
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
