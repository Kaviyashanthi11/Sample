import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const ProviderTable = ({
  columns,
  rows,
  hiddenColumns,
  rowHeightSet,
  showHeaderHeight,
  showAddRowButton,
  handleAddRow,
  renderDropdown,
}) => {
  return (
    <>
      {showAddRowButton && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddRow}
          style={{ marginBottom: "10px" }}
        >
          Add Row
        </Button>
      )}
      <div style={{ height: rowHeightSet, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          density="compact"
          rowHeight={rowHeightSet}
          hideFooterPagination
          hideFooterSelectedRowCount
          hideFooterRowCount
          hideFooter
          hideFooterRowHeight
          disableColumnResize
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          checkboxSelection={false}
          disableSelectionOnClick
          showCellRightBorder
          showHeaderHeight={showHeaderHeight}
          disableExtendRowFullWidth
          disableColumnReorder
          disableMultipleColumnsFiltering
          disableMultipleSelection
          autoHeight
          renderCell={(params) =>
            params.field === "bIsActive" && renderDropdown(params)
          }
          {...(hiddenColumns.length > 0 && {
            columnsHide: hiddenColumns,
          })}
        />
      </div>
    </>
  );
};

export default ProviderTable;
