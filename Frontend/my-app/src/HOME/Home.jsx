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
      <Navbar />
      <Hero />
      <Ourservices />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
