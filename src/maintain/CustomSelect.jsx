import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FormSelect } from "react-bootstrap";

const CustomSelect = React.forwardRef(
  (
    { label, name, value, onChange, options = [], star = false, disabled },
    ref
  ) => {
    const selectRef = ref; // Use the ref passed from the parent
    const [isSmallScreen, setIsSmallScreen] = useState(
      window.innerWidth <= 1000
    );

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
          marginBottom: "16px"
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
            flex: isSmallScreen ? "none" : "1.57",
            width: "100%"
          }}
        >
          <FormSelect
            fullWidth
            ref={selectRef}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            style={{
              border: "1px solid lightgrey",
              borderRadius: "4px",
              height: "25px",
              width: "100%",
              fontSize: "0.8rem",
              padding: "0 5px",
              lineHeight: "1.2",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              backgroundColor: "white"
            }}
          >
            {options.map(option =>
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )}
          </FormSelect>
        </div>
      </div>
    );
  }
);

// Define PropTypes for type checking
CustomSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  star: PropTypes.bool,
  disabled: PropTypes.bool
};

export default CustomSelect;
