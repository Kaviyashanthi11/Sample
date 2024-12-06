// import React, { useState, useEffect } from "react";
// import ReactPaginate from "react-paginate";
// import "./ProviderTable.css";

// function CustomFooter({ rowCount }) {
//   return (
//     <div
//       style={{
//         backgroundColor: "#70c9e9",
//         padding: "5px",
//         textAlign: "center"
//       }}
//     >
//       Total Rows: {rowCount}
//     </div>
//   );
// }

// function Table({
//   rows,
//   columns,
//   hiddenColumns,
//   customPageSize = 15,
//   showHeaderHeight = true,
//   headerFontSize = "12px",
//   cellFontSize = "12px",
//   showPagination = true
// }) {
//   const [page, setPage] = useState(0);
//   const [paginatedRows, setPaginatedRows] = useState([]);

//   useEffect(
//     () => {
//       const startIndex = page * customPageSize;
//       const endIndex = startIndex + customPageSize;
//       const newRows = showPagination ? rows.slice(startIndex, endIndex) : rows;
//       setPaginatedRows(newRows);
//     },
//     [page, rows, customPageSize, showPagination]
//   );

//   const pageCount = showPagination
//     ? Math.ceil(rows.length / customPageSize)
//     : 1;

//   const handlePageChange = ({ selected }) => setPage(selected);

//   const renderCellContent = (col, value) =>
//     <div
//       style={{
//         width: "100%",
//         whiteSpace: "pre-wrap",
//         overflow: "visible",
//         lineHeight: "normal",
//         fontSize: cellFontSize
//       }}
//     >
//       {col.renderCell ? col.renderCell({ value }) : value}
//     </div>;

