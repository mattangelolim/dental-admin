import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";

const MyClientsPage = () => {
  const [userList, setUserList] = useState([]);

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

  useEffect(() => {
    const baseUrl = "https://13.211.204.176/user/list";
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(baseUrl); // Use await here
        const result = response.data.allUsers;
        setUserList(result);
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while fetching all users.");
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <div className=" flex justify-center items-center bg-white shadow-inner p-2">
      <div className=" w-[75%] flex flex-col gap-4 justify-center items-center">
        <div className=" w-full">
          <p className="text-2xl text-gray-800 font-[Poppins] font-bold">
            Manage Clients
          </p>
        </div>
        <div className=" w-full">
          <DataGrid
            slots={{
              toolbar: GridToolbar,
            }}
            rows={userList}
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
