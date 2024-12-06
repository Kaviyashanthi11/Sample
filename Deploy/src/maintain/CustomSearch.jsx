import React, { useRef } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useMediaQuery from "@mui/material/useMediaQuery";

const CustomSearch = ({ searchText, handleSearchTextChange }) => {
  const inputRef = useRef(null);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const styles = {
    container: {
      display: "flex",
      justifyContent: "flex-end", // Aligns the search field to the right
      padding: isSmallScreen ? "10px" : "20px"
    },
    textField: {
      width: isSmallScreen ? "30%" : "20%", // Adjust width for different screen sizes
      marginTop: isSmallScreen ? "-42px" : "-55px"
    },
    input: {
      height: "30px",
      fontSize: "15px"
    }
  };

  return (
    <div style={styles.container}>
      <TextField
        variant="outlined"
        value={searchText}
        onChange={handleSearchTextChange}
        size="small"
        style={styles.textField}
        InputProps={{
          style: styles.input,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                size="small"
                aria-label="search"
                onClick={() => {
                  if (inputRef.current) {
                    console.log("Search triggered");
                    // Add search logic
                  }
                }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
        inputRef={inputRef}
        placeholder="Search..."
      />
    </div>
  );
};

export default CustomSearch;
