import React from 'react'
import { Form } from 'react-bootstrap';
import CustomSelect from '../src/maintain/CustomSelect'
import { useState,useEffect,useRef } from 'react'
import {Button,Grid,IconButton, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import logo from '../src/images/favicon.png';
import { activeOrinactive } from '../src/dropoption/PlanPermiumTrail'
import CustomSearch from '../src/maintain/CustomSearch';
import CustomDataGrid from '../src//maintain/CustomDataGrid';
import useMediaQuery from '@mui/material/useMediaQuery';
import CustomDateTimePicker from '../src/maintain/DateTimePicker';
import EditIcon from '@mui/icons-material/Edit';

const  MaintenanceMaster=()=> {
    const [formData, setFormData] = useState(  {
        "dtFromDateTime":"",
        "dtToDateTime":"",
        "bIsActive":"1"
    })
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const [searchText, setSearchText] = useState("");
    const [open, setOpen] = useState(false); 
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [filteredRows, setFilteredRows] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [data, setData] = useState([]);
    const activeRef=useRef(null)
    const fromRef=useRef(null)
    const toRef=useRef(null)   
    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          const response = await fetch('/React/web/index.php?r=api/maintenance-master-view');
          const result = await response.json();
          if (response.ok) {
            const transformedData = result.map((item, index) => ({
              ...item,
              id: item.iMaintenanceId || index, // Ensure unique ID
              dtCreatedOn: item.dtCreatedOn,
            }));
            setData(transformedData);
          } else {
            console.error('Error fetching data:', result);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const handleSelectChange = (name, value) => {
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value
        }));
      };
      const handleSubmit = async (e) => {
        if (!formData.dtFromDateTime) {
          alert("Please select From Date");
          return; // Exit the function if any field is missing
        }
        if (!formData.dtToDateTime) {
          alert("Please select To Date");
          return; // Exit the function if any field is missing
        }
      setOpen(true); 
        const requestData = {
            dtFromDateTime: formatDate(formData.dtFromDateTime || ""),
            dtToDateTime: formatDate(formData.dtToDateTime || ""),
            bIsActive: formData.bIsActive || "1",
        };
    
        if (isEditing) {
          fetch(`/React/web/index.php?r=api/maintenance-master-save&id=${formData.iMaintenanceId}`, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(requestData),
          })
              .then((response) => {
                  if (!response.ok) throw new Error("Failed to update row");
                  return response.json();
              })
              .then(() => {
                  const updatedTableData = data.map((item) =>
                      item.iMaintenanceId === formData.iMaintenanceId
                          ? { ...item, ...requestData }
                          : item
                  );
                  setData(updatedTableData); 
                  alert("Record Updated successfully");
                  setOpen(false)
                  handleReset(); 
              })
              .catch((error) => console.error("Update failed:", error));
      } else {
          fetch("/React/web/index.php?r=api/maintenance-master-save", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(requestData),
          })
              .then((response) => response.json())
              .then((data) => {
                  const iMaintenanceId = data.length + 1;
                  const newRow = { id: iMaintenanceId, ...requestData };
                  setData((prevState) => [...prevState, newRow]); 
                  setOpen(false)
                  alert("Record Created successfully");
                  handleReset(); 
              })
              .catch((error) => console.error("Error adding:", error));
      }
  };
    
    const handleEdit = (row) => {
        const itemToEdit = data.find((item) => item.id === row.id);
    
        if (!itemToEdit) {
            console.error('Item not found.');
            return;
        }
    
        setFormData({
            ...itemToEdit,
            bIsActive: itemToEdit.bIsActive !== undefined ? itemToEdit.bIsActive.toString() : '1',
            dtFromDateTime: formatDate(itemToEdit.dtFromDateTime) || "", // Format date as needed
            dtToDateTime: formatDate(itemToEdit.dtToDateTime) || "", // Format date as needed
        });
        setIsEditing(true);
    };
    
  const handleDateTimeChange = (name, newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue || "", // Ensure it resets to an empty string if needed
    }));
  };
  
  
      const handlePageChange = (event, newPage) => {
        setPage(newPage);
      };
      const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
      }
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return ""; 
        }
    
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${month}/${day}/${year} ${hours}:${minutes}`; 
    };
      const columns = [
        {
          field: "iMaintenanceId",
          headerName: "SI No",
          flex:1,
          headerClassName: "sample",
        },
          {
            field: 'dtFromDateTime',
            headerName: 'From Date',
            flex: 1,
            disableColumnMenu: true,
            headerClassName: "sample",
            renderCell: (params) => formatDate(params.value), // Apply format function here
          },
          {
            field: 'dtToDateTime',
            headerName: 'To Date',
            flex: 1,
            disableColumnMenu: true,
            headerClassName: "sample",
            renderCell: (params) => formatDate(params.value), // Apply format function here
          },
        {
          field: 'bIsActive',
          headerName: 'Status',
          flex:1,
         disableColumnMenu: true,
          headerClassName: 'sample',
          renderCell: (params) => {
              const isActive = params.value; // Assuming params.value is a boolean
              
              const textColor = isActive ? 'green' : 'red';
    
              return (
                  <div style={{ color: textColor,textTransform:'uppercase'}}>
                      {isActive ? 'Active' : 'Inactive'}
                  </div>
              );
          },
      },
      {
        field:'actions',
        headerName: 'Actions',
        flex:1,
        disableColumnMenu:true,
        headerClassName: "sample",
        renderCell: (params) => (
          <IconButton
          onClick={() => handleEdit(params.row, params.rowIndex)}
            sx={{
              backgroundColor: '#00CED1',
              padding: '4px',
              alignItems:"center",
              '&:hover': {
                backgroundColor: '#00CED1',
              },
            }}
          >
            <EditIcon sx={{ 
              fontSize: '16px',
              color: '#ffffff'
            }} />
          </IconButton>
        )
      }
      ];
    
      const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
      };
    
      const convertToString = (value, options) => {
        const parsedValue = parseInt(value, 10);
        return options[parsedValue] || ''; 
      };
      useEffect(() => {
        const filtered = data.filter(row => {
          const eligibility = convertToString(row.bIsActive, {
            1: 'Active',
            0: 'Inactive',
          });
        
          const searchableFields = [
            row.dtFromDateTime || '',  
            row.dtToDateTime || '',
            row.iMaintenanceId || '',
            eligibility || '',
          ];
    
          return searchableFields
            .map(field => String(field).toLowerCase())
            .some(value => value.includes(searchText.toLowerCase()));
        });
        setFilteredRows(filtered);
      }, [data, searchText]);
    
      const paginatedRows = filteredRows.slice((page - 1) * pageSize, page * pageSize);
      const handleReset = () => {
        // Reset formData to initial state
        setFormData({
            dtFromDateTime: "",
            dtToDateTime: "",
            bIsActive: "1",
        });
        setIsEditing(false); // Reset editing state
        setSearchText(""); // Clear the search text if necessary
    };
    
  return (
     <Form 
       style={{ width: '100%', 
        margin: '0 auto', boxSizing: 'border-box' ,marginRight:'1400px'}}>
        <Grid container spacing={2} style={{ boxSizing: 'border-box'}}>
          <Grid item xs={12} sm={6} >
          <CustomDateTimePicker 
          label="From Date/Time"
          name="dtFromDateTime" // Specify name here
          value={formData.dtFromDateTime}
          onChange={(newValue) => handleDateTimeChange('dtFromDateTime', newValue)} // Pass correct field
          star
          ref={fromRef}
        />
        <CustomDateTimePicker 
          label="To Date/Time"
          name="dtToDateTime" // Specify name here
          value={formData.dtToDateTime}
          onChange={(newValue) => handleDateTimeChange('dtToDateTime', newValue)} // Pass correct field
          star
          ref={toRef}
        />
                    
         <CustomSelect
          label="Is Active?"
          name="bIsActive"
          value={formData.bIsActive || "1"}
          onChange={(e) => handleSelectChange(e.target.name, e.target.value)}
          options={activeOrinactive}
          star
          ref={activeRef}
        />
        </Grid>
        </Grid>
         <Grid item xs={12} style={{ textAlign: 'center', marginTop: '20px',marginRight:isSmallScreen?'':'400px'}}>
            <Button onClick={handleSubmit}  style={{marginRight:'30px',backgroundColor: '#00e5ff', color: 'black', }}>
              {isEditing ? 'Update' : 'Create'}
            </Button>
            <Button  onClick={handleReset} style={{backgroundColor: 'black', color: 'white', }}>
             Reset
              </Button>
          </Grid>
       
          {!isEditing && (
<>
        <Box mt={5}>
         <Typography style={{marginLeft:'20px',fontSize:'large',color: '#29B6F6'}}>Maintenance List</Typography>
            <CustomSearch 
        searchText={searchText}
        handleSearchTextChange={handleSearchTextChange} 
      />
  <CustomDataGrid
      rows={paginatedRows}
      columns={columns}
      pageSize={pageSize}
      handlePageSizeChange={handlePageSizeChange}
      handlePageChange={handlePageChange}
      page={page}
      filteredRows={filteredRows}
    />
</Box>
      </>
      )}
       <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={open}
      >
    <img src={logo} alt="loading" />
      </Backdrop>
      </Form>
  )
}
export default MaintenanceMaster;