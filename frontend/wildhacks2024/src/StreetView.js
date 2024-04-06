import React from "react";
import {
  GoogleMap,
  LoadScriptNext,
  StreetViewPanorama,
} from "@react-google-maps/api";

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
      showStreetView: false, // Track whether Street View is shown
    };
    this.mapRef = React.createRef(); // Create a reference to the Google Map
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
        this.setState({ center: { lat: lat(), lng: lng() }, zoom: 15, showStreetView: true });
      }
    });
  };

  handleMapClick = () => {
    if (this.state.showStreetView) {
      const map = this.mapRef.current;
      const streetViewService = new window.google.maps.StreetViewService();

      // Get the nearest street view position
      streetViewService.getPanorama({ location: this.state.center, radius: 50 }, (data, status) => {
        if (status === "OK") {
          const panorama = new window.google.maps.StreetViewPanorama(
            document.getElementById("street-view"),
            { position: data.location.latLng }
          );
          map.setStreetView(panorama);
        } else {
          console.error("Street View data not found for this location.");
        }
      });
    }
  };

  render() {
    const { address } = this.state;

    return (
      <div id="total" style={{ height: "100vh", width: "100vw", position: "relative" }}>
        <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}>
          <input
            type="text"
            value={address}
            onChange={this.handleAddressChange}
            placeholder="Enter an address"
          />
          <button onClick={this.handleSearch}>Search</button>
        </div>
        <LoadScriptNext googleMapsApiKey={APIkey}>
          <GoogleMap
            ref={this.mapRef} // Set the reference to the Google Map
            mapContainerStyle={{ height: "100%", width: "100%" }}
            zoom={this.state.zoom}
            center={this.state.center}
            onClick={this.handleMapClick} // Handle map click to show Street View
          >
            {this.state.showStreetView && (
              <StreetViewPanorama id="street-view" position={this.state.center} visible={true} />
            )}
          </GoogleMap>
        </LoadScriptNext>
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "20px",
            transform: "translateX(-50%)",
            width: "80%",
            maxWidth: "600px",
          }}
        ></div>
      </div>
    );
  }
}

export default Map1;
