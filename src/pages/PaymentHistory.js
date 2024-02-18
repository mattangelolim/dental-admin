import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PaymentModal from "../components/PaymentModal";
import MopModal from "../components/MopModal";

function PaymentHistory() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://13.211.204.176/appointment/payments"
        );
        console.log(response.data);
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "appointment_uid",
      headerName: "App ID",
      width: 70,
      renderCell: (params) => (params.value ? params.value : <p>-</p>),
    },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "mop",
      headerName: "Mode of Payment",
      width: 150,
      renderCell: (params) =>
        params.value ? params.value : <p className="text-red-600">No Data</p>,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <div
          style={{
            color:
              params.value === "Pending"
                ? "red"
                : params.value === "Paid"
                ? "green"
                : "inherit",
          }}
        >
          {params.value}
        </div>
      ),
    },

    { field: "amount", headerName: "Amount", width: 120 },
    {
      field: "type",
      headerName: "Type",
      width: 120,
      renderCell: (params) =>
        params.row.appointment_uid ? <p>Online</p> : <p>Walk-in</p>,
    },
    {
      field: "button",
      headerName: "Button",
      width: 120,
      renderCell: (params) => <MopModal id={params.row.id} />,
    },
  ];

  return (
    <div className=" flex justify-center items-center bg-white shadow-inner p-2">
      <div className=" w-[75%] flex flex-col gap-4 justify-center items-center">
        <div className=" w-full flex justify-between items-center">
          <p className="text-2xl text-gray-800 font-[Poppins] font-bold">
            Payment History
          </p>
          <PaymentModal />
        </div>
        <div className=" w-full h-[34rem] ">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </div>
      </div>
    </div>
  );
}

export default PaymentHistory;
