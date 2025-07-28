"use client";
import React, { useState } from "react";

type CoreValueBoxProps = {
  id: string;
  label: string;
  definition: string;
  x: number;
  y: number;
  isHighlighted: boolean;
};

export default function CoreValueBox({
  id,
  label,
  definition,
  x,
  y,
  isHighlighted,
}: CoreValueBoxProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      id={id}
      className={`core-value ${expanded ? "expanded" : ""} ${
        isHighlighted ? "highlight" : ""
      }`}
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%)",
      }}
      onClick={() => setExpanded(!expanded)}>
      <div className="core-value-header">
        <h3>{label}</h3>
      </div>
      <p className="definition">{definition}</p>
    </div>
  );
}
