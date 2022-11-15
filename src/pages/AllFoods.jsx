import React, { useLayoutEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col, Button } from "reactstrap";
import ProductCard from "../components/UI/product-card/ProductCard";
import ReactPaginate from "react-paginate";
import "../styles/all-foods.css";
import "../styles/pagination.css";
import { useEffect } from "react";
import axios from "axios";

const AllFoods = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [foods, setFoods] = useState([]);
  const [options, setOptions] = useState("all");
  
  
  const [foodCount, setFoodCount] = useState(2)

  
const handleSearch = async() => {
  await axios?.post(`https://cuisinetreat-api.onrender.com/getFoodSearch/`, {search: searchTerm})
  .then((res) => setFoods(res?.data?.food))
  .catch((err) => console.log(err))
}

 
 
  useEffect(() => {
   if(options === "all"){
    axios.get(`https://cuisinetreat-api.onrender.com/getFood/`)
    .then((res) => setFoods(res?.data?.food))
   
    .catch((err) => console.log(err))
   }else if(options === "low"){
    axios.get(`https://cuisinetreat-api.onrender.com/foodLowPrice/`)
    .then((res) => setFoods(res?.data?.food))
    .catch((err) => console.log(err))
   }else if(options === "high"){
    axios.get(`https://cuisinetreat-api.onrender.com/foodHighPrice/`)
    .then((res) => setFoods(res?.data?.food))
    .catch((err) => console.log(err))
   }
  }, [options])


  return (
    <Helmet title="All-Foods">
      <CommonSection title="All Foods" />

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6" xs="12">
              <div className="search__widget d-flex align-items-center justify-content-between ">
                <input
                  type="text"
                  placeholder="I'm looking for...."
                  value={searchTerm}
          
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span>
                  <i class="ri-search-line" onClick={handleSearch}></i>
                </span>
              </div>
            </Col>
            <Col lg="6" md="6" sm="6" xs="12" className="mb-5">
              <div className="sorting__widget text-end">
                <select className="w-50" value={options} onChange={(e) => setOptions(e.target.value)}>
                  <option value="all">Default</option>
                  <option value="high">High Price</option>
                  <option value="low">Low Price</option>
                </select>
              </div>
            </Col>

            {foodCount !== 0 ?foods?.slice(0, foodCount)?.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                <ProductCard item={item} />
              </Col>
            )) :
            <h1>No Food</h1>
            }

            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-md btn-secondary" onClick={() => setFoodCount(foodCount - 1)}>Reduce</button>
              <button className="btn btn-md btn-danger" onClick={() => setFoodCount(foodCount + 1)}>LoadMore</button>
            </div>
           
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AllFoods;
