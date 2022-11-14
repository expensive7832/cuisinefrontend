import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col,Button, Form, FormGroup, Input, Alert } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert"
const Register = () => {
  const navigate = useNavigate()
  const [fname, setFname ] = useState("")
  const [lname, setLname ] = useState("")
  const [email, setEmail ] = useState("")
  const [pwd, setPwd ] = useState("")
  const [loading, setLoading ] = useState(false)

  const handleSubmit = async() => {
    setLoading(true)
    await axios.post("/register", {fname, lname, email, pwd} )
    .then((res) =>{
      if(res?.data?.message === "Input Field Cannot Be Empty"){
        setLoading(false)
        swal("Required",res?.data?.message, "info")
      }else if(res.data.message === "Account Successfully Created"){
        setLoading(false)
        swal("Good",res?.data?.message, "success")
        navigate("/login")
      }else if(res.data.message ===  "Email Already Exists"){
        setLoading(false)
        swal("Required",res?.data?.message, "info")
      }else if(res.data.message ===  "Enter Valid Name"){
        setLoading(false)
        swal("Required",res?.data?.message, "warning")
      }else if(res.data.message === "Enter Valid Email"){
        setLoading(false)
        swal("Required",res?.data?.message, "warning")
      }else if(res.data.message ==="Enter Valid Password"){
        setLoading(false)
        swal("Required",res?.data?.message, "warning")
      }
    })
  };

  return (
    <Helmet title="Signup">
      <CommonSection title="Signup" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5">
                <FormGroup>
                  <Input
                    type="text"
                    name="fname"
                    placeholder="First name"
                   onChange={(e) => setFname(e.target.value)}
                    value={fname}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    name="lname"
                    placeholder="Last Name"
                    onChange={(e) => setLname(e.target.value)}
                    value={lname}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    value={email}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPwd(e.target.value)}
                    name="pwd"
                    value={pwd}
                    
                  />
                </FormGroup>
                
                
                <Button onClick={handleSubmit} color="primary" type="button" >
                 {loading ? "Sign You Up Now..." : "Sign Up"}
                </Button>
              </form>
              <Link to="/login">Already have an account? Login</Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Register;
