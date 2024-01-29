import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const MyClientsPage = () => {
  // Dummy data for list of clients with createdAt timestamp
  const clients = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      address: "123 Main St",
      createdAt: "2024-01-27T12:34:56Z",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "987-654-3210",
      address: "456 Oak St",
      createdAt: "2024-01-28T08:45:30Z",
    },
    // Add more dummy data as needed
  ];

  // Columns configuration for DataGrid, including createdAt
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "address", headerName: "Address", width: 300 },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      renderCell: (params) => new Date(params.value).toLocaleString(),
    },
  ];

  return (
    <div className="border-2 border-red-600 flex justify-center items-center bg-white shadow-inner p-2">
      <div className="border-2 border-green-600 w-[75%] flex flex-col gap-4 justify-center items-center">
        <div className="border-2 border-blue-600 w-full">
          <p className="text-2xl text-gray-800 font-[Poppins] font-bold">
            Manage Clients
          </p>
        </div>
        <div className="border-2 border-blue-600 w-full">
          <DataGrid
            slots={{
              toolbar: GridToolbar,
            }}
            rows={clients}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            slotProps={{ toolbar: { showQuickFilter: true } }}
            component={{ Toolbar: GridToolbar }}
          />
        </div>
      </div>
    </div>
  );
};

export default MyClientsPage;
