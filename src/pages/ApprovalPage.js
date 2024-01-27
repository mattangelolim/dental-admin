import React, { useState } from 'react';
import { Button, Modal, TextField, Typography, Paper } from '@mui/material';
import Header from "../components/Header"

const ApprovalPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [doctorsNote, setDoctorsNote] = useState('');
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    // Dummy appointment data (array of three appointments)
    const appointments = [
        {
            name: 'John Doe',
            contact: '123-456-7890',
            date: '2024-01-27',
            start_time: '10:00 AM',
            end_time: '11:00 AM',
            service: 'Dental Cleaning',
            tooth_name: 'Molar 1',
            client_note: 'Patient has sensitivity issues.',
        },
        {
            name: 'Jane Doe',
            contact: '987-654-3210',
            date: '2024-01-28',
            start_time: '11:30 AM',
            end_time: '12:30 PM',
            service: 'Tooth Extraction',
            tooth_name: 'Incisor',
            client_note: 'Scheduled for extraction due to decay.',
        },
        {
            name: 'Bob Smith',
            contact: '555-123-4567',
            date: '2024-01-29',
            start_time: '2:00 PM',
            end_time: '3:00 PM',
            service: 'Orthodontic Consultation',
            tooth_name: 'N/A',
            client_note: 'Consultation for braces and alignment.',
        },
    ];

    const handleApproveClick = (appointment) => {
        setSelectedAppointment(appointment);
        setIsModalOpen(true);
    };
    const handleDeclineClick = (appointment) => {
        setSelectedAppointment(appointment);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedAppointment(null);
        setDoctorsNote('');
    };

    const handleDoctorsNoteChange = (event) => {
        setDoctorsNote(event.target.value);
    };

    return (
        <div>
        <Header />
        <div className='border-2 mt-2 p-4 rounded-lg bg-opacity-90 backdrop-filter backdrop-blur-lg bg-gradient-to-b from-white to-gray-100'>
          <Typography variant="h5" className="w-1/2 mb-4 text-gray-800">Appointment Details</Typography>
          <div className="flex flex-wrap -m-4">
            {appointments.map((appointment, index) => (
              <div key={index} className="w-1/2 p-4 ">
                <Paper style={{ padding: '20px', marginTop: '20px' }} className="bg-white shadow-md rounded-lg border-2">
                  <Typography variant="h6" className="text-blue-800">Name: {appointment.name}</Typography>
                  <Typography variant="body1">Contact: {appointment.contact}</Typography>
                  <Typography variant="body1">Date: {appointment.date}</Typography>
                  <Typography variant="body1">Time: {appointment.start_time} - {appointment.end_time}</Typography>
                  <Typography variant="body1">Service: {appointment.service}</Typography>
                  <Typography variant="body1">Tooth: {appointment.tooth_name}</Typography>
                  <Typography variant="body1">Client Note: {appointment.client_note}</Typography>
                  <div className='flex flex-row gap-2'>
                    <Button variant="contained" color="primary" className="bg-blue-500 hover:bg-blue-700" onClick={() => handleApproveClick(appointment)}>
                      Approve
                    </Button>
                    <Button variant="contained" color="secondary" className="bg-red-500 hover:bg-red-700" onClick={() => handleDeclineClick(appointment)}>
                      Decline
                    </Button>
                  </div>
                </Paper>
              </div>
            ))}
          </div>
          {/* Modal for entering doctor's note */}
          <Modal open={isModalOpen} onClose={handleModalClose}>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white shadow-md p-4">
              <Typography variant="h6" className="text-gray-800" gutterBottom>
                Enter Doctor's Note for {selectedAppointment?.name}
              </Typography>
              <TextField
                label="Doctor's Note"
                multiline
                rows={4}
                fullWidth
                value={doctorsNote}
                onChange={handleDoctorsNoteChange}
              />
              <Button variant="contained" color="primary" className="bg-blue-500 hover:bg-blue-700" onClick={handleModalClose} style={{ marginTop: '10px' }}>
                Submit
              </Button>
            </div>
          </Modal>
        </div>
      </div>
      
    );
};

export default ApprovalPage;
