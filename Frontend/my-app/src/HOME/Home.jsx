import { useState, useRef, useEffect } from "react";
import "./Home.css";

import Navbar from "../NAVBAR/navbar";
import Hero from "../HERO/Hero";
import Footer from "../FOOTER/Footer";
import Contact from "../CONTACT/contact";
import Ourservices from "../OURSERVICES/Ourservices";

function Home() {
  return (
    <div>
      <div id="navbar">
        <Navbar />
      </div>

      <div id="hero">
        <Hero />
      </div>

      <div id="ourservices">
        <Ourservices />
      </div>

      <div id="contact">
        <Contact />
      </div>

      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
