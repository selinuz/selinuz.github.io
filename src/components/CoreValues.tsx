import MapCanvas from "./MapCanvas";

export default function CoreValues() {
  return (
    <section id="values" className="section">
      <div id="map-container">
        <div className="map-label-container">
          <div className="map-label">Values in Action</div>
          <span className="info-button" tabIndex={0}>
            i
          </span>
          <div className="tooltip">
            <p>Instructions:</p>
            <ul>
              <li>Click on an activity to see details and highlight values.</li>
              <li>Click on a core value to expand its definition.</li>
              <li>Tap a connection line to see how they’re related.</li>
              <li>Use +/− to zoom.</li>
            </ul>
          </div>
        </div>

        <MapCanvas />
      </div>
    </section>
  );
}
