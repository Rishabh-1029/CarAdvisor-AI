import { useState, useRef, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./Home.css";

import Navbar from "../NAVBAR/navbar";
import Hero from "../HERO/Hero";
import Footer from "../FOOTER/Footer";
import Contact from "../CONTACT/contact";
import Ourservices from "../OURSERVICES/Ourservices";

import Findcar from "../FINDCAR/Findcar";
import Report from "../REPORT/Report";

function Home() {
  return (
    <div>
      <div id="navbar">
        <Navbar />
      </div>
      <div className="Main-layout">
        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={
              <>
                <section id="hero">
                  <Hero />
                </section>
                <section id="ourservices">
                  <Ourservices />
                </section>
                <section id="contact">
                  <Contact />
                </section>
                <section id="footer">
                  <Footer />
                </section>
              </>
            }
          />

          {/* Find My Car */}
          <Route
            path="/findcar"
            element={
              <>
                <section id="findcar">
                  <Findcar />
                </section>
                <section id="footer">
                  <Footer />
                </section>
              </>
            }
          />

          {/* Report */}
          <Route
            path="/report"
            element={
              <>
                <section id="report">
                  <Report />
                </section>
                <section id="footer">
                  <Footer />
                </section>
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
