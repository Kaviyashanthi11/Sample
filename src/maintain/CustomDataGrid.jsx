import React, { useState } from "react";
import {
  Box,
  Stack,
  Pagination,
  IconButton,
  Menu,
  MenuItem,
  Checkbox
} from "@mui/material";
import { AiOutlineTable } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const NoPaginationDataGrid = styled(DataGrid)({
  "& .MuiTablePagination-root": {
    display: "none"
  },
  "& .MuiDataGrid-footerContainer": {
    display: "none"
  },
  "& .MuiDataGrid-cell": {
    fontSize: "small"
  },
  "& .MuiDataGrid-row": {
    height: "20px"
  },
  "& .MuiDataGrid-cell:focus": {
    outline: "none"
  }
});

const defaultVisibleColumns = [
  "iHolidayId",
  "sHolidayDesc",
  "dtHolidayDate",
  "bIsActive",
  "iClaimStausRequiredFieldsMappingId",
  "bActiveStatus",
  "iPayerId",
  "history",
  "bNPIId",
  "bSubscriberId",
  "bLastName",
  "bFirstName",
  "bDateOfBirth",
  "bSex",
  "bClaimNumber",
  "bBillType",
  "bBilledAmount",
  "bGroupNumber",
  "bBeginningDateOfService",
  "bEndingDateOfService",
  "bPatLastName",
  "bPatFirstName",
  "bPatDateOfBirth",
  "iMaintenanceId",
  "dtFromDateTime",
  "dtToDateTime",
  "bIsActive",
  "iInvoiceEmailId",
  "sInvoiceEmail",
  "bIsActive",
  "id",
  "sUserEmailId",
  "serialNumber",
  "sUserId",
  "sUserName",
  "bIsUserActive",
  "tmUserLastLogin",
  "bIsLoginSessionStatus",
  "iBillingOfficeId",
  "sIPAddress",
  "isEnrolled",
  "Payer",
  "bIsClearingHouseActive",
  "sClearingHouseName",
  "sRateCatetoryName",
  "dRateAmount",
  "bIsRateCategoryActive",
  "iPlanMasterID",
  "sPlanMasterName",
  "iNoOfFreeTransaction",
  "bIsPlanMasterActive",
  "dPlanRate",
  "iProviderId",
  "sProviderLastName",
  "sProviderFirstName",
  "iProviderType",
  "practiceName",
  "bIsProviderActive",
  "iProviderId",
  "sProviderNPI",
  "iEligibilityPayerMasterID",
  "iClaimStatusMasterID",
  "iEnhancedClaimStatusMasterID",
  "iClearingHouseMasterID",
  "iPlanMasterID",
  "iRateCategoryID",
  "sPayerName",
  "sPayerID",
  "sAPIPayerID",
  "sAPIPayerName",
  "bIsRateCategoryVsRateActive",
  "iNPIType",
  "actions"
];
const CustomDataGrid = ({
  rows,
  columns,
  pageSize,
  handlePageSizeChange,
  handlePageChange,
  page,
  filteredRows,
  showColumnVisibility = false // New prop to control column visibility menu
}) => {
  const [columnVisibility, setColumnVisibility] = useState(
    columns.reduce(
      (acc, col) => ({
        ...acc,
        [col.field]: defaultVisibleColumns.includes(col.field)
      }),
      {}
    )
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  
  const handleIconClick = event => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleCheckboxChange = field => {
    setColumnVisibility(prevVisibility => ({
      ...prevVisibility,
      [field]: !prevVisibility[field]
    }));
  };
  
  const visibleColumns = columns.filter(
    column => columnVisibility[column.field]
  );

  return (
    <Box sx={{ marginLeft: "10px", marginTop: "-50px" }}>
      {showColumnVisibility && (
        <>
          <IconButton
            onClick={handleIconClick}
            style={{
              marginLeft: isSmallScreen ? "210px" : "290px",
              color: "red",
              marginTop: isSmallScreen ? "-15px" : "-40px"
            }}
          >
            <AiOutlineTable size={isSmallScreen ? 35 : 35} />{" "}
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            {columns.map(column =>
              <MenuItem key={column.field} style={{ height: "20px" }}>
                <Checkbox
                  checked={columnVisibility[column.field]}
                  onChange={() => handleCheckboxChange(column.field)}
                />
                {column.headerName}
              </MenuItem>
            )}
          </Menu>
        </>
      )}
      
      <br />
      <br />
      <NoPaginationDataGrid
        rows={rows.filter(row => row && row.id)}
        columns={visibleColumns}
        pagination
        pageSize={pageSize}
        style={{ fontSize: "small" }}
        disableRowSelectionOnClick
        onPageSizeChange={handlePageSizeChange}
        showCellVerticalBorder
        disableColumnMenu={true}
        rowHeight={30}
        autoHeight
        getRowId={row => row.id}
        sx={{
          "& .MuiDataGrid-footerContainer": {
            display: "none"
          },
          "& .MuiDataGrid-virtualScroller": {
            overflow: "hidden !important"
          },
          "& .MuiDataGrid-main": {
            overflow: "hidden !important"
          },
          "& .sample": {
            backgroundColor: "#7BD9F6",
            fontSize: "0.875rem",
            fontWeight: "bold",
            height: "36px !important",
            minHeight: "32px !important",
            lineHeight: "32px !important"
          }
        }}
      />

      <br />
      <Stack
        direction="row"
        spacing={2}
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "50px",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          width: "100%"
        }}
      >
        <Pagination
          count={Math.ceil(filteredRows.length / pageSize)}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
};

export default CustomDataGrid;
