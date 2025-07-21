"use client";
import React from "react";
import "../styles/about.css";

const About: React.FC = () => {
  return (
    <section id="about" className="section">
      <h1>About Me</h1>
      <p>
        I’m a senior Computer Science student at UBC with a passion for solving
        problems through technology and creative thinking. I love building
        meaningful projects, improving processes, and making things more
        efficient—whether it’s streamlining communication or optimizing
        workflows. I’m always excited to collaborate with others and give back
        to the communities that have shaped me.
      </p>
      <p>
        I’m honored to have received the{" "}
        <a
          href="https://you.ubc.ca/financial-planning/scholarships-awards-international-students/international-scholars/"
          target="_blank"
          rel="noopener noreferrer">
          Karen McKellin International Leader of Tomorrow Award
        </a>
        , a full-ride scholarship that recognized my academic achievements and
        leadership potential during high school. This opportunity allowed me to
        move from my home country, Türkiye, to Canada to pursue my education and
        has further motivated me to push boundaries and strive for meaningful
        impact.
      </p>
      <p>
        Outside of academics, I’m passionate about sailing and (try to) spend my
        summers out on the ocean. I’m also an avid reader of philosophy,
        feminist literature, and history, which sharpen my critical thinking
        skills.
      </p>
    </section>
  );
};

export default About;
