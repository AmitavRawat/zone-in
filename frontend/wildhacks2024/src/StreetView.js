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
      message: "",
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

  handleSendMessage = () => {
    const { message } = this.state;
    // Do something with the message, for now, we'll just log it
    console.log("Message:", message);
    // Clear the message input
    this.setState({ message: "" });
  };

  render() {
    const { address, message } = this.state;

    return (
      <div style={{ position: "relative", height: "100vh", width: "100%" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: 1, paddingTop: "20px" }}>
          <input
            type="text"
            value={address}
            onChange={this.handleAddressChange}
            onKeyPress={this.handleKeyPress}
            placeholder="Enter an address"
            style={{ padding: "10px", borderRadius: "5px", marginRight: "10px", border: "1px solid #ccc", width: "400px" }} // Adjust width here
          />
          <button onClick={this.handleSearch} style={{ padding: "10px 20px", borderRadius: "5px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>Search</button>
        </div>
        <LoadScriptNext googleMapsApiKey={APIkey}>
          <GoogleMap
            ref={this.mapRef}
            mapContainerStyle={{ height: "100%", width: "100%" }}
            zoom={this.state.zoom}
            center={this.state.center}
          >
            {this.state.showStreetView && (
              <StreetViewPanorama id="street-view" position={this.state.center} visible={true} options={{ containerStyle: { height: "80vh", width: "100%" }}} />
            )}
          </GoogleMap>
        </LoadScriptNext>
        {this.state.showStreetView && (
          <div style={{ position: "absolute", bottom: "0", left: "50%", transform: "translateX(-50%)", zIndex: 1, width: "100%" }}>
            <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", maxWidth: "600px", margin: "0 auto" }}>
              <input 
                type="text" 
                value={message} 
                onChange={(e) => this.setState({ message: e.target.value })} 
                placeholder="Type your message..." 
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "calc(100% - 80px)", marginRight: "10px" }} 
              />
              <button 
                onClick={this.handleSendMessage} 
                style={{ padding: "10px 20px", borderRadius: "5px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Map1;
