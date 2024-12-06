const CustomLoginTextField = props => {
  const baseFontSize = 16; // Set your base font size here (usually 16px)

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    margin: "0.5rem 0",
    position: "relative",
    width: props.fullWidth ? "100%" : "auto" // Set width to 100% if fullWidth is true
  };

  const underlineStyle = {
    height: `${40 / baseFontSize}rem`, // Adjust height as needed
    //width: props.fullWidth ? "100%" : "auto", // Set width to 100% if fullWidth is true
    width: "100%",
    fontSize: "0.9rem",
    padding: `${4 / baseFontSize}rem 0`, // Padding on top and bottom, none on sides
    border: "none",
    borderBottom: `0.0625rem solid #ced4da`, // Underline style
    boxSizing: "border-box",
    backgroundColor: "transparent", // Transparent background
    outline: "none"
  };

  return (
    <div style={{ ...containerStyle, ...props.style }}>
      <input
        type={props.type || "text"}
        style={underlineStyle}
        placeholder={props.placeholder}
        {...props}
      />
      {props.endAdornment &&
        <div
          style={{
            position: "absolute",
            right: `${10 / baseFontSize}rem`,
            top: "50%",
            transform: "translateY(-50%)"
          }}
        >
          {props.endAdornment}
        </div>}
    </div>
  );
};

export default CustomLoginTextField;
