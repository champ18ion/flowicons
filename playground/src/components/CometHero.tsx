const styles = `
.comet-circle-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  perspective: 1500px;
}

.comet-circle-wrapper {
  position: absolute;
  transform-style: preserve-3d;
  pointer-events: none;
}

.comet-circle1 {
  transform: rotateX(60deg) rotateY(20deg) rotateZ(5deg);
  top: 0;
  left: -15%;
  width: 75%;
  height: 75%;
}

.comet-circle2 {
  transform: rotateX(-60deg) rotateY(20deg) rotateZ(5deg);
  top: -10%;
  left: 25%;
  width: 100%;
  height: 100%;
}

.comet-circle3 {
  transform: rotateX(60deg) rotateY(-20deg) rotateZ(5deg);
  top: 20%;
  left: -5%;
  width: 80%;
  height: 80%;
}

.comet-circle4 {
  transform: rotateX(-60deg) rotateY(-20deg) rotateZ(5deg);
  top: 15%;
  left: 20%;
  width: 100%;
  height: 100%;
}
`;

/**
 * Four SVG rings rotated in 3D and animated around their own dash offset,
 * reading as slow-orbiting comet trails. Recolored from the original
 * teal/orange/rose/amber into the site's accent/indigo family so it sits
 * behind the hero type instead of competing with it.
 */
export default function CometHero() {
  return (
    <>
      <style>{styles}</style>
      <div className="comet-circle-container">
        <div className="comet-circle-wrapper comet-circle1">
          <svg viewBox="0 0 600 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision">
            <defs>
              <linearGradient id="comet-grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
                <stop offset="100%" stopColor="#0b0e14" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <circle cx="300" cy="300" r="250" fill="none" stroke="url(#comet-grad1)" strokeWidth="0.75"
                    strokeDasharray="520 1050" strokeDashoffset="20">
              <animate attributeName="stroke-dashoffset" from="20" to="1590" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        <div className="comet-circle-wrapper comet-circle2">
          <svg viewBox="0 0 800 800" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision">
            <defs>
              <linearGradient id="comet-grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="-20%" stopColor="#0ea5e9" stopOpacity="0.05" />
                <stop offset="80%" stopColor="#0ea5e9" stopOpacity="1" />
              </linearGradient>
            </defs>
            <circle cx="400" cy="400" r="300" fill="none" stroke="url(#comet-grad2)" strokeWidth="0.75"
                    strokeDasharray="900 985" strokeDashoffset="0">
              <animate attributeName="stroke-dashoffset" from="0" to="-1885" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        <div className="comet-circle-wrapper comet-circle3">
          <svg viewBox="0 0 600 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision">
            <defs>
              <linearGradient id="comet-grad3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="1" />
                <stop offset="100%" stopColor="#312e81" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <circle cx="300" cy="300" r="150" fill="none" stroke="url(#comet-grad3)" strokeWidth="0.75"
                    strokeDasharray="400 542" strokeDashoffset="60">
              <animate attributeName="stroke-dashoffset" from="60" to="1002" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        <div className="comet-circle-wrapper comet-circle4">
          <svg viewBox="0 0 800 800" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision">
            <defs>
              <linearGradient id="comet-grad4" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="-20%" stopColor="#6366f1" stopOpacity="0.05" />
                <stop offset="80%" stopColor="#6366f1" stopOpacity="1" />
              </linearGradient>
            </defs>
            <circle cx="400" cy="400" r="200" fill="none" stroke="url(#comet-grad4)" strokeWidth="0.75"
                    strokeDasharray="500 756" strokeDashoffset="300">
              <animate attributeName="stroke-dashoffset" from="300" to="-956" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </div>
    </>
  );
}
