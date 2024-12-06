import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const CustomCheckbox = ({ label, checked, onChange, star, name, value }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1000); // Adjust breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: isSmallScreen ? "flex-start" : "center",
        justifyContent: "space-between",
        marginBottom: "16px",
        width: isSmallScreen ? "100%" : "1000px", // Full width for small screens
        maxWidth: "100%" // Ensure it doesn't overflow the parent container
      }}
    >
      <label
        style={{
          flex: isSmallScreen ? "none" : "1",
          marginBottom: isSmallScreen ? "8px" : "0",
          whiteSpace: "nowrap" // Prevent label from wrapping
        }}
      >
        {label} {star && <span style={{ color: "red" }}>*</span>}
      </label>
      <div
        style={{
          flex: isSmallScreen ? "none" : "1.6",
          marginLeft: isSmallScreen ? "0" : "8px"
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              name={name}
              value={value}
              onChange={onChange}
              checked={checked}
              sx={{
                color: "lightgrey",
                "&.Mui-checked": { color: "green" }
              }}
            />
          }
          label="" // Empty label for alignment
          style={{
            marginBottom: "0",
            display: "flex",
            justifyContent: "flex-start"
          }}
        />
      </div>
    </div>
  );
};

export default CustomCheckbox;
