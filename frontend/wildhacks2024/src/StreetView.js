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
        this.setState({ center: { lat: lat(), lng: lng() }, zoom: 15, showStreetView: true });
      }
    });
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.handleSearch();
    }
  };

  handleMapClick = () => {
    if (this.state.showStreetView) {
      const map = this.mapRef.current;
      const streetViewService = new window.google.maps.StreetViewService();

      streetViewService.getPanorama({ location: this.state.center, radius: 50 }, (data, status) => {
        if (status === "OK") {
          const panorama = new window.google.maps.StreetViewPanorama(
            document.getElementById("street-view"),
            { position: data.location.latLng }
          );
          map.setStreetView(panorama);
        }
      });
    }
  };

  render() {
    const { address } = this.state;

    return (
      <div style={{ position: "relative", height: "100vh" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: 1, paddingTop: "20px" }}>
          <input
            type="text"
            value={address}
            onChange={this.handleAddressChange}
            onKeyPress={this.handleKeyPress}
            placeholder="Enter an address, include city and state"
            style={{ padding: "10px", borderRadius: "5px", marginRight: "10px", border: "1px solid #ccc", width: "300px" }} // Adjust width here
          />
          <button onClick={this.handleSearch} style={{ padding: "10px 20px", borderRadius: "5px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>Search</button>
        </div>
        <LoadScriptNext googleMapsApiKey={APIkey}>
          <GoogleMap
            ref={this.mapRef}
            mapContainerStyle={{ height: "100%", width: "100%" }}
            zoom={this.state.zoom}
            center={this.state.center}
            onClick={this.handleMapClick}
          >
            {this.state.showStreetView && (
              <StreetViewPanorama id="street-view" position={this.state.center} visible={true} />
            )}
          </GoogleMap>
        </LoadScriptNext>
      </div>
    );
  }
}

export default Map1;
