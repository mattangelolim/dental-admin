import React from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PaymentModal from "../components/PaymentModal";

function PaymentHistory() {
  const rows = [
    {
      id: 1,
      name: "John Doe",
      mode: "Credit Card",
      status: "Paid",
      amount: 100,
    },
    { id: 2, name: "Jane Smith", mode: "Cash", status: "Pending", amount: 150 },
    {
      id: 3,
      name: "Bob Johnson",
      mode: "PayPal",
      status: "Failed",
      amount: 75,
    },
    {
      id: 4,
      name: "Alice Williams",
      mode: "Credit Card",
      status: "Paid",
      amount: 200,
    },
    // Add more data as needed
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "mode", headerName: "Mode of Payment", width: 150 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "amount", headerName: "Amount", width: 120 },
  ];
  return (
    <div className=" flex justify-center items-center bg-white shadow-inner p-2">
      <div className=" w-[75%] flex flex-col gap-4 justify-center items-center">
        <div className=" w-full flex justify-between items-center">
          <p className="text-2xl text-gray-800 font-[Poppins] font-bold">
            Payment History
          </p>
          {/* <Button variant="contained" className="bg-blue-600 text-white">
            Add Data
          </Button> */}
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
