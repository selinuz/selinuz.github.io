"use client";
import React from "react";
import "../styles/home.css";
import Image from "next/image";

const Landing: React.FC = () => {
  return (
    <section id="landing" className="section">
      <h3>Hello, world!</h3>
      <p>
        <strong>I’m Selin, and this site is a window into my world—</strong>
        offering a glimpse beyond what a resume or LinkedIn profile can show,
        highlighting my passions, core values, and the work I’ve created.
      </p>

      <div className="contact-container">
        <div className="contact-line">
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
          <a href="mailto:uz.eceselin@gmail.com">
            <Image src="/mail.svg" alt="Email" width={24} height={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Landing;
