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

import ScrollToTop from "../ScrollTop/ScrollToTop";

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
              </>
            }
          />

          {/* Find My Car */}
          <Route
            path="/findcar"
            element={
              <>
                <section id="findcar">
                  <ScrollToTop />
                  <Findcar />
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
                  <ScrollToTop />
                  <Report />
                </section>
              </>
            }
          />

          {/* Expense forecast */}
          <Route
            path="/expense"
            element={
              <>
                <section id="expense">
                  <ScrollToTop />
                </section>
              </>
            }
          />
        </Routes>

        {/* Car listing */}
        <Route
          path="/listcar"
          element={
            <>
              <section id="listcar">
                <ScrollToTop />
                <Findcar />
              </section>
            </>
          }
        />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
