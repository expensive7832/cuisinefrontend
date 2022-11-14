import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { Container, Row, Col } from "reactstrap";

import categoryImg01 from "../../../assets/images/category-01.png";
import categoryImg02 from "../../../assets/images/category-02.png";
import categoryImg03 from "../../../assets/images/category-03.png";
import categoryImg04 from "../../../assets/images/category-04.png";

import "../../../styles/category.css";



const Category = ({data}) => {

  const admin = useSelector((state) => state?.user?.userData?.admin);
  const id = useSelector((state) => state?.user?.userData?.id);

  const navigate = useNavigate()

  const handleClick = async(item) =>{

   await axios.post(`/deleteCat/${id}`, item)
   .then((res) => {
     if(res.data.message === "authorisation needed"){
       alert(res.data.message)
     }else if(res.data.message === "Category Deleted"){
       alert(res.data.message)
     }else if(res.data.message === "error"){
       alert(res.data.message)
     }
   })
   navigate("/")
  }

  return (
    <Container>
      <Row>
        {data.map((item, index) => (
          <Col md="3" sm="6" xs="6" className="mb-4" key={index}>
            <div className="category__item d-flex justify-content-between align-items-center gap-3">
              <div className="category__img">
                <img src={item.img} alt="category photo" />
              </div>
              <h6>{item.title}</h6>
              

              {Boolean(admin) === true &&
              <i class="ri-delete-bin-2-fill" style={{ fontSize: "2rem", color:"#a40000"}} onClick={() => handleClick(item)}></i>
              }
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Category;
