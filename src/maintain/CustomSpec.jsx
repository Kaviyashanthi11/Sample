import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, FormControl } from "@mui/material";

const CustomSpec = ({ options, value, onChange, name, label, star }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1000);
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
        width: isSmallScreen ? "100%" : "1000px",
        maxWidth: "100%"
      }}
    >
      <label
        style={{
          flex: isSmallScreen ? "none" : "1",
          marginBottom: isSmallScreen ? "8px" : "0",
          whiteSpace: "nowrap"
        }}
      >
        {label} {star && <span style={{ color: "red" }}>*</span>}
      </label>
      <div
        style={{
          flex: isSmallScreen ? "none" : "1.6",
          marginLeft: isSmallScreen ? "0" : "8px",
          width: "100%"
        }}
      >
        <FormControl fullWidth>
          <Autocomplete
            multiple
            size="small"
            options={options}
            getOptionLabel={option => option.label}
            value={value || []}
            onChange={(event, newValue) => {
              onChange({
                target: {
                  name: name,
                  value: newValue
                }
              });
            }}
            renderInput={params =>
              <TextField
                {...params}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "lightgrey"
                    },
                    "&:hover fieldset": {
                      borderColor: "green"
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "green"
                    }
                  }
                }}
              />}
            required={star}
          />
        </FormControl>
      </div>
    </div>
  );
};

export default CustomSpec;
