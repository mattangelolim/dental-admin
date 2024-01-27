import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Header from "../components/Header"

const AppointmentHistoryPage = () => {
  // Dummy data for appointment history
  const appointmentHistory = [
    { id: 1, name: 'John Doe', contact: '123-456-7890', date: '2024-01-30', start_time: '10:00 AM', end_time: '11:00 AM', service: 'Dental Cleaning', tooth_name: 'Molar 1', additional_service: 'X-ray', status: 'Done' },
    { id: 2, name: 'Jane Doe', contact: '987-654-3210', date: '2023-12-20', start_time: '2:00 PM', end_time: '3:00 PM', service: 'Tooth Extraction', tooth_name: 'Incisor', additional_service: 'Pain Relief', status: 'Approved' },
    { id: 3, name: 'Bob Smith', contact: '555-123-4567', date: '2023-12-25', start_time: '11:30 AM', end_time: '12:30 PM', service: 'Orthodontic Consultation', tooth_name: 'N/A', additional_service: 'Braces Consultation', status: 'Declined' },
    // Add more dummy data as needed
  ];

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
    { field: 'additional_service', headerName: 'Additional Service', width: 200 },
    { field: 'status', headerName: 'Status', width: 120 },
  ];

  // Function to calculate status based on the date
  const calculateStatus = (date, status) => {
    const currentDate = new Date();
    const appointmentDate = new Date(date);
    if (appointmentDate < currentDate && status !== 'Declined') {
      return 'Done';
    } else if (status === 'Declined') {
      return 'Declined';
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
      <div className='bg-white mt-2'>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default AppointmentHistoryPage;
