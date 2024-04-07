import React, { useRef } from "react";
import { useScreenshot } from "use-react-screenshot";

const ScreenshotButton = ({ mapRef }) => {
  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => takeScreenshot(mapRef.current);

  return (
    <div>
      <button style={{ marginBottom: "10px" }} onClick={getImage}>
        Take screenshot
      </button>
      {image && <img src={image} alt="Screenshot" />}
    </div>
  );
};

export default ScreenshotButton;
