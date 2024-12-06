import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import React, { useEffect, useState } from "react";

const CustomTextField = React.forwardRef(
  ({ label, name, value, onChange, star = false, disabled }, ref) => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1000);

    // Add event listener to handle screen resize
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
          flexDirection: isSmallScreen ? "column" : "row", // Stack vertically on small screens
          alignItems: isSmallScreen ? "flex-start" : "center", // Adjust alignment for small screens
          marginBottom: "16px",
        }}
      >
        <FormLabel
          style={{
            flex: isSmallScreen ? "none" : "1", // Remove flex for small screens
            marginBottom: isSmallScreen ? "8px" : "0", // Add spacing below label on small screens
          }}
        >
          {label} {star && <span style={{ color: "red" }}>*</span>}
        </FormLabel>
        <FormControl
          ref={ref}
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          style={{
            flex: isSmallScreen ? "none" : "1.6", // Remove flex for small screens
            width: "100%",
            marginLeft: isSmallScreen ? "0" : "8px", // Remove left margin on small screens
            height: "25px",
            border: "1px solid lightgrey",
            borderRadius: "4px",
          }}
        />
      </FormGroup>
    );
  }
);

export default CustomTextField;
