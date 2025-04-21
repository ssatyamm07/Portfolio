import React, { useState, useEffect } from "react";
import "./Contact.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
// Optional: Toast for notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [inputValue, setInputValue] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    message: "",
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const getValue = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    //setSubmitting(true);
    const { fname, lname, email, mobile, message } = inputValue;

    if (!fname || !lname || !email || !mobile || !message) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
        const res = await axios.post("https://portfolio-1-n7cc.onrender.com/register", {
          fname,
          lname,
          email,
          mobile,
          message,
        });
      
        const data = res.data;
      
        if (res.status === 201) {
          toast.success("Message sent successfully!");
          console.log("Form submitted:", data);
          setInputValue({
            fname: "",
            lname: "",
            email: "",
            mobile: "",
            message: "",
          });
        } else {
          toast.error("Message not sent!");
        }
      } catch (error) {
        console.error("Error sending message:", error);
        toast.error("An error occurred!");
      }
    }      

  return (
    <>
      <div className="container mb-5 contact" data-aos="fade-up">
        <h2 className="text-center mb-4">📬 Contact Us</h2>
        <div className="container">
          <Form className="row" onSubmit={handleSubmit}>
            <Form.Group className="mb-3 col-lg-6">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="fname"
                value={inputValue.fname}
                onChange={getValue}
                placeholder="Enter your first name"
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lname"
                value={inputValue.lname}
                onChange={getValue}
                placeholder="Enter your last name"
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={inputValue.email}
                onChange={getValue}
                placeholder="example@example.com"
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                value={inputValue.mobile}
                onChange={getValue}
                placeholder="Enter your mobile number"
              />
            </Form.Group>

            <Form.Group className="mb-4 col-12">
              <Form.Label>message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="message"
                value={inputValue.message}
                onChange={getValue}
                placeholder="Write your message here"
              />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button variant="primary" className="col-lg-6" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Contact;
