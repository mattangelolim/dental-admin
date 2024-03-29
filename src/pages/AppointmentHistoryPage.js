import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import { Box, Button } from "@mui/material";
import axios from "axios";
import TeethModal from "../components/TeethModal";

const AppointmentHistoryPage = () => {
  const [appointmentHistory, setAppointmentHistory] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedToothIndexes, setSelectedToothIndexes] = useState([]);
  const [selectedToothIndexes2, setSelectedToothIndexes2] = useState([]);
  const [diagnosis, setDiagnosis] = useState("");

  const handleAddIconClick = (rowId) => {
    setSelectedRowId(rowId);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleNumberClick = (number) => {
    setSelectedToothIndexes((prevIndexes) => [...prevIndexes, number]);
  };
  const handleNumberClick2 = (number) => {
    setSelectedToothIndexes2((prevIndexes) => [...prevIndexes, number]);
  };

  const handleDiagnosisChange = (event) => {
    const newDiagnosis = event.target.value;
    setDiagnosis(newDiagnosis);
  };

  const handleConfirmSelection = async () => {
    // Increment each selected number by 1
    const incrementedIndexes = selectedToothIndexes.map((index) => index + 1);
    const incrementedIndexes2 = selectedToothIndexes2.map((index) => index + 1);

    if (incrementedIndexes.length > 0 || incrementedIndexes2.length > 0) {
      const combination = [
        ...incrementedIndexes, // Elements of array1
        999, // Number 1 to be inserted
        ...incrementedIndexes2, // Elements of array2
      ];

      // TEETH MODAL
      await axios
        .post(`https://13.211.204.176/update/toothname?uid=${selectedRowId}`, {
          tooth_index: combination,
        })
        // .then((response) => {
        //   if (response.data.message === "Tooth name updated successfully") {
        //     alert("Tooth Name Set Successful");
        //     window.location.reload();
        //   }
        // })
        .catch((error) => {
          console.error("Error confirming selection:", error);
        });

      // DIAGNOSIS
      await axios
        .post("https://13.211.204.176/appointment/diagnostic", {
          id: selectedRowId,
          doctors_diagnose: diagnosis,
        })
        .catch((error) => {
          console.error("Error confirming diagnosis:", error);
        });
    } else {
      // Handle the case where both arrays are empty
      alert("Please select at least one service.");
    }

    handleCloseModal();
    setSelectedToothIndexes([]);
    setSelectedRowId(null);
    window.location.reload();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Done":
        return "green"; // You can adjust the color for 'Done'
      case "Today":
        return "blue"; // You can adjust the color for 'Today'
      case "Declined":
        return "red"; // You can adjust the color for 'Declined'
      case "Pending":
        return "yellow"; // You can adjust the color for 'Pending'
      case "Approved":
        return "cyan"; // You can adjust the color for 'Approved'
      default:
        return "";
    }
  };

  useEffect(() => {
    // Fetch all appointments from the API
    axios
      .get("https://13.211.204.176/fetch/all/Appointments")
      .then((response) => {
        console.log(response.data.allAppointments);
        setAppointmentHistory(response.data.allAppointments);
      })
      .catch((error) => {
        console.error("Error fetching appointment history:", error);
      });
  }, []);

  // Columns configuration for DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "contact", headerName: "Contact", width: 150 },
    { field: "date", headerName: "Date", width: 120 },
    { field: "start_time", headerName: "Start Time", width: 120 },
    // { field: "end_time", headerName: "End Time", width: 120 },
    {
      field: "service",
      headerName: "Service",
      width: 200,
      renderCell: (params) => (
        <p>
          {params.row.service} -{" "}
          <span className="text-sm">{params.row.service_cost}</span>
        </p>
      ),
    },
    {
      field: "additional_service",
      headerName: "Additional Service",
      width: 200,
      renderCell: (params) => (
        <div>
          {params.row.AdditionalServices.map((service) => (
            <p key={service.service_description}>
              {service.service_description} -{" "}
              <span className="text-sm">{service.service_cost}</span>
            </p>
          ))}
        </div>
      ),
    },
    {
      field: "tooth_name",
      headerName: "Tooth Name",
      width: 120,
      renderCell: (params) =>
        params.value ? (
          <>
            <TeethModal
              teethArray={params.value}
              service={params.row.service}
              additional={
                params.row.AdditionalServices[0]?.service_description || ""
              }
              diagnosis={params.row.doctors_diagnostic}
            />
          </>
        ) : (
          params.row.status === "Approved" &&
          params.row.date &&
          params.row.date <= dayjs().format("YYYY-MM-DD") && (
            <IconButton onClick={() => handleAddIconClick(params.row.id)}>
              <AddIcon />
            </IconButton>
          )
        ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <div style={{ color: getStatusColor(params.value) }}>
          {params.value}
        </div>
      ),
    },
  ];

  // Function to calculate status based on the date
  const calculateStatus = (date, status, toothArray) => {
    const currentDate = new Date();
    const appointmentDate = new Date(date);
    if (
      appointmentDate < currentDate &&
      status !== 1 &&
      toothArray &&
      toothArray.length > 0
    ) {
      return "Done";
    } else if (appointmentDate === "2024-01-30" && status !== 1) {
      return "Today";
    } else if (status === 1) {
      return "Declined";
    } else if (status === 0) {
      return "Pending";
    } else {
      return "Approved";
    }
  };

  // Transform the data to include the calculated status
  const rows = appointmentHistory.map((appointment) => ({
    ...appointment,
    status: calculateStatus(
      appointment.date,
      appointment.status,
      appointment.tooth_name
    ),
  }));

  return (
    <div className=" flex justify-center items-center bg-white shadow-inner p-2 ">
      <div className=" w-[75%] flex flex-col gap-4 justify-center items-center">
        <div className=" w-full">
          <p className="text-2xl text-gray-800 font-[Poppins] font-bold">
            Appointment History
          </p>
        </div>
        {appointmentHistory.length == 0 ? (
          <p className="border-2 w-full p-2 rounded-lg">
            No listed appointment.
          </p>
        ) : (
          <>
            <div className=" w-full h-[34rem] ">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
              />
            </div>
            <Modal open={open} onClose={handleCloseModal}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  // display: "grid",
                  // gridTemplateColumns: "repeat(16, 1fr)",
                  gap: 1,
                  // border: "2px solid red",
                  width: "85%",
                  borderRadius: 2,
                }}
              >
                <div className="flex flex-col justify-center items-center gap-10 w-full ">
                  <div className="flex flex-col justify-center items-center  w-full ">
                    {selectedRowId &&
                      appointmentHistory
                        .filter((item) => item.id === selectedRowId)
                        .map((item, index) => (
                          <div className="flex flex-col gap-10 justify-center items-center  w-full">
                            <div
                              key={index}
                              className=" w-full flex-col flex gap-2"
                            >
                              <div className="flex justify-between items-center">
                                <p>{item.service}</p>
                                <Button
                                  variant="outlined"
                                  onClick={() =>
                                    setSelectedToothIndexes(
                                      Array.from(
                                        { length: 32 },
                                        (_, index) => index
                                      )
                                    )
                                  }
                                >
                                  Select all
                                </Button>
                              </div>
                              <div className="flex flex-row gap-2 w-full justify-around">
                                {[...Array(16)].map((_, index) => (
                                  <div
                                    key={index}
                                    onClick={() => handleNumberClick(index)}
                                    className="border-2 border-gray-300 w-[5%] p-1 rounded-lg text-center"
                                    style={{
                                      color: selectedToothIndexes.includes(
                                        index
                                      )
                                        ? "blue"
                                        : "black",
                                      fontWeight: selectedToothIndexes.includes(
                                        index
                                      )
                                        ? "bold"
                                        : "normal",
                                      border: selectedToothIndexes.includes(
                                        index
                                      )
                                        ? "2px solid blue"
                                        : "",
                                      transition: "transform 0.3s ease",
                                    }}
                                  >
                                    {index + 1}
                                  </div>
                                ))}
                              </div>
                              <div className="flex flex-row gap-2 w-full justify-around">
                                {[...Array(16)].map((_, index) => (
                                  <div
                                    key={index}
                                    onClick={() =>
                                      handleNumberClick(index + 16)
                                    }
                                    className="border-2 border-gray-300 w-[5%] p-1 rounded-lg text-center"
                                    style={{
                                      color: selectedToothIndexes.includes(
                                        index + 16
                                      )
                                        ? "blue"
                                        : "black",
                                      fontWeight: selectedToothIndexes.includes(
                                        index + 16
                                      )
                                        ? "bold"
                                        : "normal",
                                      border: selectedToothIndexes.includes(
                                        index + 16
                                      )
                                        ? "2px solid blue"
                                        : "",
                                      transition: "transform 0.3s ease",
                                    }}
                                  >
                                    {index + 17}
                                  </div>
                                ))}
                              </div>
                            </div>
                            {item.AdditionalServices[0] && (
                              <div className="w-full flex-col flex gap-2">
                                <div className="flex justify-between items-center">
                                  <p>
                                    {
                                      item.AdditionalServices[0]
                                        .service_description
                                    }
                                  </p>
                                  <Button
                                    variant="outlined"
                                    onClick={() =>
                                      setSelectedToothIndexes2(
                                        Array.from(
                                          { length: 32 },
                                          (_, index) => index
                                        )
                                      )
                                    }
                                  >
                                    Select all
                                  </Button>
                                </div>
                                <div className="flex flex-row gap-2 w-full justify-around">
                                  {[...Array(16)].map((_, index) => (
                                    <div
                                      key={index}
                                      onClick={() => handleNumberClick2(index)}
                                      className="border-2 border-gray-300 w-[5%] p-1 rounded-lg text-center"
                                      style={{
                                        color: selectedToothIndexes2.includes(
                                          index
                                        )
                                          ? "blue"
                                          : "black",
                                        fontWeight:
                                          selectedToothIndexes2.includes(index)
                                            ? "bold"
                                            : "normal",
                                        border: selectedToothIndexes2.includes(
                                          index
                                        )
                                          ? "2px solid blue"
                                          : "",
                                        transition: "transform 0.3s ease",
                                      }}
                                    >
                                      {index + 1}
                                    </div>
                                  ))}
                                </div>
                                <div className="flex flex-row gap-2 w-full justify-around">
                                  {[...Array(16)].map((_, index) => (
                                    <div
                                      key={index}
                                      onClick={() =>
                                        handleNumberClick2(index + 16)
                                      }
                                      className="border-2 border-gray-300 w-[5%] p-1 rounded-lg text-center"
                                      style={{
                                        color: selectedToothIndexes2.includes(
                                          index + 16
                                        )
                                          ? "blue"
                                          : "black",
                                        fontWeight:
                                          selectedToothIndexes2.includes(
                                            index + 16
                                          )
                                            ? "bold"
                                            : "normal",
                                        border: selectedToothIndexes2.includes(
                                          index + 16
                                        )
                                          ? "2px solid blue"
                                          : "",
                                        transition: "transform 0.3s ease",
                                      }}
                                    >
                                      {index + 17}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                  </div>
                  <div className="w-[93%]">
                    <TextField
                      id="outlined-multiline-static"
                      label="Doctor's Diagnosis"
                      multiline
                      rows={3}
                      className="w-full"
                      value={diagnosis}
                      onChange={handleDiagnosisChange}
                    />
                  </div>
                  <div className="mt-2 border-2 bg-blue-500 hover:text-white">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleConfirmSelection}
                      sx={{
                        height: "50px",
                        width: "400px",
                        margin: "0 auto",
                        display: "block",
                        // color: "black",
                        "&:hover": {
                          color: "white", // Change text color to white on hover
                        },
                      }}
                    >
                      Confirm
                    </Button>
                  </div>
                </div>
              </Box>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentHistoryPage;
