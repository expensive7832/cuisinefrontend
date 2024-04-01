import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { Container, Row, Col } from "reactstrap";

import categoryImg01 from "../../../assets/images/category-01.png";
import categoryImg02 from "../../../assets/images/category-02.png";
import categoryImg03 from "../../../assets/images/category-03.png";
import categoryImg04 from "../../../assets/images/category-04.png";
import categoryrep from "../../../assets/images/categoryrep.png";

import "../../../styles/category.css";
import swal from "sweetalert";



const Category = ({data}) => {

  const role = useSelector((state) => state?.user?.userData?.role);
  const id = useSelector((state) => state?.user?.userData?.id);

  const navigate = useNavigate()

  const handleClick = async(item) =>{

   await axios.delete(`${process.env.REACT_APP_API_URL}/deleteCat/?userid=${id}&itemid=${item?.id}&imgid=${item?.imgid}`)
   .then((res) => {
    swal("Done", res?.data?.message, "success")
    window.location.reload()
   })
   .catch((err) => {

    for(let i in err.response.data){
      swal("error",err?.response?.data[i], "error")
    }

   })
  }

  return (
    <Container>
      <Row>
        {data.map((item, index) => (
          <Col md="3" sm="6" xs="6" className="mb-4" key={index}>
            <div className="category__item d-flex justify-content-between align-items-center gap-1">
              <div className="category__img">
                {item?.img === null ? 
                <img src={categoryrep} alt="category representation"/>
                
                :

                <img src={item?.img} alt="category photo" />

                }
              </div>
              
              <h6>{item.title}</h6>
              

              {role === true &&
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
