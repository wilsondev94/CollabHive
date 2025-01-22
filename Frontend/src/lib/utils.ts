export const dataGridClassNames =
  "border border-gray-200 bg-white shadow dark:border-stroke-dark dark:bg-dark-secondary dark:text-gray-200 ";

export const dataGridSxStyles = (darkMode: boolean) => {
  return {
    "& .MuiDataGrid-columnHeaders": {
      color: `${darkMode ? "#e5e7eb" : ""}`,
      '& [role="row"] > *': {
        backgroundColor: `${darkMode ? "#1d1f21" : "white"}`,
        borderColor: `${darkMode ? "#2d3135" : ""}`,
      },
    },
    "& .MuiDataGrid-root": {
      width: `${darkMode ? "100%" : "100%"}`,
    },
    "& .MuiIconbutton-root": {
      color: `${darkMode ? "#a3a3a3" : ""}`,
    },
    "& .MuiTablePagination-root": {
      color: `${darkMode ? "#a3a3a3" : ""}`,
    },
    "& .MuiTablePagination-selectIcon": {
      color: `${darkMode ? "#a3a3a3" : ""}`,
    },
    "& .MuiDataGrid-cell": {
      border: "none",
    },
    "& .MuiDataGrid-row": {
      borderBottom: `1px solid ${darkMode ? "#2d3135" : "#e5e7eb"}`,
    },
    "& .MuiDataGrid-withBorderColor": {
      borderColor: `${darkMode ? "#2d3135" : "#e5e7eb"}`,
    },
    "& .MuiSvgIcon-root": {
      color: `${darkMode ? "#fff" : "#000"}`,
    },
    "& .MuiDataGrid-sortIcon": {
      color: `${darkMode ? "#fff" : "#000"}`,
    },
    "& .css-ptiqhd-MuiSvgIcon-root": {
      color: `${darkMode ? "#fff" : "#000"}`,
    },
  };
};
