import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./ProviderTable.css";

function CustomFooter({ rowCount }) {
  return (
    <div
      style={{
        backgroundColor: "#70c9e9",
        padding: 1,
        textAlign: "center",
        position: "sticky",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 0,
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
  headerFontSize = "12px",
  cellFontSize = "12px",
  showPagination = true,
  enableSearch = true
}) {
  const [page, setPage] = useState(0);
  const [paginatedRows, setPaginatedRows] = useState([]);
  const [searchTerms, setSearchTerms] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(
    () => {
      const startIndex = page * customPageSize;
      const endIndex = startIndex + customPageSize;

      const filteredRows = rows.filter(row => {
        return Object.entries(searchTerms).every(([key, term]) =>
          row[key].toLowerCase().includes(term.toLowerCase())
        );
      });

      const sortedRows = [...filteredRows].sort((a, b) => {
        if (!sortConfig.key) return 0;

        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });

      const newRows = showPagination
        ? sortedRows.slice(startIndex, endIndex)
        : sortedRows;
      setPaginatedRows(newRows);
    },
    [page, rows, customPageSize, showPagination, searchTerms, sortConfig]
  );

  const pageCount = showPagination
    ? Math.ceil(rows.length / customPageSize)
    : 1;

  const handlePageChange = ({ selected }) => setPage(selected);

  const handleSearchChange = (e, colField) => {
    setSearchTerms(prev => ({
      ...prev,
      [colField]: e.target.value
    }));
  };

  const handleSort = colField => {
    const column = columns.find(col => col.field === colField);

    // Check if the column is sortable
    if (!column || !column.sortable) return;

    setSortConfig(prev => {
      let direction = "asc";
      if (prev.key === colField && prev.direction === "asc") {
        direction = "desc";
      }
      return { key: colField, direction };
    });
  };

  const renderCellContent = (col, value, row) => {
    const isEllipsis = col.overflowBehavior === "ellipsis";
    const isWrap = col.overflowBehavior === "wrap";

    const cellStyle = {
      width: "100%",
      whiteSpace: isWrap ? "normal" : "nowrap",
      overflow: isWrap ? "visible" : "hidden",
      textOverflow: isEllipsis ? "ellipsis" : "clip",
      lineHeight: "normal",
      fontSize: cellFontSize,
      textAlign: col.textAlign || "left",
      userSelect: "text",
      wordWrap: isWrap ? "break-word" : "normal"
    };
    return (
      <div style={cellStyle} title={isEllipsis ? value : ""}>
        {col.renderCell ? col.renderCell({ value, row }) : value}
      </div>
    );
  };

  const getRowClassName = row => {
    if (row.isGrandTotal) return "grand-total-row";
    if (row.isTotal) return "total-row";
    return "";
  };

  const getSortIndicator = colField => {
    if (sortConfig.key !== colField) return null;
    return sortConfig.direction === "asc" ? " ↑" : " ↓";
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        paddingBottom: "210px"
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
            tableLayout: "fixed",
            borderLeft: "1px solid lightgrey"
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#f2f2f2",
                //height: showHeaderHeight ? "30px" : "35px",
                display: "flex",
                boxSizing: "border-box",
                height: "auto"
              }}
            >
              {columns
                .filter(({ field }) => !hiddenColumns.includes(field))
                .map((col, colIndex) =>
                  <th
                    key={col.field}
                    onClick={() => handleSort(col.field)}
                    style={{
                      fontSize: headerFontSize,
                      textAlign: "center",
                      padding: "8px",
                      borderBottom: "1px solid lightgrey",
                      borderRight:
                        colIndex < columns.length - 1
                          ? "1px solid #d3d3d3"
                          : "none",
                      backgroundColor: col.headerBgColor || "skyblue",
                      flex: col.flex || 1,
                      minWidth: col.minWidth || "auto",
                      boxSizing: "border-box",
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      height: "auto",
                      lineHeight: "normal",
                      cursor: col.sortable ? "pointer" : "default",
                      position: "relative"
                    }}
                    onMouseEnter={e => {
                      if (col.sortable) {
                        e.target.style.textDecoration = "underline";
                        e.target.style.textDecorationColor = "#f5f5f5";
                      }
                    }}
                    onMouseLeave={e => {
                      if (col.sortable) {
                        e.target.style.textDecoration = "none";
                      }
                    }}
                  >
                    {col.headerName}
                    {col.sortable && getSortIndicator(col.field)}
                    {col.sortable &&
                      <span
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "2px",
                          backgroundColor: "#f5f5f5",
                          visibility: "hidden",
                          transition: "visibility 0.2s"
                        }}
                      />}
                  </th>
                )}
            </tr>

            {enableSearch &&
              <tr
                style={{
                  backgroundColor: "#f2f2f2",
                  height: "35px",
                  display: "flex",
                  boxSizing: "border-box"
                }}
              >
                {columns
                  .filter(({ field }) => !hiddenColumns.includes(field))
                  .map((col, colIndex) =>
                    <th
                      key={col.field}
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid lightgrey",
                        borderRight:
                          colIndex < columns.length - 1
                            ? "1px solid #d3d3d3"
                            : "none",
                        backgroundColor: "#f2f2f2",
                        flex: col.flex || 1,
                        minWidth: col.minWidth || "auto",
                        boxSizing: "border-box",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      {col.enableSearch &&
                        <input
                          type="text"
                          value={searchTerms[col.field] || ""}
                          onChange={e => handleSearchChange(e, col.field)}
                          style={{
                            width: "100%",
                            padding: "4px",
                            fontSize: "12px",
                            boxSizing: "border-box",
                            textTransform: "uppercase"
                          }}
                        />}
                    </th>
                  )}
              </tr>}
          </thead>

          <tbody>
            {paginatedRows.length > 0
              ? paginatedRows.map((row, rowIndex) =>
                  <tr
                    key={row.id}
                    className={getRowClassName(row)}
                    style={{
                      backgroundColor:
                        rowIndex % 2 === 0 ? "#f9f9f9" : "#ffffff",
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      boxSizing: "border-box",
                      height: "auto"
                    }}
                  >
                    {columns
                      .filter(({ field }) => !hiddenColumns.includes(field))
                      .map((col, colIndex) =>
                        <td
                          key={col.field}
                          style={{
                            padding: "8px",
                            borderBottom: "1px solid lightgrey",
                            borderRight:
                              colIndex < columns.length - 1
                                ? "1px solid #d3d3d3"
                                : "1px solid lightgrey",
                            flex: col.flex || 1,
                            minWidth: col.minWidth || "auto",
                            boxSizing: "border-box",
                            fontSize: "10px"
                          }}
                        >
                          {renderCellContent(col, row[col.field], row)}
                        </td>
                      )}
                  </tr>
                )
              : <tr>
                  <td
                    colSpan={columns.length}
                    style={{
                      textAlign: "center",
                      padding: "16px",
                      fontSize: "14px",
                      color: "grey"
                    }}
                  >
                    No results found
                  </td>
                </tr>}
          </tbody>
        </table>
        <CustomFooter rowCount={rows.length} />
      </div>
      {showPagination &&
        paginatedRows.length > 0 &&
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
  );
}

export default Table;
