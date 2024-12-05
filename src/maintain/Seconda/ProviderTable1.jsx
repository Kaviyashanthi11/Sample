// import React, { useState, useEffect } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { grey } from "@mui/material/colors";
// import { gridClasses } from "@mui/material";
// import ReactPaginate from "react-paginate";
// import "./ProviderTable.css";

// function CustomFooter({ rowCount }) {
//   return <div>Total Rows: {rowCount}</div>;
// }

// function ProviderTable({ rows, columns, hiddenColumns }) {
//   const [page, setPage] = useState(0);
//   const pageSize = 15;
//   const [paginatedRows, setPaginatedRows] = useState([]);

//   useEffect(() => {
//     const startIndex = page * pageSize;
//     const endIndex = startIndex + pageSize;
//     const newPaginatedRows = rows.slice(startIndex, endIndex);
//     setPaginatedRows(newPaginatedRows);
//   }, [page, rows, pageSize]);

//   const pageCount = Math.ceil(rows.length / pageSize);

//   const handlePageChange = (selectedPage) => {
//     setPage(selectedPage.selected);
//   };

//   return (
//     <>
//       <DataGrid
//         rows={paginatedRows}
//         columns={columns.filter(
//           ({ field }) =>
//             !hiddenColumns.includes(field) &&
//             !columns.find((col) => col.field === field)?.hide
//         )}
//         disableSelectionOnClick
//         rowHeight={25}
//         headerHeight={30}
//         showCellRightBorder={true}
//         disableColumnFilter
//         disableColumnSelector
//         disableColumnMenu
//         hideFooterPagination
//         components={{
//           Footer: (props) => <CustomFooter rowCount={rows.length} {...props} />,
//         }}
//         className={gridClasses.root}
//         sx={{
//           [`& .${gridClasses.rows}`]: {
//             bgcolor: (theme) =>
//               theme.palette.mode === "light" ? grey[200] : grey[900],
//           },
//           border: "1px solid lightgrey",
//         }}
//       />

//       <div style={{ marginTop: "16px" }}>
//         <ReactPaginate
//           previousLabel={"← Previous"}
//           nextLabel={"Next →"}
//           pageCount={pageCount}
//           marginPagesDisplayed={2}
//           pageRangeDisplayed={2}
//           onPageChange={handlePageChange}
//           containerClassName={"pagination"}
//           activeClassName={"active"}
//         />
//       </div>
//     </>
//   );
// }

// export default ProviderTable;
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { gridClasses } from "@mui/material";
import ReactPaginate from "react-paginate";
import "./ProviderTable.css";

function CustomFooter({ rowCount }) {
  return <div>Total Rows: {rowCount}</div>;
}

function ProviderTable({
  rows,
  columns,
  hiddenColumns,
  customPageSize,
  showHeader = true,
  showRowHeight = true,
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
                  whiteSpace: "pre-wrap", // Allow wrapping and preserve whitespace
                  overflow: "visible", // Set overflow to visible
                  lineHeight: "normal",
                }}
              >
                {col.headerName}
              </div>
            ),
            // renderCell: (params) => (
            //   <div
            //     style={{
            //       whiteSpace: "pre-wrap",
            //       overflow: "visible",
            //       lineHeight: "normal",
            //     }}
            //   >
            //     {params.value}
            //   </div>
            // ),
          }))}
        disableSelectionOnClick
        rowHeight={showRowHeight ? 25 : 35}
        headerHeight={showHeader ? 30 : 60}
        showCellRightBorder={true}
        disableColumnFilter
        disableColumnSelector
        disableColumnMenu
        hideFooterPagination
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
