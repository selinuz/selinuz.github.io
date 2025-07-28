"use client";
import React, { useState } from "react";
import "../styles/navbar.css";
import "../styles/variables.css";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className={menuOpen ? "open" : ""}>
      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className="nav-links">
        <li>
          <a href="#landing">Welcome</a>
        </li>
        <li>
          <a href="#about">Who I Am</a>
        </li>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#values">My Values</a>
        </li>
        <li>
          <a href="#contact">Get in Touch</a>
        </li>
      </ul>

      <div className="resume-button">
        <a href="/SelinUz_Resume.pdf" download="SelinUz_Resume">
          Resume
        </a>
      </div>

      <div className="dropdown" id="nav-dropdown">
        <a href="#landing" onClick={toggleMenu}>
          Welcome
        </a>
        <a href="#about" onClick={toggleMenu}>
          Who I Am
        </a>
        <a href="#projects" onClick={toggleMenu}>
          Projects
        </a>
        <a href="#values" onClick={toggleMenu}>
          My Values
        </a>
        <a href="#contact" onClick={toggleMenu}>
          Get in Touch
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
