import React from "react";
import {
  GoogleMap,
  LoadScriptNext,
  StreetViewPanorama,
} from "@react-google-maps/api";
import html2canvas from "html2canvas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropzone from "react-dropzone"; // Import the drag-and-drop component

const APIkey = "";
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
      screenshotTaken: false,
      userInput: "",
      image: null,
      responseImage: null,
    };
    this.mapRef = React.createRef();
  }

  handleAddressChange = (event) => {
    this.setState({ address: event.target.value });
  };

  handleUserInputChange = (event) => {
    this.setState({ userInput: event.target.value });
  };

  onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      this.setState({ image: acceptedFiles[0] });
      toast.success("Image uploaded successfully!");
    } else {
      toast.error("Please drop a valid PNG file.");
    }
  };

  // Handle input text and image sending to API
  handleSendToApi = async (event) => {
    event.preventDefault();
    const { userInput, image } = this.state;

    if (!userInput || !image) {
      toast.error("Please provide both text and an image.");
      return;
    }

    const formData = new FormData();
    formData.append("text", userInput);
    formData.append("image", image, "house.png");
    console.log(image);

    try {
      const response = await fetch("http://localhost:8001/main", {
        method: "POST",
        body: formData,
        redirect: "follow",
      });
      console.log(response);

      if (!response.ok) {
        toast.error(`Error sending data`);
      }

      const blob = await response.blob();
      const imageSrc = URL.createObjectURL(blob);

      this.setState({ responseImage: imageSrc });

      //   if (response.ok) {

      //     // Add the new image URL to the existing list of response images in the state
      //     this.setState({
      //       userInput: '',
      //       image: null,
      //       responseImages: [...this.state.responseImages, imageUrl]
      //     });
      //     console.log(this.state.responseImages);

      //     toast.success("Message and image sent!");
      //   } else {
      //     throw new Error('API request failed');
      //   }
    } catch (error) {
      toast.error(`Error sending data: ${error.message}`);
    }
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
    if (this.mapRef.current) {
      html2canvas(this.mapRef.current, { useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "street-view-screenshot.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.setState({ screenshotTaken: true });
      });
    }
  };

  takeScreenshotBool = () => {
    this.setState({ screenshotTaken: true });
  };

  // render() {
  //   const {
  //     address,
  //     zoom,
  //     center,
  //     showStreetView,
  //     screenshotTaken,
  //     userInput,
  //   } = this.state;

  render() {
    const {
      address,
      zoom,
      center,
      showStreetView,
      screenshotTaken,
      userInput,
    } = this.state;

    // Conditional rendering after screenshot
    if (screenshotTaken) {
      return (
        <div style={{ display: "flex", height: "100vh" }}>
          <iframe
            title="chatbot"
            src="https://embed.pickaxeproject.com/axe?id=ZoneIn_A5TT2&mode=embed_gold&host=beta&..."
            style={{ width: "50%", height: "90%", border: "none" }}
            frameBorder="0"
          />
          <div
            style={{ width: "50%", height: "100%", backgroundColor: "#fff" }}
          >
            <img src={this.state.responseImage} />
            <div
              style={{ width: "100%", height: "75%", backgroundColor: "#fff" }}
            />
            <Dropzone onDrop={this.onDrop} accept=".png" multiple={false}>
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps({
                    style: {
                      /* Add styles as needed */
                    },
                  })}
                >
                  <input {...getInputProps()} />
                  <p style={{ fontFamily: "Roboto" }}>
                    Drag and drop a PNG file here or click to select:{" "}
                    {this.state.image == null ? "No Image" : "Image Uploaded"}
                  </p>
                </div>
              )}
            </Dropzone>
            <textarea
              value={userInput}
              onChange={this.handleUserInputChange}
              placeholder="Enter your input here..."
              style={{
                width: "90%",
                height: "10%",
                padding: "10px",
                border: "1px solid #ccc",
                resize: "none",
              }}
            />
            <button
              style={{
                width: "93%",
                padding: "10px 20px",
                borderRadius: "5px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                zIndex: 10,
              }}
              onClick={this.handleSendToApi}
            >
              Generate Image
            </button>{" "}
            {/* Add this button */}
          </div>
        </div>
      );
    }

    // Default rendering before screenshot
    return (
      <div style={{ height: "100vh", position: "relative" }} ref={this.mapRef}>
        <input
          type="text"
          value={address}
          onChange={this.handleAddressChange}
          onKeyPress={this.handleKeyPress}
          placeholder="Enter an address, include city and state"
          style={{
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            zIndex: 10,
            width: "300px",
          }}
        />
        <button
          onClick={this.handleSearch}
          style={{
            position: "absolute",
            top: "10px",
            left: "50%",
            marginLeft: "160px", // Adjust based on input width + some padding
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          Search
        </button>
        <LoadScriptNext googleMapsApiKey={APIkey}>
          <GoogleMap
            mapContainerStyle={{ height: "100vh", width: "100%" }}
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
          {showStreetView && (
            <button
              onClick={() => {
                toast("Screenshot Saved!");
                setTimeout(() => {
                  this.takeScreenshotBool();
                }, 1000); // 3000 milliseconds = 3 seconds
              }}
              style={{
                position: "absolute",
                bottom: "20px",
                left: "45%",
                padding: "10px 20px",
                borderRadius: "5px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              Take Screenshot
            </button>
          )}
          <ToastContainer />
        </LoadScriptNext>
      </div>
    );
  }
}

export default Map1;