//   const getRowClassName = row => {
//     if (row.isGrandTotal) return "grand-total-row";
//     if (row.isTotal) return "total-row";
//     return "";
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         width: "100%",
//         overflow: "auto"
//       }}
//     >
//       <table
//         style={{
//           width: "100%",
//           borderCollapse: "collapse",
//           display: "flex",
//           flexDirection: "column",
//           borderLeft: "2px solid #d3d3d3",
//           borderRight: "2px solid #d3d3d3"
//         }}
//       >
//         <thead>
//           <tr
//             style={{
//               backgroundColor: "#f2f2f2",
//               height: showHeaderHeight ? "30px" : "35px",
//               display: "flex",
//               flexDirection: "row",
//               width: "100%",
//               boxSizing: "border-box"
//             }}
//           >
//             {columns
//               .filter(({ field }) => !hiddenColumns.includes(field))
//               .map((col, colIndex) =>
//                 <th
//                   key={col.field}
//                   style={{
//                     fontSize: headerFontSize,
//                     textAlign: "left",
//                     padding: "8px",
//                     borderBottom: "1px solid lightgrey",
//                     borderRight:
//                       colIndex < columns.length - 1
//                         ? "1px solid #d3d3d3"
//                         : "none",
//                     backgroundColor: col.headerBgColor || "skyblue",
//                     flex: col.flex || 1,
//                     minWidth: col.minWidth || "auto",
//                     boxSizing: "border-box"
//                   }}
//                 >
//                   {col.headerName}
//                 </th>
//               )}
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedRows.map((row, rowIndex) =>
//             <tr
//               key={row.id}
//               className={getRowClassName(row)}
//               style={{
//                 backgroundColor: rowIndex % 2 === 0 ? "#f9f9f9" : "#ffffff",
//                 display: "flex",
//                 flexDirection: "row",
//                 width: "100%",
//                 boxSizing: "border-box"
//               }}
//             >
//               {columns
//                 .filter(({ field }) => !hiddenColumns.includes(field))
//                 .map((col, colIndex) =>
//                   <td
//                     key={col.field}
//                     style={{
//                       padding: "8px",
//                       borderBottom: "1px solid lightgrey",
//                       borderRight:
//                         colIndex < columns.length - 1
//                           ? "1px solid #d3d3d3"
//                           : "none",
//                       flex: col.flex || 1,
//                       minWidth: col.minWidth || "auto",
//                       boxSizing: "border-box"
//                     }}
//                   >
//                     {renderCellContent(col, row[col.field])}
//                   </td>
//                 )}
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {showPagination &&
//         <div style={{ marginTop: "16px", paddingBottom: "24px" }}>
//           <ReactPaginate
//             previousLabel={"← Previous"}
//             nextLabel={"Next →"}
//             pageCount={pageCount}
//             marginPagesDisplayed={2}
//             pageRangeDisplayed={2}
//             onPageChange={handlePageChange}
//             containerClassName={"pagination"}
//             activeClassName={"active"}
//           />
//         </div>}

//       <CustomFooter rowCount={rows.length} />
//     </div>
//   );
// }

// export default Table;
// import React, { useState, useEffect } from "react";
// import ReactPaginate from "react-paginate";
// import "./ProviderTable.css";

// function CustomFooter({ rowCount }) {
//   return (
//     <div
//       style={{
//         backgroundColor: "#70c9e9",
//         padding: 0,
//         textAlign: "center",
//         position: "sticky",
//         bottom: 0,
//         left: 0,
//         right: 0,
//         zIndex: 1,
//         borderTop: "2px solid #d3d3d3",
//         width: "100%",
//         fontSize: "12px"
//       }}
//     >
//       Total Rows: {rowCount}
//     </div>
//   );
// }
// function Table({
//   rows,
//   columns,
//   hiddenColumns,
//   customPageSize = 15,
//   showHeaderHeight = true,
//   headerFontSize = "12px",
//   cellFontSize = "12px",
//   showPagination = true
// }) {
//   const [page, setPage] = useState(0);
//   const [paginatedRows, setPaginatedRows] = useState([]);

//   useEffect(
//     () => {
//       const startIndex = page * customPageSize;
//       const endIndex = startIndex + customPageSize;
//       const newRows = showPagination ? rows.slice(startIndex, endIndex) : rows;
//       setPaginatedRows(newRows);
//     },
//     [page, rows, customPageSize, showPagination]
//   );

//   const pageCount = showPagination
//     ? Math.ceil(rows.length / customPageSize)
//     : 1;

//   const handlePageChange = ({ selected }) => setPage(selected);

//   const renderCellContent = (col, value) =>
//     <div
//       style={{
//         width: "100%",
//         whiteSpace: "pre-wrap",
//         overflow: "visible",
//         lineHeight: "normal",
//         fontSize: cellFontSize
//       }}
//     >
//       {col.renderCell ? col.renderCell({ value }) : value}
//     </div>;

//   const getRowClassName = row => {
//     if (row.isGrandTotal) return "grand-total-row";
//     if (row.isTotal) return "total-row";
//     return "";
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         width: "100%",
//         overflow: "auto"
//       }}
//     >
//       <table
//         style={{
//           width: "100%",
//           borderCollapse: "collapse",
//           display: "flex",
//           flexDirection: "column",
//           borderLeft: "2px solid #d3d3d3",
//           borderRight: "2px solid #d3d3d3"
//         }}
//       >
//         <thead>
//           <tr
//             style={{
//               backgroundColor: "#f2f2f2",
//               height: showHeaderHeight ? "30px" : "35px",
//               display: "flex",
//               flexDirection: "row",
//               width: "100%",
//               boxSizing: "border-box"
//             }}
//           >
//             {columns
//               .filter(({ field }) => !hiddenColumns.includes(field))
//               .map((col, colIndex) =>
//                 <th
//                   key={col.field}
//                   style={{
//                     fontSize: headerFontSize,
//                     textAlign: "left",
//                     padding: "8px",
//                     borderBottom: "1px solid lightgrey",
//                     borderRight:
//                       colIndex < columns.length - 1
//                         ? "1px solid #d3d3d3"
//                         : "none",
//                     backgroundColor: col.headerBgColor || "skyblue",
//                     flex: col.flex || 1,
//                     minWidth: col.minWidth || "auto",
//                     boxSizing: "border-box"
//                   }}
//                 >
//                   {col.headerName}
//                 </th>
//               )}
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedRows.map((row, rowIndex) =>
//             <tr
//               key={row.id}
//               className={getRowClassName(row)}
//               style={{
//                 backgroundColor: rowIndex % 2 === 0 ? "#f9f9f9" : "#ffffff",
//                 display: "flex",
//                 flexDirection: "row",
//                 width: "100%",
//                 boxSizing: "border-box"
//               }}
//             >
//               {columns
//                 .filter(({ field }) => !hiddenColumns.includes(field))
//                 .map((col, colIndex) =>
//                   <td
//                     key={col.field}
//                     style={{
//                       padding: "8px",
//                       borderBottom: "1px solid lightgrey",
//                       borderRight:
//                         colIndex < columns.length - 1
//                           ? "1px solid #d3d3d3"
//                           : "none",
//                       flex: col.flex || 1,
//                       minWidth: col.minWidth || "auto",
//                       boxSizing: "border-box"
//                     }}
//                   >
//                     {renderCellContent(col, row[col.field])}
//                   </td>
//                 )}
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {showPagination &&
//         <div style={{ marginTop: "16px", paddingBottom: "24px" }}>
//           <ReactPaginate
//             previousLabel={"← Previous"}
//             nextLabel={"Next →"}
//             pageCount={pageCount}
//             marginPagesDisplayed={2}
//             pageRangeDisplayed={2}
//             onPageChange={handlePageChange}
//             containerClassName={"pagination"}
//             activeClassName={"active"}
//           />
//         </div>}

//       <CustomFooter rowCount={rows.length} />
//     </div>
//   );
// }

// export default Table;
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./ProviderTable.css";

function CustomFooter({ rowCount }) {
  return (
    <div
      style={{
        backgroundColor: "#70c9e9",
        padding: "8px",
        textAlign: "center",
        position: "sticky",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        borderTop: "2px solid #d3d3d3",
        width: "100%",
        fontSize: "12px"
      }}
    >
      Total Rows: {rowCount}
    </div>
  );
}

function Table({
  rows,
  columns,
  hiddenColumns,
  customPageSize = 15,
  showHeaderHeight = true,
  headerFontSize = "12px",
  cellFontSize = "12px",
  showPagination = true
}) {
  const [page, setPage] = useState(0);
  const [paginatedRows, setPaginatedRows] = useState([]);

  useEffect(
    () => {
      const startIndex = page * customPageSize;
      const endIndex = startIndex + customPageSize;
      const newRows = showPagination ? rows.slice(startIndex, endIndex) : rows;
      setPaginatedRows(newRows);
    },
    [page, rows, customPageSize, showPagination]
  );

  const pageCount = showPagination
    ? Math.ceil(rows.length / customPageSize)
    : 1;

  const handlePageChange = ({ selected }) => setPage(selected);

  const renderCellContent = (col, value) =>
    <div
      style={{
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontSize: cellFontSize
      }}
    >
      {col.renderCell ? col.renderCell({ value }) : value}
    </div>;

  const getRowClassName = row => {
    if (row.isGrandTotal) return "grand-total-row";
    if (row.isTotal) return "total-row";
    return "";
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          height: "calc(100% - 40px)",
          overflowY: "auto"
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            tableLayout: "fixed"
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#f2f2f2",
                height: showHeaderHeight ? "30px" : "35px",
                display: "table",
                boxSizing: "border-box"
              }}
            >
              {columns
                .filter(({ field }) => !hiddenColumns.includes(field))
                .map((col, colIndex) =>
                  <th
                    key={col.field}
                    style={{
                      fontSize: headerFontSize,
                      textAlign: "left",
                      padding: "8px",
                      borderBottom: "1px solid lightgrey",
                      borderRight:
                        colIndex < columns.length - 1
                          ? "1px solid #d3d3d3"
                          : "none",
                      backgroundColor: col.headerBgColor || "skyblue",
                      width: col.width, // Use the width provided in columns
                      minWidth: col.minWidth || "100px",
                      boxSizing: "border-box"
                    }}
                  >
                    {col.headerName}
                  </th>
                )}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row, rowIndex) =>
              <tr
                key={row.id}
                className={getRowClassName(row)}
                style={{
                  backgroundColor: rowIndex % 2 === 0 ? "#f9f9f9" : "#ffffff",
                  display: "table",
                  boxSizing: "border-box"
                }}
              >
                {columns
                  .filter(({ field }) => !hiddenColumns.includes(field))
                  .map((col, colIndex) =>
                    <td
                      key={col.field}
                      style={{
                        padding: "8px",
                        borderBottom:
                          rowIndex === paginatedRows.length - 1
                            ? "none"
                            : "1px solid lightgrey",
                        borderRight:
                          colIndex < columns.length - 1
                            ? "1px solid #d3d3d3"
                            : "none",
                        width: col.width, // Use the width provided in columns
                        minWidth: col.minWidth || "100px",
                        boxSizing: "border-box"
                      }}
                    >
                      {renderCellContent(col, row[col.field])}
                    </td>
                  )}
              </tr>
            )}
          </tbody>
        </table>

        {showPagination &&
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
          </div>}
      </div>

      <CustomFooter rowCount={rows.length} />
    </div>
  );
}

export default Table;
