import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col,Button, Form, FormGroup, Input, Alert } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/Slices/UserSlices";
import swal from "sweetalert";

const Update = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const firstName = useSelector((state) => state?.user?.userData?.fname)
  const lastName = useSelector((state) => state?.user?.userData?.lname)

  const [fname, setFname ] = useState(firstName)
  const [lname, setLname ] = useState(lastName)
  const [loading, setLoading ] = useState(false)
  
  const id = useSelector((state) => state?.user?.userData?.id)
  const token = useSelector((state) => state?.user?.userData?.token);
 

  const handleSubmit = async() => {
    
    await axios.post(`https://cuisinetreat-api.onrender.com/update/${id}`,
     {fname, lname, token})
    .then((res) =>{
      if(res?.data?.message === "update Successful"){
        dispatch(updateUser(res?.data?.user))
        setLoading(false)
        swal("Good Job",res?.data?.message, "success")
        navigate("/")
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
                
               
               
                
                
                <Button onClick={handleSubmit} color="info" type="button" >
                 {loading ? "updating..." : "update"}
                </Button>
              </form>
             
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Update;
