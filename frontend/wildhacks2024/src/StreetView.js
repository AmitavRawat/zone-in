import React from "react";
import {
  GoogleMap,
  LoadScriptNext,
  StreetViewPanorama,
} from "@react-google-maps/api";

const APIkey = "AIzaSyCiUPBb4wLUT7z6z5jRTgR2q2LCpcdVgno"; // Replace with your Google Maps API key

const center = {
  lat: 42.045597,
  lng: -87.688568,
};

class Map1 extends React.Component {
  render() {
    return (
      <div
        id="total"
        style={{ height: "100vh", width: "100vw", position: "relative" }}
      >
        <LoadScriptNext googleMapsApiKey={APIkey}>
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            zoom={8}
            center={center}
            visible={false}
          >
            <StreetViewPanorama
              position={center}
              enableCloseButton={false}
              linksControl={false}
              addressControl={true}
              visible={true}
              onLoad={(e) => {}}
              motionTracking={true}
              motionTrackingControl={true}
            />
          </GoogleMap>
        </LoadScriptNext>
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "20px",
            transform: "translateX(-50%)",
            width: "80%", // Adjust the width as necessary
            maxWidth: "600px", // Adjust the maximum width as necessary
          }}
        ></div>
      </div>
    );
  }
}

export default Map1;
