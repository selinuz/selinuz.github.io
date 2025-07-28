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
            <a
              href="https://github.com/selinuz"
              target="_blank"
              rel="noopener noreferrer">
              <Image src="/github.svg" alt="GitHub" width={24} height={24} />
            </a>
          </div>
        </div>
      </div>

      <form
        className="contact-form"
        action="https://formspree.io/f/xdkkykql"
        method="POST">
        <div className="form-group">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Enter your message"
            rows={5}
            required></textarea>
        </div>
        <button type="submit" className="submit-button">
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
