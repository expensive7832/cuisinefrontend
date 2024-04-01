import React, { useLayoutEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
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
  await axios?.get(`${process.env.REACT_APP_API_URL}/getFoodSearch/?search=${searchTerm}`)
  .then((res) => setFoods(res?.data?.food))
  .catch((err) => console.log(err))
}

 
 
  useEffect(() => {
   if(options === "all"){
    axios.get(`${process.env.REACT_APP_API_URL}/getFood/`)
    .then((res) => setFoods(res?.data?.food))
   
    .catch((err) => console.log(err))
   }else if(options === "low"){
    axios.get(`${process.env.REACT_APP_API_URL}/foodLowPrice/`)
    .then((res) => setFoods(res?.data?.food))
    .catch((err) => console.log(err))

   }else if(options === "high"){
    axios.get(`${process.env.REACT_APP_API_URL}/foodHighPrice/`)
    .then((res) => setFoods(res?.data?.food))
    .catch((err) => console.log(err))
   }
  }, [options])


  return (
    <Helmet title="All-Foods">
      <CommonSection title="All Foods" />

      <section>
        <div className="container">
          <div className="align-items-center m-auto row justify-content-center justify-content-md-start  ">
            <div className="col-md-6">
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
            </div>
            <div className="mb-5  col-md-6">
              <div className="sorting__widget text-end">
                <select className="w-50" value={options} onChange={(e) => setOptions(e.target.value)}>
                  <option value="all">Default</option>
                  <option value="high">High Price</option>
                  <option value="low">Low Price</option>
                </select>
              </div>
            </div>

            {foodCount !== 0 ?foods?.slice(0, foodCount)?.map((item) => (
              <div key={item.id} className="mb-4 pb-md-5 col-lg-3 col-md-4">
                <ProductCard item={item} />
              </div>
            )) :
            <h1>No Food</h1>
            }

            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-md btn-secondary" onClick={() => setFoodCount(foodCount - 1)}>Reduce</button>
              <button className="btn btn-md btn-danger" onClick={() => setFoodCount(foodCount + 1)}>LoadMore</button>
            </div>
           
          </div>
        </div>
      </section>
    </Helmet>
  );
};

export default AllFoods;
