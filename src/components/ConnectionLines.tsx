"use client";
import { useEffect, useRef, useCallback } from "react";
import { connections } from "../data/core-values";

export default function ConnectionLines({
  selectedActivityId,
}: {
  selectedActivityId: string | null;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  const drawLines = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.innerHTML = "";

    const svgRect = svg.getBoundingClientRect();

    connections.forEach(({ from, to }) => {
      const fromEl = document.getElementById(from);
      const toEl = document.getElementById(to);
      if (!fromEl || !toEl) return;

      const fromBox = fromEl.getBoundingClientRect();
      const toBox = toEl.getBoundingClientRect();

      const x1 = fromBox.left + fromBox.width / 2 - svgRect.left;
      const y1 = fromBox.top + fromBox.height / 2 - svgRect.top;
      const x2 = toBox.left + toBox.width / 2 - svgRect.left;
      const y2 = toBox.top + toBox.height / 2 - svgRect.top;

      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", x1.toString());
      line.setAttribute("y1", y1.toString());
      line.setAttribute("x2", x2.toString());
      line.setAttribute("y2", y2.toString());

      const isHighlighted =
        from === selectedActivityId || to === selectedActivityId;
      line.setAttribute(
        "class",
        `connection-line${isHighlighted ? " highlight" : ""}`
      );

      svg.appendChild(line);
    });
  }, [selectedActivityId]);

  useEffect(() => {
    const handleDraw = () => {
      requestAnimationFrame(() => {
        drawLines();
      });
    };

    handleDraw();
    window.addEventListener("resize", handleDraw);
    return () => window.removeEventListener("resize", handleDraw);
  }, [drawLines]);

  return (
    <svg
      ref={svgRef}
      id="connections"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
