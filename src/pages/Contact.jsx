import React from "react";
import { useState } from "react";
import { Container, Row } from "reactstrap";
import mailer from "nodemailer"
import axios from "axios";
import map from "./../assets/images/map.webp"

const Contact = () => {

 

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [msg, setMsg] = useState("")

  const handleClick = async() =>{
    await axios.post("/contact", {
      name,
      msg,
      email,
      subject
    })
    .then((res) => alert(res?.data?.message))
    .catch((e) => console.log(e))
    }


  return (
   <Container className="w-75">
     <div className="contact mb-4">
      


      <h2 className="h1-responsive font-weight-bold text-center my-4">Contact us</h2>

      <p className="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
        a matter of hours to help you.</p>

      <Row className="align-items-center">


        <div className="col-md-9 mb-md-0 mb-5">

            <div className="row">

              <div className="col-md-6">
                <div className="md-form mb-0">
                  <label for="name" className="">Your name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" className="form-control" />
                </div>
              </div>



              <div className="col-md-6">
                <div className="md-form mb-0">
                  <label for="email" className="">Your email</label>
                  <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                </div>
              </div>


            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="md-form mb-0">
                  <label for="subject" className="">Subject</label>
                  <input type="text" id="subject" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="form-control" />
                </div>
              </div>
            </div>


            <div className="row">


              <div className="col-md-12">

                <div className="md-form">
                  <label for="message" className="d-block">Message</label>
                  <textarea type="text" value={msg} onChange={(e) => setMsg(e.target.value)} id="message" name="message" rows="2" class="form-control md-textarea"></textarea>
                </div>

              </div>
            </div>

          <button className="btn btn-secondary w-100 mt-3" onClick={handleClick}>Send</button>
          
        </div>



        <div className="col-md-3 text-center">
          <ul className="list-unstyled mb-0">
            <li><i class="ri-map-pin-user-fill"></i>
              <p>Daddy Oniyinde Street Agege, Lagos</p>
            </li>

            <li><i className="ri-phone-fill fa-2x"></i>
              <a href="tel:+2348166398746"><p>+(234) - 8166398746</p></a>
            </li>

            <li><i class="ri-mail-fill"></i>
              <a href="mailto:expensive7832@gmail.com"><p>expensive7832@gmail.com</p></a>
            </li>
          </ul>
        </div>


      </Row>

    


  </div>
   </Container>
  )
};

export default Contact;
