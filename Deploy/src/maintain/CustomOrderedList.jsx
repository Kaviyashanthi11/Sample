import React from "react";
import { FormGroup } from "react-bootstrap";
import { useEffect, useState } from "react";

const CustomOrderedList = ({ label, value, star = false }) => {
  // Split the input value into items based on newline characters
  const items = value.split("\n").filter(item => item.trim() !== "");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <FormGroup
      style={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: isSmallScreen ? "flex-start" : "center",
        marginBottom: "16px",
        width: "100%"
      }}
    >
      <label
        style={{
          flex: isSmallScreen ? "none" : "0.98",
          marginBottom: isSmallScreen ? "8px" : "0",
          whiteSpace: "nowrap"
        }}
      >
        {label} {star && <span style={{ color: "red" }}>*</span>}
      </label>
      <div
        style={{
          flex: isSmallScreen ? "none" : "1.55",
          marginLeft: isSmallScreen ? "0" : "8px",
          maxHeight: "50px", // Max height to enable scrolling
          overflowY: "auto", // Enable vertical scrolling only when needed
          border: "1px solid lightgrey",
          backgroundColor: "#ffffff",
          padding: "8px", // Padding inside the container
          boxSizing: "border-box" // Include padding and border in the element's total width and height
        }}
      >
        {items.length > 0
          ? items.map((item, index) =>
              <div
                key={index}
                style={{
                  marginBottom: "8px",
                  padding: "8px",
                  backgroundColor: "#ffffff",
                  wordWrap: "break-word"
                }}
              >
                {item}
              </div>
            )
          : <div style={{ padding: "8px" }}>No items to display</div>}
      </div>
    </FormGroup>
  );
};

export default CustomOrderedList;
