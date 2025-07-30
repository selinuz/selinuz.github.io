"use client";
import React from "react";
import "../styles/contact.css";
import Image from "next/image";

const Contact: React.FC = () => {
  return (
    <section id="contact" className="section">
      <div className="contact-info">
        <h1>Let&apos;s Chat!</h1>
        <p>Feel free to send me an email or connect via LinkedIn.</p>
        <div className="contact-container">
          <div className="contact-line">
            <a
              href="mailto:uz.eceselin@gmail.com"
              target="_blank"
              rel="noopener noreferrer">
              <Image src="/mail.svg" alt="Mail" width={24} height={24} />
            </a>

            <a
              href="https://www.linkedin.com/in/selin-uz/"
              target="_blank"
              rel="noopener noreferrer">
              <Image
                src="/linkedin.svg"
                alt="LinkedIn"
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
