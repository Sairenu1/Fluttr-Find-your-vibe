import React from "react";

export const GradientBackground = () => (
  <div
    className="gradient-bg"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(135deg, #ff006e, #8338ec)",
      zIndex: -1,
    }}
  />
);


export default GradientBackground;
