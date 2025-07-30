"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import { connections } from "../data/core-values";

export default function ConnectionLines({
  selectedActivityId,
}: {
  selectedActivityId: string | null;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedLineId, setSelectedLineId] = useState<string | null>(null);

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
      const isSelected = selectedLineId === lineId;

      // Invisible hitbox for easier clicks
      const hitbox = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      hitbox.setAttribute("x1", x1.toString());
      hitbox.setAttribute("y1", y1.toString());
      hitbox.setAttribute("x2", x2.toString());
      hitbox.setAttribute("y2", y2.toString());
      hitbox.setAttribute("data-line-id", lineId);
      hitbox.setAttribute("class", "connection-hitbox");
      hitbox.style.cursor = "pointer";
      hitbox.addEventListener("click", () => {
        setSelectedLineId((prev) => (prev === lineId ? null : lineId));
      });
      svg.appendChild(hitbox);

      // Visible line
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
          isSelected ? " selected" : ""
        }`
      );
      svg.appendChild(line);

      // Line label (only visible when selected)
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
        if (!isSelected) {
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
  }, [selectedActivityId, selectedLineId]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const clearSelectionIfOutside = (e: MouseEvent | TouchEvent) => {
      if ((e.target as Element).tagName !== "line") {
        setSelectedLineId(null);
      }
    };

    const handleDraw = () => requestAnimationFrame(drawLines);

    handleDraw();
    window.addEventListener("resize", handleDraw);
    svg.addEventListener("click", clearSelectionIfOutside);
    svg.addEventListener("touchstart", clearSelectionIfOutside);

    return () => {
      window.removeEventListener("resize", handleDraw);
      svg.removeEventListener("click", clearSelectionIfOutside);
      svg.removeEventListener("touchstart", clearSelectionIfOutside);
    };
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
