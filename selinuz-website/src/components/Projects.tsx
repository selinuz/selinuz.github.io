"use client";
import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";
import "@/styles/projects.css";

const Projects: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div id="projects" className="section">
      <h1>Projects</h1>
      <div id="projects-section">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            expanded={expandedId === project.id}
            toggleExpanded={toggleExpanded}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
