import React from "react";
import {
  GoogleMap,
  LoadScriptNext,
  StreetViewPanorama,
} from "@react-google-maps/api";
import html2canvas from "html2canvas";

const APIkey = "AIzaSyCiUPBb4wLUT7z6z5jRTgR2q2LCpcdVgno";
const defaultCenter = {
  lat: 42.045597,
  lng: -87.688568,
};

class Map1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: defaultCenter,
      address: "",
      zoom: 8,
      showStreetView: false,
    };
    this.mapRef = React.createRef();
  }

  handleAddressChange = (event) => {
    this.setState({ address: event.target.value });
  };

  handleSearch = () => {
    const { address } = this.state;
    if (address.trim() === "") return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results[0]) {
        const { lat, lng } = results[0].geometry.location;
        this.setState({
          center: { lat: lat(), lng: lng() },
          zoom: 15,
          showStreetView: true,
        });
      } else {
        alert("Address not found!");
      }
    });
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      this.handleSearch();
    }
  };

  takeScreenshot = () => {
    // Delay the screenshot by X milliseconds to allow the map to render.
    // Adjust the delay time as necessary. Here it's set to 3000 milliseconds (3 seconds).
    setTimeout(() => {
      if (this.mapRef.current) {
        html2canvas(this.mapRef.current, { useCORS: true }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = imgData;
          link.download = "street-view-screenshot.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      }
    }, 10000);
  };

  render() {
    const { address, zoom, center, showStreetView } = this.state;

    return (
      <div style={{ height: "100vh", width: "100%" }} ref={this.mapRef}>
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
          }}
        >
          <input
            type="text"
            value={address}
            onChange={this.handleAddressChange}
            onKeyPress={this.handleKeyPress}
            placeholder="Enter an address, include city and state"
            style={{
              padding: "10px",
              borderRadius: "5px",
              marginRight: "10px",
              border: "1px solid #ccc",
              width: "300px",
            }}
          />
          <button
            onClick={this.handleSearch}
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>
        <LoadScriptNext googleMapsApiKey={APIkey}>
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            zoom={zoom}
            center={center}
          >
            {showStreetView && (
              <StreetViewPanorama
                position={center}
                visible={true}
                options={{ containerStyle: { height: "100%", width: "100%" } }}
              />
            )}
          </GoogleMap>
        </LoadScriptNext>
        {showStreetView && (
          <button
            onClick={this.takeScreenshot}
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "10px 20px",
              borderRadius: "5px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            Save Screenshot
          </button>
        )}
      </div>
    );
  }
}

export default Map1;
