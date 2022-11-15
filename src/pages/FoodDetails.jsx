import React, { useState, useEffect } from "react";
import products from "../assets/fake-data/products";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { addItem } from "../store/Slices/cartSlice";

import "../styles/product-details.css";

import ProductCard from "../components/UI/product-card/ProductCard";
import axios from "axios";

const FoodDetails = () => {

  const [tab, setTab] = useState("desc");
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [reviewMsg, setReviewMsg] = useState("");
  const [allFoods, setAllFoods] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({})
  const { title, price, cat, description, imgs } = product;

  const [previewImg, setPreviewImg] = useState(() => {
    imgs && setPreviewImg(JSON.parse(imgs[0])?.imgUrls);
  });
  const relatedProduct = cat && allFoods?.filter((item) => cat[0] === item.cat[0]);

   

  useEffect(() => {
    axios.post(`https://cuisinetreat-api.onrender.com/getFood/`)
      .then((res) => setAllFoods(res?.data?.food))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    axios.post(`https://cuisinetreat-api.onrender.com/getFoodDetails/${id}`)
      .then((res) => setProduct(res?.data?.food[0]))
      .catch((err) => console.log(err))
  }, [])



  const addToCart = () => {
    dispatch(
      addItem({ ...product, imgs: previewImg })
    )}

  const submitHandler = (e) => {
    e.preventDefault();

    axios.post("https://cuisinetreat-api.onrender.com/review", {
      name: enteredName,
      email: enteredEmail,
      review: reviewMsg
    }).then((res) => {
      if (res?.data?.msg === "review submitted") {
        swal("Good Job",res?.data?.msg, "success")
        window.location.reload()
      }
    }).catch((e) => console.log(e))
  };

  useEffect(() => {
    imgs && setPreviewImg(JSON.parse(imgs[0])?.imgUrls);
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  useEffect(() => {
    axios.get("https://cuisinetreat-api.onrender.com/review")
      .then((res) => setReviews(res.data.review))
      .catch((err) => console.log(err))
  }, []);



  return (


    <Helmet title="Product-details">
      <CommonSection title={title} />

      <section>
        <Container>
          <Row>
            <Col lg="2" md="2">
              <div className="product__images ">

                {imgs?.map((img, i) => (
                  <div key={i}
                    className="img__item mb-3"
                    onClick={() => setPreviewImg(JSON.parse(img)?.imgUrls)}
                  >
                    <img src={JSON.parse(img)?.imgUrls} alt={title} className="w-50" />

                  </div>
                ))}

              </div>
            </Col>

            <Col lg="4" md="4">
              <div className="product__main-img">
                <img src={previewImg} alt="" className="w-100" />
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="single__product-content">
                <h2 className="product__title mb-3">{title}</h2>
                <p className="product__price">
                  {" "}
                  Price: <span>${price}</span>
                </p>
                <p className="category mb-5">
                  Category: {cat?.map((a) => <span>{a}</span>)}
                </p>

                <button onClick={addToCart} className="addTOCart__btn">
                  Add to Cart
                </button>
              </div>
            </Col>

            <Col lg="12">
              <div className="tabs d-flex align-items-center gap-5 py-3">
                <h6
                  className={` ${tab === "desc" ? "tab__active" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={` ${tab === "rev" ? "tab__active" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Review
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab__content">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="tab__form mb-3">
                  {
                    reviews?.map((review) => (
                      <div className="review pt-5">
                        <p className="user__name mb-0">{review?.name}</p>
                        <p className="user__email">{review?.email}</p>
                        <p className="feedback__text">{review?.review}</p>
                      </div>
                    ))
                  }

                  <form className="form" onSubmit={(e) => submitHandler(e)}>
                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="Enter your name"
                        onChange={(e) => setEnteredName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="Enter your email"
                        onChange={(e) => setEnteredEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form__group">
                      <textarea
                        rows={5}
                        type="text"
                        placeholder="Write your review"
                        onChange={(e) => setReviewMsg(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="addTOCart__btn">
                      Submit
                    </button>
                  </form>
                </div>
              )}
            </Col>

            <Col lg="12" className="mb-5 mt-4">
              <h2 className="related__Product-title">You might also like</h2>
            </Col>

            {
              relatedProduct?.length > 0 ?
                relatedProduct.map((item) => (
                  <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
                    <ProductCard item={item} />
                  </Col>
                )) :

                <h1 className="h2 text-warning">No Data</h1>
            }
          </Row>
        </Container>
      </section>
    </Helmet>

  );
};

export default FoodDetails;
