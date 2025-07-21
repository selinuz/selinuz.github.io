"use client";
import React, { useState, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "@/components/ProjectFilter";
import { projects as allProjects } from "@/data/projects";
import "@/styles/projects.css";

const Projects: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const toggleExpanded = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const allSkills = Array.from(new Set(allProjects.flatMap((p) => p.skills)));

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const resetFilters = () => {
    setSelectedSkills([]);
  };

  const sortByDate = (a: string, b: string): number => {
    const extractYear = (str: string) => {
      const match = str.match(/\b(\d{4})/);
      return match ? parseInt(match[1]) : 0;
    };
    const yearA = extractYear(a);
    const yearB = extractYear(b);
    return sortOrder === "asc" ? yearA - yearB : yearB - yearA;
  };

  const filteredProjects = useMemo(() => {
    const filtered =
      selectedSkills.length === 0
        ? allProjects
        : allProjects.filter((project) =>
            project.skills.some((skill) => selectedSkills.includes(skill))
          );

    return filtered.sort((a, b) => sortByDate(a.duration, b.duration));
  }, [selectedSkills, sortOrder]);

  return (
    <div id="projects" className="section">
      <h1>Projects</h1>

      <div id="controls">
        <div id="sort-filter-controls">
          <div className="dropdown" id="sort-dropdown">
            <button className="dropbtn">Sort by Date ▼</button>
            <div className="dropdown-content">
              <button onClick={() => setSortOrder("desc")}>Most Recent</button>
              <button onClick={() => setSortOrder("asc")}>Least Recent</button>
            </div>
          </div>

          <ProjectFilter
            allSkills={allSkills}
            selectedSkills={selectedSkills}
            toggleSkill={toggleSkill}
            resetFilters={resetFilters}
          />
        </div>
      </div>

      <div id="projects-section">
        {filteredProjects.map((project) => (
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
