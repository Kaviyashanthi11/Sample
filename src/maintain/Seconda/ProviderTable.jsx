
import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { DataGrid } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { gridClasses } from "@mui/material";
import ReactPaginate from "react-paginate";
import "./ProviderTable.css";

const StyledDataGrid = withStyles({
  root: {
    "& .MuiDataGrid-renderingZone": {
      maxHeight: "none !important",
    },
    "& .MuiDataGrid-cell": {
      lineHeight: "unset !important",
      maxHeight: "none !important",
      whiteSpace: "normal",
    },
    "& .MuiDataGrid-row": {
      maxHeight: "none !important",
    },
  },
})(DataGrid);

function CustomFooter({ rowCount }) {
  return (
    <div
      style={{
        backgroundColor: "#70c9e9",
        padding: "5px",
        textAlign: "center",
      }}
    >
      Total Rows: {rowCount}
    </div>
  );
}

function ProviderTable({
  rows,
  columns,
  hiddenColumns,
  customPageSize,
  showHeaderHeight = true,
  headerFontSize = "12px",
  cellFontSize = "12px",
}) {
  const [page, setPage] = useState(0);
  const pageSize = customPageSize || 15;
  const [paginatedRows, setPaginatedRows] = useState([]);

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
    return (
      <div
        style={{
          width: "100%",
          whiteSpace: "pre-wrap",
          overflow: "visible",
          lineHeight: "normal",
          fontSize: cellFontSize,
        }}
      >
        {value}
      </div>
    );
  };
  const getRowClassName = (params) => {
    if (params.row.isTotal) {
      return "total-row";
    }
    if (params.row.isGrandTotal) {
      return "grand-total-row";
    }
    return params.indexRelativeToCurrentPage % 2 === 0 ? "Mui-even" : "Mui-odd";
  };

  return (
    <div style={{ maxHeight: 450 }}>
      <StyledDataGrid
        rows={paginatedRows}
        columns={columns
          .filter(
            ({ field }) =>
              !hiddenColumns.includes(field) &&
              !columns.find((col) => col.field === field)?.hide
          )
          .map((col) => ({
            ...col,
            headerName: col.headerName,
            renderHeader: () => (
              <div
                style={{
                  whiteSpace: "pre-line",
                  overflow: "visible",
                  lineHeight: "normal",
                  fontSize: headerFontSize,
                }}
              >
                {col.headerName}
              </div>
            ),
            renderCell: (params) => renderCellContent(col, params),
          }))}
        disableSelectionOnClick
        headerHeight={showHeaderHeight ? 30 : 35}
        getRowHeight={() => "auto"}
        showCellRightBorder={true}
        disableColumnFilter
        disableColumnSelector
        disableColumnMenu
        hideFooterPagination
        getRowClassName={getRowClassName}
        components={{
          Footer: (props) => <CustomFooter rowCount={rows.length} {...props} />,
        }}
        className={gridClasses.root}
        sx={{
          [`& .${gridClasses.rows}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? grey[200] : grey[900],
          },
          border: "1px solid lightgrey",
        }}
        autoHeight
      />

<div style={{ marginTop: "16px", paddingBottom: "24px" }}>
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

    </div>
  );
}

export default ProviderTable;
