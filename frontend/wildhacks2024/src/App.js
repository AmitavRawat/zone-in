// import Map1 from "./StreetView"; // Adjust the import path according to your file structure
// import Spline from "@splinetool/react-spline";

// function App() {
//   return (
//     <div>
//       <Map1 />
//       <Spline scene="https://prod.spline.design/nbiF76oti5m0bI3z/scene.splinecode" />
//     </div>
//   );
// }

// export default App;

// import React, { useState } from "react";
// import Map1 from "./StreetView"; // Adjust the import path according to your file structure
// import Spline from "@splinetool/react-spline";

// function App() {
//   const [showMap, setShowMap] = useState(false);

//   const onObjectHover = (event) => {
//     // Check if the hovered object is the sphere
//     console.log(event);
//     if (event.target === "Sphere") {
//       // Replace with your actual sphere object name
//       setShowMap(true);
//     }
//   };

//   return (
//     <div>
//       {!showMap && (
//         <Spline
//           scene="https://prod.spline.design/nbiF76oti5m0bI3z/scene.splinecode"
//           onMouseEnter={onObjectHover} // This is speculative; the actual prop may differ
//         />
//       )}
//       {showMap && <Map1 />}
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useRef } from "react";
// import { Application } from "@splinetool/runtime";
// import Map1 from "./StreetView";

// function App() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const spline = new Application(canvas);

//     spline
//       .load("https://prod.spline.design/nbiF76oti5m0bI3z/scene.splinecode")
//       .then(() => {
//         // Fetch and log all objects
//         const allObjects = spline.getAllObjects();
//         console.log("All Objects:", allObjects);

//         // Fetch and log all Spline events
//         const splineEvents = spline.getSplineEvents();
//         console.log("All Spline Events:", splineEvents);
//       });
//   }, []);

//   return (
//     <div style={{ width: "100vw", height: "100vh" }}>
//       <canvas ref={canvasRef} />
//       {/* Map1 component or any other component you want to render */}
//       <Map1 />
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect, useRef } from "react";
import { Application } from "@splinetool/runtime";
import Map1 from "./StreetView";

function App() {
  const [showMap, setShowMap] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const spline = new Application(canvasRef.current);

      spline
        .load("https://prod.spline.design/nbiF76oti5m0bI3z/scene.splinecode")
        .then(() => {
          // Assuming the UUID of the sphere is the one you found
          const sphereUUID = "689501da-8e4f-40f6-924c-8625dbffce3e";

          // Add event listener for mouse hover on the sphere
          spline.addEventListener("mouseHover", (event) => {
            if (event.target.id === sphereUUID) {
              setTimeout(() => {
                setShowMap(true);
              }, 5000);
              //setShowMap(true); // Will cause the Map1 component to render
            }
          });
        });
    }
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {!showMap && (
        <canvas ref={canvasRef} /> // Spline scene will be attached to this canvas
      )}
      {showMap && (
        <Map1 /> // Render the Map1 component when showMap is true
      )}
    </div>
  );
}

export default App;
