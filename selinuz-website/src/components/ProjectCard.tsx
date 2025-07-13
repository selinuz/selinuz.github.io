import React from "react";
import Image from "next/image";
import { Project } from "@/data/projects";

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
            className="project-icon"
            onClick={(e) => e.stopPropagation()}>
            <Image
              src={project.iconType === "github" ? "/github.svg" : "/link.svg"}
              alt="External Link"
              width={20}
              height={20}
            />
          </a>
        )}
      </div>
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
            <p className="detail">{project.detailsTitle}</p>
          )}
          <ul>
            {project.details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
          {project.context && (
            <p className="project-context">
              <em>{project.context}</em>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
