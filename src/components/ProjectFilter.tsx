import React from "react";

interface Props {
  allSkills: string[];
  selectedSkills: string[];
  toggleSkill: (skill: string) => void;
  resetFilters: () => void;
}

const ProjectFilter: React.FC<Props> = ({
  allSkills,
  selectedSkills,
  toggleSkill,
  resetFilters,
}) => {
  return (
    <div id="filter-buttons">
      {allSkills.map((skill) => (
        <button
          key={skill}
          className={`skill-filter ${
            selectedSkills.includes(skill) ? "active" : ""
          }`}
          onClick={() => toggleSkill(skill)}>
          {skill}
        </button>
      ))}
      <button
        id="select-all"
        className={`skill-filter ${
          selectedSkills.length === 0 ? "active" : ""
        }`}
        onClick={resetFilters}>
        Select All
      </button>
    </div>
  );
};

export default ProjectFilter;
