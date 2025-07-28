import React from "react";
import Image from "next/image";
import { Project } from "../data/projects";

interface Props {
  project: Project;
  expanded: boolean;
  toggleExpanded: (id: string) => void;
}

const ProjectCard: React.FC<Props> = ({
  project,
  expanded,
  toggleExpanded,
}) => {
  return (
    <div className="project-box" onClick={() => toggleExpanded(project.id)}>
      <div className="project-header">
        <h3>{project.title}</h3>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-icon"
            onClick={(e) => e.stopPropagation()}>
            <Image
              src={project.iconType === "github" ? "/github.svg" : "/link.svg"}
              alt={
                project.iconType === "github" ? "GitHub Link" : "External Link"
              }
              width={24}
              height={24}
            />
          </a>
        )}
      </div>

      <p className="subtitle">{project.subtitle}</p>

      <p className="duration">{project.duration}</p>
      <p>{project.description}</p>

      <div className="skills">
        {project.skills.map((skill) => (
          <div key={skill} className="skill-box">
            {skill}
          </div>
        ))}
      </div>

      <p className="click-to-expand">Click to see more...</p>

      {expanded && (
        <div className="project-details">
          {project.detailsTitle && (
            <p>
              <strong>{project.detailsTitle}</strong>
            </p>
          )}
          <ul>
            {project.details.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          {project.context && <p className="detail">{project.context}</p>}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
