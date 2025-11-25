import { useState, useRef, useEffect } from "react";
import "./Home.css";

import Navbar from "../NAVBAR/navbar";
import Hero from "../HERO/Hero";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
}

export default Home;
