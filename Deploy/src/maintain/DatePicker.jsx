import React, { useState, useRef,useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = forwardRef(
  ({ onChange, label, star, value, name }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(
      window.innerWidth <= 1000
    );
    const inputRef = useRef(null);

    // Add event listener to handle screen resize
    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 1000);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const formatDate = date => {
      if (!date) return "";
      try {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) return "";

        return parsedDate
          .toLocaleString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour12: false
          })
          .replace(",", "");
      } catch (error) {
        console.error("Date formatting error:", error);
        return "";
      }
    };
    const parsedDate = value ? new Date(value) : null;

    const handleChange = date => {
      if (onChange) {
        onChange(date);
      }
    };
    const validateInput = input => {
      // Remove any non-numeric characters
      let cleanInput = input.replace(/[^\d]/g, "");
      let formattedInput = "";

      // Handle month (positions 0-1)
      if (cleanInput.length > 0) {
        let month = cleanInput.slice(0, 2);

        // Validate first digit of month (0-1)
        if (month.length === 1) {
          if (month[0] > "1") {
            return formattedInput;
          }
          formattedInput += month;
        } else if (month.length === 2) {
          // Validate complete month
          // For months starting with 1, only allow 0-2
          if (month[0] === "1" && month[1] > "2") {
            formattedInput += month[0];
            return formattedInput;
          }
          // For months starting with 0, don't allow 0
          if (month[0] === "0" && month[1] === "0") {
            formattedInput += month[0];
            return formattedInput;
          }
          formattedInput += month;

          // Add slash after valid month
          if (cleanInput.length > 2) {
            formattedInput += "/";
          }
        }

        // Handle day (positions 2-3)
        if (cleanInput.length > 2) {
          let day = cleanInput.slice(2, 4);

          // Validate first digit of day (0-3)
          if (day.length === 1) {
            if (day[0] > "3") {
              return formattedInput;
            }
            formattedInput += day;
          } else if (day.length === 2) {
            // Validate complete day
            let dayNum = parseInt(day);
            let monthNum = parseInt(month);

            // Check days per month
            let maxDays = 31;
            if ([4, 6, 9, 11].includes(monthNum)) maxDays = 30;
            else if (monthNum === 2) maxDays = 29; // Simplified leap year handling

            // For days starting with 3, only allow 0-1
            if (day[0] === "3" && day[1] > "1") {
              formattedInput += day[0];
              return formattedInput;
            }
            // For days starting with 0, don't allow 0
            if (day[0] === "0" && day[1] === "0") {
              formattedInput += day[0];
              return formattedInput;
            }
            // Validate against max days for the month
            if (dayNum > maxDays) {
              formattedInput += day[0];
              return formattedInput;
            }

            formattedInput += day;

            // Add slash after valid day
            if (cleanInput.length > 4) {
              formattedInput += "/";
            }
          }

          // Handle year (positions 4-7)
          if (cleanInput.length > 4) {
            let year = cleanInput.slice(4, 8);

            // Validate first digit of year (must be "1" or "2")
            if (year.length === 1) {
              if (year[0] !== "1" && year[0] !== "2") {
                return formattedInput; // Reject if not 1 or 2
              }
              formattedInput += year; // Add valid first digit
            } else if (year.length === 2) {
              // Validate the second digit (must be 9 or 0) if the first digit is valid
              if (year[0] === "1" || year[0] === "2") {
                if (year[1] === "9" || year[1] === "0") {
                  formattedInput += year; // Both digits are valid
                } else {
                  // Only add the first digit if the second is invalid
                  formattedInput += year[0];
                }
              }
            } else if (year.length === 3) {
              // Add first digit
              formattedInput += year[0];
              // For the second digit, check if it's valid (must be 9 or 0)
              if (year[0] === "1" || year[0] === "2") {
                if (year[1] === "9" || year[1] === "0") {
                  formattedInput += year[1]; // Add second digit if valid
                } else {
                  // Only add the first digit if the second is invalid
                  formattedInput += year[0];
                }
              }
              // Add the third digit regardless of its value
              formattedInput += year[2]; // Always add the third digit
            } else if (year.length === 4) {
              // Always add first three digits regardless of their validity
              formattedInput += year.slice(0, 3);
              // Add the fourth digit regardless of its value
              formattedInput += year[3];

              // Validate complete year
              let yearNum = parseInt(year);
              if (yearNum < 1900 || yearNum > 2999) {
                // If invalid year, add only the first 3 digits and stop further input
                formattedInput = formattedInput.slice(0, 3); // Keep only the first 3 digits
                return formattedInput;
              }
              // Add space after valid year if more characters are expected
              if (cleanInput.length > 8) {
                formattedInput += " ";
              }
            } else {
              // For inputs with length <= 4, add them directly
              formattedInput = cleanInput;
            }
          }
        }
      }

      return formattedInput;
    };

    const CustomInput = forwardRef(({ onClick }, ref) => {
      // Function to remove single digit from date/time string
      const handleKeyDown = event => {
        if (event.key === "Backspace") {
          event.preventDefault();
          const input = event.target;
          const currentValue = input.value;
          const cursorPosition = input.selectionStart; // Get the current cursor position

          if (currentValue.length === 0 || cursorPosition === 0) return;

          // Declare updatedValue before using it
          let updatedValue = currentValue;

          // Check if we need to remove a separator
          if (
            (cursorPosition > 0 &&
              (currentValue[cursorPosition - 1] === ":" ||
                currentValue[cursorPosition - 1] === "/")) ||
            (cursorPosition > 1 &&
              currentValue[cursorPosition - 2] === ":" &&
              currentValue[cursorPosition - 1] === "/")
          ) {
            // If last char is a separator, remove both the separator and the preceding digit
            updatedValue =
              currentValue.slice(0, cursorPosition - 1) +
              currentValue.slice(cursorPosition);
          } else {
            // Otherwise just remove the last digit
            updatedValue =
              currentValue.slice(0, cursorPosition - 1) +
              currentValue.slice(cursorPosition);
          }

          input.value = updatedValue;
          // Update input field
          const validatedInput = validateInput(updatedValue);
          requestAnimationFrame(() => {
            if (inputRef.current) {
              inputRef.current.value = validatedInput;
              inputRef.current.focus();
              // Set cursor to the position before the deleted character
              inputRef.current.setSelectionRange(
                cursorPosition - 1,
                cursorPosition - 1
              );
            }
          });

          if (validatedInput.match(/^\d{2}\/\d{2}\/\d{4}(\s\d{2}:\d{2})?$/)) {
            const [datePart, timePart = "00:00"] = validatedInput.split(" ");
            const [month, day, year] = datePart.split("/");
            const [hours, minutes] = timePart.split(":");
            const newDate = new Date(year, month - 1, day, hours, minutes);

            if (!isNaN(newDate.getTime())) {
              handleChange(newDate);
            }
          } else {
            handleChange(null);
          }
        }
      };

      const handleInputChange = e => {
        let inputValue = e.target.value;
        let validatedInput = validateInput(inputValue);

        // Auto-insert separators
        if (validatedInput.length >= 2 && validatedInput[2] !== "/") {
          validatedInput =
            validatedInput.slice(0, 2) + "/" + validatedInput.slice(2);
        }
        if (validatedInput.length >= 5 && validatedInput[5] !== "/") {
          validatedInput =
            validatedInput.slice(0, 5) + "/" + validatedInput.slice(5);
        }

        // Handle empty input
        if (!validatedInput) {
          handleChange(null);
          return;
        }

        // Validate and update date
        if (validatedInput.match(/^\d{2}\/\d{2}\/\d{4}(\s\d{2}:\d{2})?$/)) {
          const [datePart, timePart = "00:00"] = validatedInput.split(" ");
          const [month, day, year] = datePart.split("/");
          const [hours, minutes] = timePart.split(":");
          const newDate = new Date(year, month - 1, day, hours, minutes);

          if (!isNaN(newDate.getTime())) {
            handleChange(newDate);
          }
        } else {
          handleChange(null);
        }
        requestAnimationFrame(() => {
          if (inputRef.current) {
            inputRef.current.value = validatedInput;
            inputRef.current.focus();
            inputRef.current.setSelectionRange(
              validatedInput.length,
              validatedInput.length
            );
          }
        });
      };
      return (
        <input
          ref={el => {
            inputRef.current = el;
            if (typeof ref === "function") ref(el);
            else if (ref) ref.current = el;
          }}
          placeholder={isHovered ? "mm/dd/yyyy" : ""}
          value={formatDate(parsedDate)}
          onChange={handleInputChange}
          onClick={onClick}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={e => {
            if (
              !e.relatedTarget ||
              !e.currentTarget.contains(e.relatedTarget)
            ) {
              setIsFocused(false);
            }
          }}
          className={`custom-datepicker ${isFocused ? "focused" : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            width: "100%", // Make the input flexible to fit within its container
            border: "1px solid lightgrey",
            borderRadius: "4px",
            height: "30px", // Adjust input height for better alignment
            fontSize: "0.9rem",
            padding: "0 10px",
            lineHeight: "1.2",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            flex: 1,
            transition: "all 0.2s ease-in-out"
          }}
        />
      );
    });

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
            marginBottom: isSmallScreen ? "8px" : "0"
          }}
        >
          {label} {star && <span style={{ color: "red" }}>*</span>}
        </label>
        <div
          style={{
            flex: isSmallScreen ? "none" : "1.57",
            width: "100%",
            marginLeft: isSmallScreen ? "0" : "8px"
          }}
        >
          <DatePicker
            selected={parsedDate}
            onChange={handleChange}
            dateFormat="MM/dd/yyyy"
            popperClassName="custom-popper"
            customInput={<CustomInput />}
            popperPlacement="bottom"
            popperProps={{
              strategy: "fixed"
            }}
          />
        </div>
      </div>
    );
  }
);

export default CustomDatePicker;
