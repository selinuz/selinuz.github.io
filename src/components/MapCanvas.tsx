"use client";
import { useEffect, useRef, useState } from "react";
import CoreValueBox from "./CoreValueBox";
import ActivityBox from "./ActivityBox";
import ZoomControls from "./ZoomControls";
import ConnectionLines from "./ConnectionLines";
import { coreValues, activities, connections } from "../data/core-values";
import "../styles/core-values.css";

export default function MapCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(
    null
  );
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setSize({ width, height });
      }
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.style.transform = `scale(${zoom})`;
  }, [zoom]);

  // Toggle selection
  const handleActivityClick = (id: string) => {
    setSelectedActivityId((prev) => (prev === id ? null : id));
  };

  function toPosition(
    x: number,
    y: number,
    width: number,
    height: number,
    zoom: number
  ) {
    const baseSpacing = windowWidth < 768 ? 100 : 200;
    const spacing = baseSpacing * zoom;

    return {
      x: width / 2 + x * spacing,
      y: height / 2 + y * spacing,
    };
  }

  return (
    <div id="map">
      <ZoomControls zoom={zoom} setZoom={setZoom} />
      <div id="map-content" ref={containerRef}>
        <ConnectionLines selectedActivityId={selectedActivityId} />

        {coreValues.map((val) => {
          const isHighlighted = selectedActivityId
            ? connections.some(
                (conn) =>
                  (conn.from === selectedActivityId && conn.to === val.id) ||
                  (conn.to === selectedActivityId && conn.from === val.id)
              )
            : false;
          const pos = toPosition(val.x, val.y, size.width, size.height, zoom);
          return (
            <CoreValueBox
              key={val.id}
              {...val}
              {...pos}
              isHighlighted={isHighlighted}
            />
          );
        })}

        {activities.map((act) => (
          <ActivityBox
            key={act.id}
            {...act}
            {...toPosition(act.x, act.y, size.width, size.height, zoom)}
            isSelected={selectedActivityId === act.id}
            onClick={() => handleActivityClick(act.id)}
          />
        ))}
      </div>
    </div>
  );
}
