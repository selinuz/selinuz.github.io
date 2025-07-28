import React from "react";

type ActivityBoxProps = {
  id: string;
  title: string;
  location: string;
  description?: string;
  duration: string;
  x: number;
  y: number;
  isSelected: boolean;
  onClick: () => void;
};

export default function ActivityBox({
  id,
  title,
  location,
  description,
  duration,
  x,
  y,
  isSelected,
  onClick,
}: ActivityBoxProps) {
  return (
    <div
      id={id}
      className={`activity-box ${isSelected ? "highlight expanded" : ""}`}
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%)",
      }}
      onClick={onClick}>
      <p className="title">{title}</p>
      <p className="location">{location}</p>
      <p className="duration">{duration}</p>
      {isSelected && <p className="description">{description}</p>}
    </div>
  );
}
