"use client";

import Error from "@/components/Error";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { useAppSelector } from "@/redux/Redux";
import { useGetUsersQuery } from "@/state/apiSlice";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Image from "next/image";

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 100 },
  { field: "username", headerName: "username", width: 150 },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 100,
    renderCell: (params) => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-9 w-9">
          <Image
            src={`/${params.value}`}
            alt={params.row.username}
            width={100}
            height={50}
            className="h-full rounded-full object-cover"
          />
        </div>
      </div>
    ),
  },
];

const CustomToolbar = () => (
  <GridToolbarContainer className="toolbar flex gap-2">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

export default function Users() {
  const darkMode = useAppSelector((state) => state.global.darkMode);

  const { data: users, isLoading, isError } = useGetUsersQuery();

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Users" />
      <div style={{ height: 650, width: "75%" }}>
        <DataGrid
          rows={users || []}
          columns={columns}
          slots={{ toolbar: CustomToolbar }}
          getRowId={(row) => row.userId}
          pagination
          checkboxSelection
          className={`flex justify-between ${dataGridClassNames}`}
          sx={dataGridSxStyles(darkMode)}
        />
      </div>
    </div>
  );
}
