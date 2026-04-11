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
    AOS.init({ duration: 800, once: true });
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
      <main className="contact contact--reference">
        <div className="contact-watermark" aria-hidden>
          Say hi
        </div>

        <div className="contact-top">
          <div className="contact-page__shell">
            <article className="contact-page__card" data-aos="fade-up">
              <header className="contact-page__header">
                <p className="contact-page__eyebrow">Contact</p>
                <h1 className="contact-page__title">Drop a line</h1>
                <p className="contact-page__lead">
                  One thread — your details and message go straight to my inbox (and saved securely on the server).
                </p>
              </header>

              <div className="contact-chat">
                <div className="contact-chat__thread" aria-hidden="true">
                  <div className="contact-chat__row-bubble">
                    <div className="contact-chat__avatar" aria-hidden>
                      SK
                    </div>
                    <div className="contact-chat__bubble">
                      <p className="contact-chat__bubble-text">
                        Hey — what are you building, or what role are you hiring for? Drop the context below; I read
                        every message.
                      </p>
                      <span className="contact-chat__bubble-meta">Satyam · usually replies within a day</span>
                    </div>
                  </div>
                </div>

                <Form className="contact-chat__composer" onSubmit={handleSubmit}>
                  {sending ? (
                    <div className="contact__sending" role="status" aria-live="polite" aria-busy="true">
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

                  <div className="contact-chat__grid">
                    <Form.Group className="contact-chat__field">
                      <Form.Label className="contact-chat__label">First name</Form.Label>
                      <Form.Control
                        type="text"
                        name="fname"
                        value={inputValue.fname}
                        onChange={getValue}
                        placeholder="Ada"
                        disabled={sending}
                        className="contact-chat__input"
                        autoComplete="given-name"
                      />
                    </Form.Group>
                    <Form.Group className="contact-chat__field">
                      <Form.Label className="contact-chat__label">Last name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lname"
                        value={inputValue.lname}
                        onChange={getValue}
                        placeholder="Lovelace"
                        disabled={sending}
                        className="contact-chat__input"
                        autoComplete="family-name"
                      />
                    </Form.Group>
                    <Form.Group className="contact-chat__field contact-chat__field--wide">
                      <Form.Label className="contact-chat__label">Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={inputValue.email}
                        onChange={getValue}
                        placeholder="you@company.com"
                        disabled={sending}
                        className="contact-chat__input"
                        autoComplete="email"
                      />
                    </Form.Group>
                    <Form.Group className="contact-chat__field contact-chat__field--wide">
                      <Form.Label className="contact-chat__label">Mobile</Form.Label>
                      <Form.Control
                        type="text"
                        name="mobile"
                        value={inputValue.mobile}
                        onChange={getValue}
                        placeholder="+91 · optional if email is best"
                        disabled={sending}
                        className="contact-chat__input"
                        autoComplete="tel"
                      />
                    </Form.Group>
                  </div>

                  <Form.Group className="contact-chat__field contact-chat__field--message">
                    <Form.Label className="contact-chat__label">Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={inputValue.message}
                      onChange={getValue}
                      placeholder="Project context, stack, timeline, links…"
                      disabled={sending}
                      className="contact-chat__textarea"
                    />
                  </Form.Group>

                  <div className="contact-chat__footer">
                    <span className="contact-chat__hint">Press send — same as email, just routed through the site.</span>
                    <Button type="submit" className="contact-chat__send" disabled={sending}>
                      {sending ? (
                        "Sending…"
                      ) : (
                        <>
                          Send <i className="fa-solid fa-paper-plane ms-2" aria-hidden />
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </div>
            </article>
          </div>
        </div>
      </main>
      <ToastContainer position="top-center" closeOnClick pauseOnHover />
    </>
  );
};

export default Contact;
