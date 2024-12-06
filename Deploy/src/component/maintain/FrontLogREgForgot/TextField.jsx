import React from "react";
import { TextField } from "@material-ui/core";

const CustomTextField = (props) => {
  const commonInputProps = {
    style: { height: "10px", fontSize: "0.9rem" },
  };

  const commonInputLabelProps = {
    style: { textAlign: "center", marginTop: "-5px" },
    // Adjust marginTop to vertically center the label within the input field
  };

  const commonStyle = {
    width: "300px",
    marginTop: "10px",
  };

  return (
    <TextField
      variant="outlined"
      inputProps={commonInputProps}
      InputLabelProps={commonInputLabelProps}
      style={commonStyle}
      size="small"
      {...props} // Pass any additional props to the TextField
    />
  );
};

export default CustomTextField;
