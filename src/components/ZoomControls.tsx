interface ZoomProps {
  zoom: number;
  setZoom: (value: number) => void;
}

export default function ZoomControls({ zoom, setZoom }: ZoomProps) {
  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

  return (
    <div id="zoom-controls">
      <button onClick={() => setZoom(clamp(zoom + 0.1, 0.5, 2))}>+</button>
      <button onClick={() => setZoom(clamp(zoom - 0.1, 0.5, 2))}>−</button>
    </div>
  );
}
