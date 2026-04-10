import React, { useState, useEffect } from "react";
import "./Contact.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRegisterUrl } from "../utils/contactApi";

const Contact = () => {
  const [inputValue, setInputValue] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const getValue = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, lname, email, mobile, message } = inputValue;

    if (!fname || !lname || !email || !mobile || !message) {
      toast.error("Please fill in all fields!");
      return;
    }

    setSending(true);
    try {
      const res = await axios.post(
        getRegisterUrl(),
        { fname, lname, email, mobile, message },
        { timeout: 60000, headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 201) {
        if (res.data?.emailSent === false) {
          toast.warning(
            "Your message is saved — I'll still get it. (Email alerts aren't set up on the server yet.)",
            { autoClose: 6000 }
          );
        } else {
          toast.success("Cheers — got your message! I'll reply as soon as I can.", {
            autoClose: 5000,
          });
        }
        setInputValue({
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          message: "",
        });
      }
    } catch (error) {
      const status = error.response?.status;
      const data = error.response?.data;

      if (status === 502 && data?.saved) {
        toast.warning(
          "Your message is saved — I'll still see it. Email delivery had a hiccup; I'll reply when I can.",
          { autoClose: 6000 }
        );
        setInputValue({
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          message: "",
        });
      } else if (status === 422) {
        toast.error(data?.error || "Please fill all fields.");
      } else if (error.code === "ECONNABORTED") {
        toast.error("Request timed out. The server may be waking up — try again in a moment.");
      } else {
        console.error("Error sending message:", error);
        toast.error(data?.error || error.message || "An error occurred.");
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="container mb-5 contact" data-aos="fade-up">
        <h2 className="text-center mb-4">Contact</h2>
        <div className="container">
          <Form className="row" onSubmit={handleSubmit}>
            {sending ? (
              <div
                className="contact__sending col-12 mb-3"
                role="status"
                aria-live="polite"
                aria-busy="true"
              >
                <div className="contact__sending-inner">
                  <Spinner
                    animation="border"
                    role="presentation"
                    className="contact__spinner"
                    aria-hidden="true"
                  />
                  <div className="contact__sending-text">
                    <span className="contact__sending-title">Sending your message</span>
                    <span className="contact__sending-sub">Hang tight — just a moment.</span>
                  </div>
                </div>
              </div>
            ) : null}

            <Form.Group className="mb-3 col-lg-6">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="fname"
                value={inputValue.fname}
                onChange={getValue}
                placeholder="Enter your first name"
                disabled={sending}
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
                disabled={sending}
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
                disabled={sending}
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
                disabled={sending}
              />
            </Form.Group>

            <Form.Group className="mb-4 col-12">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="message"
                value={inputValue.message}
                onChange={getValue}
                placeholder="Write your message here"
                disabled={sending}
              />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button variant="primary" className="col-lg-6" type="submit" disabled={sending}>
                {sending ? "Sending…" : "Submit"}
              </Button>
            </div>
          </Form>
        </div>
        <ToastContainer position="top-center" closeOnClick pauseOnHover />
      </div>
    </>
  );
};

export default Contact;
