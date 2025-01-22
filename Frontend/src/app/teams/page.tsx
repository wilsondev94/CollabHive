"use client";

import Error from "@/components/Error";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { useAppSelector } from "@/redux/Redux";
import { useGetTeamsQuery } from "@/state/apiSlice";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "Team ID", width: 100 },

  { field: "teamName", headerName: "Team Name", width: 200 },

  { field: "productOwnerUsername", headerName: "Product Owner", width: 200 },

  {
    field: "projectManagerUsername",
    headerName: "Project Manager",
    width: 200,
  },
];

const CustomToolbar = () => (
  <GridToolbarContainer className="toolbar flex gap-2">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

export default function Teams() {
  const darkMode = useAppSelector((state) => state.global.darkMode);

  const { data: teams, isLoading, isError } = useGetTeamsQuery();

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Teams" />
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={teams || []}
          columns={columns}
          checkboxSelection
          slots={{ toolbar: CustomToolbar }}
          className={`flex justify-between ${dataGridClassNames}`}
          sx={dataGridSxStyles(darkMode)}
        />
      </div>
    </div>
  );
}
