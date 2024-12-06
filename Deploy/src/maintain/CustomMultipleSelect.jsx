import React, { useState, useRef, forwardRef } from 'react';
import { Select, MenuItem, FormControl, Grid, TextField, InputAdornment, Typography } from '@mui/material';
import { Form } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';

const CustomMultipleSelect = forwardRef(({ options, selectedValues, handleChange, label, star, isMultiple = true }) => {
  const isSmallScreen = useMediaQuery('(max-width:1350px)');
  const [searchInput, setSearchInput] = useState('');
  const ref = useRef(null);

  // Filter options based on the search query
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <FormControl fullWidth size="small" style={{ marginBottom: '16px' }}>
      <Grid container alignItems="center">
        {/* Label Section */}
        <Grid item xs={12} sm={3} style={{ textAlign: 'left', paddingRight: '10px' }}>
          <Form.Label style={{ whiteSpace: 'nowrap' }}>
            {label} {star && <span style={{ color: 'red' }}>*</span>}
          </Form.Label>
        </Grid>

        {/* Select Section */}
        <Grid item xs={12} sm={9}>
          <Select
            size="small"
            multiple={isMultiple}
            value={selectedValues || (isMultiple ? [] : '')}
            displayEmpty
            onChange={handleChange}
            ref={ref}
            renderValue={(selected) => {
              if (!selected || selected.length === 0) {
                return '--select--';
              }
              return isMultiple
                ? selected.map(val => options.find(option => option.id === val)?.label).join(', ')
                : options.find(option => option.id === selected)?.label;
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                  zIndex: 1000,
                  width: '300px',
                },
              },
            }}
            style={{
              width: isSmallScreen ? '100%' : '70%',
              height: '28px',
              fontSize: '0.8rem',
              marginLeft: isSmallScreen ? '' : '-50px',
            }}
          >
            {/* Search Input Field */}
            <div style={{ padding: '2px' }}>
              <TextField
                value={searchInput}
                onChange={handleSearchChange}
                style={{ width: '100%' }}
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  style: {
                    height: '25px',
                    fontSize: '15px',
                  },
                }}
              />
            </div>
            {/* Options */}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>
                <Typography>No options available</Typography>
              </MenuItem>
            )}
          </Select>
        </Grid>
      </Grid>
    </FormControl>
  );
});

export default CustomMultipleSelect;
