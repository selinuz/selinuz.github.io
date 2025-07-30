"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import { connections } from "../data/core-values";

export default function ConnectionLines({
  selectedActivityId,
}: {
  selectedActivityId: string | null;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredLineId, setHoveredLineId] = useState<string | null>(null);

  const drawLines = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.innerHTML = "";
    const svgRect = svg.getBoundingClientRect();

    connections.forEach(({ from, to, text }) => {
      const fromEl = document.getElementById(from);
      const toEl = document.getElementById(to);
      if (!fromEl || !toEl) return;

      const fromBox = fromEl.getBoundingClientRect();
      const toBox = toEl.getBoundingClientRect();

      const x1 = fromBox.left + fromBox.width / 2 - svgRect.left;
      const y1 = fromBox.top + fromBox.height / 2 - svgRect.top;
      const x2 = toBox.left + toBox.width / 2 - svgRect.left;
      const y2 = toBox.top + toBox.height / 2 - svgRect.top;

      const lineId = `${from}-${to}`;
      const isHighlighted =
        from === selectedActivityId || to === selectedActivityId;
      const isHovered = hoveredLineId === lineId;

      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", x1.toString());
      line.setAttribute("y1", y1.toString());
      line.setAttribute("x2", x2.toString());
      line.setAttribute("y2", y2.toString());
      line.setAttribute("data-line-id", lineId);
      line.setAttribute(
        "class",
        `connection-line${isHighlighted ? " highlight" : ""}${
          isHovered ? " hover" : ""
        }`
      );

      line.addEventListener("mouseenter", () => setHoveredLineId(lineId));
      line.addEventListener("mouseleave", () => setHoveredLineId(null));
      svg.addEventListener("touchstart", (e) => {
        if ((e.target as Element).tagName !== "line") {
          setHoveredLineId(null);
        }
      });

      svg.appendChild(line);

      if (text) {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;

        const foreignObject = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "foreignObject"
        );
        foreignObject.setAttribute("x", (midX - 100).toString());
        foreignObject.setAttribute("y", (midY - 30).toString());
        foreignObject.setAttribute("width", "200");
        foreignObject.setAttribute("height", "100");
        foreignObject.setAttribute("data-line-id", lineId);
        if (!isHovered) {
          foreignObject.setAttribute("visibility", "hidden");
        }

        const div = document.createElement("div");
        div.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
        div.className = "line-text-box";
        div.innerHTML = text.replace(/\n/g, "<br />");

        foreignObject.appendChild(div);
        svg.appendChild(foreignObject);
      }
    });
  }, [selectedActivityId, hoveredLineId]);

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
        pointerEvents: "auto",
      }}
    />
  );
}
