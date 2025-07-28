"use client";
import React from "react";
import "../styles/about.css";

const About: React.FC = () => {
  return (
    <section id="about" className="section">
      <h1>About Me</h1>
      <p>
        I’m a senior Computer Science student at UBC with a passion for solving
        problems through creative and critical thinking. I love building
        meaningful projects, improving processes, and making things more
        efficient.
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
        move from my home country, Türkiye, to Canada to pursue my education.
      </p>
      <p>
        Outside of academics, I’m passionate about sailing and (try to) spend my
        summers out on the ocean. I enjoy reading philosophy, feminist
        literature, and history, which sharpen my critical thinking skills.
      </p>
    </section>
  );
};

export default About;
