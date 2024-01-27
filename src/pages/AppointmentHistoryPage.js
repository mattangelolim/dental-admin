import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Modal, TextField, Typography, Paper } from '@mui/material';
import Header from "../components/Header"
import axios from "axios"

const AppointmentHistoryPage = () => {
  const [appointmentHistory, setAppointmentHistory] = useState([]);

  useEffect(() => {
    // Fetch all appointments from the API
    axios.get('http://localhost:9000/fetch/all/Appointments')
      .then(response => {
        setAppointmentHistory(response.data.allAppointments);
      })
      .catch(error => {
        console.error('Error fetching appointment history:', error);
      });
  }, []);

  // Columns configuration for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'contact', headerName: 'Contact', width: 150 },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'start_time', headerName: 'Start Time', width: 120 },
    { field: 'end_time', headerName: 'End Time', width: 120 },
    { field: 'service', headerName: 'Service', width: 200 },
    { field: 'tooth_name', headerName: 'Tooth Name', width: 120 },
    {
      field: 'additional_service',
      headerName: 'Additional Service',
      width: 200,
      renderCell: (params) => (
          <div>
              {params.row.AdditionalServices.map(service => (
                  <div key={service.service_description}>
                      {service.service_description}
                  </div>
              ))}
          </div>
      )
  },
    { field: 'status', headerName: 'Status', width: 120 },
  ];

  // Function to calculate status based on the date
  const calculateStatus = (date, status) => {
    const currentDate = new Date();
    const appointmentDate = new Date(date);
    if (appointmentDate < currentDate && status !== 2) {
      return 'Done';
    } else if (status === 1) {
      return 'Declined';
    } else if (status === 0) {
      return 'Pending'
    } else {
      return 'Approved'
    }
  };

  // Transform the data to include the calculated status
  const rows = appointmentHistory.map((appointment) => ({
    ...appointment,
    status: calculateStatus(appointment.date, appointment.status),
  }));

  return (
    <div>
      <Header />
      <div className='bg-white mt-2 p-4'>
        <Typography variant="h5">Appointment Approvals</Typography>
        <div className='mt-2'>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
          />
        </div>

      </div>
    </div>
  );
};

export default AppointmentHistoryPage;
