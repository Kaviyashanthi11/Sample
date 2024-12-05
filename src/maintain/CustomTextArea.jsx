import React, { useState, useEffect } from "react";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
const CustomTextArea = ({
  label,
  name,
  value,
  onChange,
  rows = 3,
  star = false
}) => {
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
        marginBottom: "16px"
      }}
    >
      <FormLabel
        style={{
          flex: isSmallScreen ? "none" : "0.98",
          marginBottom: isSmallScreen ? "8px" : "0"
        }}
      >
        {label} {star && <span style={{ color: "red" }}>*</span>}
      </FormLabel>
      <FormControl
        as="textarea"
        name={name}
        value={value}
        onChange={e => {
          console.log("Event:", e); // Debugging: Log the event object
          if (e.target) {
            onChange(e.target.name, e.target.value);
          } else {
            console.error("Event target is undefined");
          }
        }}
        rows={rows}
        style={{
          flex: isSmallScreen ? "none" : "1.55",
          width: "100%",
          marginLeft: isSmallScreen ? "0" : "8px",
          height: "auto",
          border: "1px solid lightgrey",
          borderRadius: "4px"
        }}
      />
    </FormGroup>
  );
};

export default CustomTextArea;
