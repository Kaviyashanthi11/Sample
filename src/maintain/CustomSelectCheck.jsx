import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  ListItemText,
  FormGroup
} from "@mui/material";

const CustomSelectWithCheckbox = ({
  options,
  label,
  selectedOptions,
  handleSelectChange
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // Handle selecting individual options
  const handleOptionChange = event => {
    const selectedValue = event.target.value;
    const newSelectedOptions = selectedOptions.includes(selectedValue)
      ? selectedOptions.filter(option => option !== selectedValue)
      : [...selectedOptions, selectedValue];

    handleSelectChange({ target: { value: newSelectedOptions } });
  };

  // Map the selected values to their respective labels
  const selectedLabels = options
    .filter(option => selectedOptions.includes(option.value))
    .map(option => option.label)
    .join(", ");

  return (
    <FormGroup
      style={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: isSmallScreen ? "flex-start" : "center",
        marginBottom: "16px"
      }}
    >
      <label
        style={{
          flex: isSmallScreen ? "none" : "0.98",
          marginBottom: isSmallScreen ? "8px" : "0"
        }}
      >
        {label} <span style={{ color: "red" }}>*</span>
      </label>
      <FormControl
        fullWidth
        style={{
          flex: isSmallScreen ? "none" : "1.55",
          width: "100%",
          marginLeft: isSmallScreen ? "0" : "8px"
        }}
      >
        <Select
          multiple
          value={selectedOptions}
          onChange={handleSelectChange}
          style={{
            height: "60px", // Adjust the height
            fontSize: "0.8rem", // Adjust the font size
            border: "1px solid lightgrey",
            borderRadius: "4px",
            lineHeight: "1.5"
          }}
          renderValue={selected => {
            if (selected.length === 0) return "";
            if (selected.length === options.length) return "All selected";
            return selectedLabels || "";
          }}
        >
          {options.map(option =>
            <MenuItem
              key={option.value}
              value={option.value}
              onClick={handleOptionChange}
              style={{ padding: "2px", width: "100%" }}
            >
              <Checkbox checked={selectedOptions.indexOf(option.value) > -1} />
              <ListItemText primary={option.label} />
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </FormGroup>
  );
};

CustomSelectWithCheckbox.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  selectedOptions: PropTypes.array.isRequired,
  handleSelectChange: PropTypes.func.isRequired
};

export default CustomSelectWithCheckbox;
