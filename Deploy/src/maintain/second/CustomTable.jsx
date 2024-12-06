import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const CustomTable = ({ rows, columns }) => {
  return (
    <Box sx={{ marginRight: "500px" }}>
      <table style={{ width: "100%", tableLayout: "fixed" }}>
        {/* Enforce fixed layout */}
        <thead style={{ whiteSpace: "nowrap" }}>
          <tr>
            {columns.map(column =>
              <th
                key={column.field}
                style={{
                  backgroundColor: "skyblue",
                  padding: "8px",
                  border: "0px solid #ddd",
                  textAlign: "left",
                  width: column.width ? `${column.width}px` : "auto"
                }}
              >
                {column.headerName}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0
            ? rows.map(row =>
                <tr key={row.id}>
                  {columns.map(column =>
                    <td
                      key={column.field}
                      style={{
                        fontSize: "0.7rem",
                        padding: "6px",
                        border: "1px solid #ddd",
                        width: column.width ? `${column.width}px` : "auto",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {column.field === "Details"
                        ? <Link
                            to={`/details/${row.id}`}
                            style={{
                              textDecoration: "underline",
                              textAlign: "center"
                            }}
                          >
                            View
                          </Link>
                        : row[column.field]}
                    </td>
                  )}
                </tr>
              )
            : <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    textAlign: "left",
                    padding: "10px",
                    fontSize: "0.8rem",
                    color: "black"
                  }}
                >
                  No results found
                </td>
              </tr>}
        </tbody>
      </table>
    </Box>
  );
};

export default CustomTable;
