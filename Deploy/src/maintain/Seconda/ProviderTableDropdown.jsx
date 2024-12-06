import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { gridClasses } from "@mui/material";
import ReactPaginate from "react-paginate";
import "./ProviderTable.css";
import { Button, Typography } from "@material-ui/core";

function CustomFooter({ rowCount, handleAddRow, showAddRowButton }) {
  const handleAddRowClick = () => {
    handleAddRow(); // Call the addRow function
  };

  return (
    <div className="custom-footer">
      <Typography className="total-rows">Total Rows: {rowCount}</Typography>
      {showAddRowButton && (
        <Button
          type="button"
          className="add-row-button"
          variant="contained"
          color="primary"
          size="small"
          //style={{ backgroundColor: "#29b6f6", marginRight: "1rem" }}
          onClick={handleAddRowClick}
        >
          Add New Record
        </Button>
      )}
    </div>
  );
}

function ProviderTable({
  rows,
  columns,
  hiddenColumns,
  customPageSize,
  showHeaderHeight = true,
  handleAddRow,
  showAddRowButton,
}) {
  const [page, setPage] = useState(0);
  const pageSize = customPageSize || 15;
  const [paginatedRows, setPaginatedRows] = useState([]);
  const [rowHeight, setRowHeight] = useState(40);

  useEffect(() => {
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const newPaginatedRows = rows.slice(startIndex, endIndex);
    setPaginatedRows(newPaginatedRows);
  }, [page, rows, pageSize]);

  const pageCount = Math.ceil(rows.length / pageSize);

  const handlePageChange = (selectedPage) => {
    setPage(selectedPage.selected);
  };

  const renderCellContent = (col, params) => {
    const value = col.renderCell ? col.renderCell(params) : params.value;
    // Default rendering for non-custom columns
    return (
      <div
        style={{
          width: "100%",
          whiteSpace: "pre-wrap", // Allow content to wrap
          overflow: "visible",
          lineHeight: "normal",
        }}
      >
        {value}
      </div>
    );
  };
  useEffect(() => {
    // Dynamically adjust row height based on content
    // Inside the useEffect hook where you calculate the tallest content height
    const tallestContentHeight = Math.max(
      ...rows.map((row) => {
        // Calculate the height of content in each row
        const rowCells = columns.map((col) => row[col.field]); // Extracting cell content
        const cellHeights = rowCells.map((cellContent) => {
          // Create a temporary element to measure the height of the content
          const tempElement = document.createElement("div");
          tempElement.innerHTML = cellContent; // Set the cell content
          document.body.appendChild(tempElement); // Append the element to the body
          const height = tempElement.offsetHeight; // Get the offset height (content height)
          document.body.removeChild(tempElement); // Remove the temporary element
          return height;
        });
        return Math.max(...cellHeights); // Return the maximum height among all cells in the row
      })
    );
    // Set row height within the specified range
    let newHeight = 35; // Default row height
    if (tallestContentHeight <= 35) {
      newHeight = 35;
    } else if (tallestContentHeight <= 40) {
      newHeight = 40;
    } else if (tallestContentHeight <= 50) {
      newHeight = 50;
    } else {
      newHeight = 70;
    }

    setRowHeight(newHeight);
  }, [rows, columns]);
  return (
    <>
      <DataGrid
        rows={paginatedRows}
        columns={columns
          .filter(
            ({ field }) =>
              !hiddenColumns.includes(field) &&
              !columns.find((col) => col.field === field)?.hide
          )
          .map((col) => ({
            ...col,
            headerName: (
              <div
                style={{
                  whiteSpace: "pre-line",
                  overflow: "visible",
                  lineHeight: "normal",
                }}
              >
                {col.headerName}
              </div>
            ),
            renderCell: (params) => renderCellContent(col, params),
          }))}
        disableSelectionOnClick
        headerHeight={showHeaderHeight ? 25 : 35}
        rowHeight={rowHeight}
        showCellRightBorder={true}
        disableColumnFilter
        disableColumnSelector
        disableColumnMenu
        hideFooterPagination
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "Mui-even" : "Mui-odd"
        }
        components={{
          Footer: (props) => (
            <CustomFooter
              rowCount={rows.length}
              handleAddRow={handleAddRow}
              showAddRowButton={showAddRowButton}
              {...props}
            />
          ),
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        className={gridClasses.root}
        sx={{
          [`& .${gridClasses.rows}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? grey[200] : grey[900],
          },
          border: "1px solid lightgrey",
        }}
      />

      <div style={{ marginTop: "16px" }}>
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
}

export default ProviderTable;
