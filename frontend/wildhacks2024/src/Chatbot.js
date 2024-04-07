import React from "react";

const Chatbot = () => {
  // Inline styles for the iframe can be defined here if needed
  const iframeStyle = {
    border: "1px solid rgba(0, 0, 0, 1)",
    transition: ".3s",
    borderRadius: "4px",
    boxShadow: "none", // initial boxShadow
  };

  // Event handlers for mouse events can be defined here
  const handleMouseOver = (e) => {
    e.currentTarget.style.boxShadow = "0px 6px 6px -3px rgba(0,0,0,0.1)";
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <iframe
      id="BUBUETFJJC"
      loading="eager"
      src="https://embed.pickaxeproject.com/axe?id=ZoneIn_A5TT2&mode=embed_gold&host=beta&theme=custom&opacity=100&font_header=Real+Head+Pro&size_header=30&font_body=Real+Head+Pro&size_body=16&font_labels=Real+Head+Pro&size_labels=14&font_button=Real+Head+Pro&size_button=16&c_fb=FFFFFF&c_ff=FFFFFF&c_fbd=888888&c_bb=297F38&c_bt=FFFFFF&c_t=000000&s_ffo=100&s_bbo=100&s_f=minimalist&s_b=filled&s_t=0.5&s_to=1&s_r=2"
      width="100%"
      height="750px"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={iframeStyle}
      frameBorder="0"
    />
  );
};

export default Chatbot;
