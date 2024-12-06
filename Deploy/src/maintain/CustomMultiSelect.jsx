import React, { useState, useEffect } from "react";
import { FormControl, TextField, Grid } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { Form } from "react-bootstrap";
const CustomMultiSelect = ({ options, value, onChange, name, label, star }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1000);

  // Update screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Grid
      item
      xs={12}
      container
      alignItems="center"
      style={{ marginBottom: "16px" }}
    >
      <Grid item xs={12} sm={4}>
        <Form.Label>
          {label} {star && <span style={{ color: "red" }}>*</span>}
        </Form.Label>
      </Grid>
      <Grid item xs={12} sm={8}>
        <FormControl fullWidth>
          <Autocomplete
            multiple
            size="small"
            options={options}
            getOptionLabel={option => option.label}
            value={
              value && typeof value === "string"
                ? options.filter(option =>
                    value.split(",").includes(option.value.toString())
                  )
                : value || []
            }
            onChange={(event, newValue) => {
              onChange({
                target: {
                  name: name,
                  value:
                    newValue.length > 0
                      ? newValue.map(option => option.value).join(",")
                      : "" // Use an empty string instead of an empty array
                }
              });
            }}
            renderInput={params => <TextField {...params} variant="outlined" />}
            style={{
              flex: isSmallScreen ? "none" : "1.5",
              marginLeft: isSmallScreen ? "0" : "44px", // Remove margin on small screens
              marginTop: isSmallScreen ? "8px" : "0" // Add top margin when the field is below the label
            }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default CustomMultiSelect;
