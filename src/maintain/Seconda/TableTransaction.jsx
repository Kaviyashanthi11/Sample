import React, { useState } from "react";
import "./ProviderTable.css";

function TableTransaction({
  rows,
  columns,
  hiddenColumns,
  showHeaderHeight = true,
  headerFontSize = "12px",
  cellFontSize = "12px"
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortedRows = React.useMemo(
    () => {
      if (!sortConfig.key) return rows;

      const sortedData = [...rows].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue)
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue)
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });

      return sortedData;
    },
    [rows, sortConfig]
  );

  const handleSort = key => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const renderCellContent = (col, value, row) =>
    <div
      style={{
        width: "100%",
        whiteSpace: "normal",
        wordWrap: "break-word",
        overflow: "hidden",
        lineHeight: "normal",
        fontSize: cellFontSize,
        textAlign: col.textAlign || "left"
      }}
    >
      {col.renderCell ? col.renderCell({ value, row }) : value}
    </div>;

  const getRowClassName = row => {
    if (row.isTotal) {
      return "total-row";
    }
    if (row.isGrandTotal) {
      return "grand-total-row";
    }
    return "default-row";
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
                height: showHeaderHeight ? "30px" : "50px",
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
                      fontSize: headerFontSize,
                      textAlign: "left",
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
                      cursor: "pointer"
                    }}
                    onClick={() => handleSort(col.field)}
                  >
                    {col.headerName}
                    {sortConfig.key === col.field &&
                      <span style={{ marginLeft: "8px" }}>
                        {sortConfig.direction === "ascending" ? "▲" : "▼"}
                      </span>}
                  </th>
                )}
            </tr>
          </thead>
          <tbody>
            {sortedRows.length === 0
              ? <tr>
                  <td
                    colSpan={
                      columns.filter(
                        ({ field }) => !hiddenColumns.includes(field)
                      ).length
                    }
                    style={{
                      padding: "16px",
                      textAlign: "center",
                      color: "black",
                      boxSizing: "border-box"
                    }}
                  >
                    No data available
                  </td>
                </tr>
              : sortedRows.map((row, rowIndex) =>
                  <tr
                    key={row.id}
                    className={getRowClassName(row)}
                    style={{
                      backgroundColor:
                        rowIndex % 2 === 0 ? "#f9f9f9" : "#ffffff",
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
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
                            borderBottom: "1px solid lightgrey",
                            borderRight:
                              colIndex < columns.length - 1
                                ? "1px solid #d3d3d3"
                                : "none",
                            flex: col.flex || 1,
                            minWidth: col.minWidth || "auto",
                            boxSizing: "border-box",
                            wordWrap: "break-word",
                            whiteSpace: "normal",
                            overflow: "hidden"
                          }}
                        >
                          {renderCellContent(col, row[col.field], row)}
                        </td>
                      )}
                  </tr>
                )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableTransaction;
