import { useState, useRef, useEffect } from "react";
import "./Home.css";

import Navbar from "../NAVBAR/navbar";
import Hero from "../HERO/Hero";
import Footer from "../FOOTER/Footer";
import Contact from "../CONTACT/contact";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
