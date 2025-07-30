"use client";
import React from "react";
import "../styles/home.css";
import Image from "next/image";

const Landing: React.FC = () => {
  return (
    <section id="landing" className="section">
      <h3>Hello, world!</h3>
      <p>
        <strong>I’m Selin, and this is a window into my world. </strong>
        More than just a resume or LinkedIn page, this space is where I share my
        journey, the projects I’ve built, and the values that guide me.
      </p>

      <div className="contact-container">
        <div className="contact-line">
          <a href="mailto:uz.eceselin@gmail.com">
            <Image src="/mail.svg" alt="Email" width={24} height={24} />
          </a>{" "}
          <a
            href="https://www.linkedin.com/in/selin-uz/"
            target="_blank"
            rel="noopener noreferrer">
            <Image src="/linkedin.svg" alt="LinkedIn" width={24} height={24} />
          </a>
          <a
            href="https://github.com/selinuz"
            target="_blank"
            rel="noopener noreferrer">
            <Image src="/github.svg" alt="GitHub" width={24} height={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Landing;
