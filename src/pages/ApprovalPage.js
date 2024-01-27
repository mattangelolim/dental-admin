import React, { useState, useEffect } from 'react';
import { Button, Modal, TextField, Typography, Paper } from '@mui/material';
import Header from "../components/Header"
import axios from "axios"

const ApprovalPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctor_note, setDoctorsNote] = useState('');
  const [approval, setApproval] = useState(null)
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);


  useEffect(() => {
    // Fetch pending appointments from the API
    axios.get('http://localhost:9000/fetch/pending/Appointments')
      .then(response => {
        setAppointments(response.data.pendingAppointments);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });
  }, []);

  const handleApproveClick = (appointment, approval) => {
    console.log(appointment)
    setSelectedAppointment(appointment);
    setApproval(approval)
    setIsModalOpen(true);
  };
  const handleDeclineClick = (appointment, approval) => {
    console.log(appointment)
    setSelectedAppointment(appointment);
    setApproval(approval)
    console.log(approval)
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
    setDoctorsNote('');
  };

  const handlePostApproval = async () => {
    try {
      const response = await axios.post(`http://localhost:9000/approve/appointment?id=${selectedAppointment}&approval=${approval}&doctor_note=${doctor_note}`);
      if(response.status === 200){
        alert("Appointment Status Updated")
        window.location.reload()
      }
      // Optionally update state or UI based on the response
    } catch (error) {
      console.error('Error declining appointment:', error);
      // Handle error, show message, etc.
      alert('Error declining appointment. Please try again later.');
    }
  }

  const handleDoctorsNoteChange = (event) => {
    setDoctorsNote(event.target.value);
    console.log(event.target.value)
  };

  return (
    <div>
      <Header />
      <div className='border-2 mt-2 p-4 rounded-lg bg-opacity-90 backdrop-filter backdrop-blur-lg bg-gradient-to-b from-white to-gray-100'>
        <Typography variant="h5" className="w-1/2 mb-4 text-gray-800">Appointment Approvals</Typography>
        <div className="flex flex-wrap -m-4">
          {appointments.map((appointment, index) => (
            <div key={index} className="w-1/3 p-4 ">
              <Paper style={{ padding: '20px', marginTop: '20px' }} className="bg-white shadow-md rounded-lg border-2">
                <Typography variant="h6" className="text-blue-800">Name: {appointment.name}</Typography>
                <Typography variant="body1">Contact: {appointment.contact}</Typography>
                <Typography variant="body1">Date: {appointment.date}</Typography>
                <Typography variant="body1">Time: {appointment.start_time} - {appointment.end_time}</Typography>
                <Typography variant="body1">Service: {appointment.service}</Typography>
                <Typography variant="body1">Service Fee: {appointment.service_cost}</Typography>
                <Typography variant="body1">Tooth: {appointment.tooth_name}</Typography>
                {appointment.AdditionalServices.length > 0 && (
                  <div>
                    <Typography variant="body1">Additional Services:</Typography>
                    {appointment.AdditionalServices.map((service, serviceIndex) => (
                      <div key={serviceIndex} className='ml-4'>
                        <Typography variant="body2">- {service.service_description}</Typography>
                        <Typography variant="body2">  Price: {service.service_cost}</Typography>
                      </div>
                    ))}
                  </div>
                )}
                <Typography variant="body1">Client Note: {appointment.client_note}</Typography>
                <div className='flex flex-row gap-2'>
                  <Button variant="contained" color="primary" className="bg-blue-500 hover:bg-blue-700" onClick={() => handleApproveClick(appointment.id, 'Approved')}>
                    Approve
                  </Button>
                  <Button variant="contained" color="secondary" className="bg-red-500 hover:bg-red-700" onClick={() => handleDeclineClick(appointment.id, 'Declined')}>
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
              value={doctor_note}
              onChange={handleDoctorsNoteChange}
            />
            <Button variant="contained" color="primary" className="bg-blue-500 hover:bg-blue-700" onClick={handlePostApproval} style={{ marginTop: '10px' }}>
              Submit
            </Button>
          </div>
        </Modal>
      </div>
    </div>

  );
};

export default ApprovalPage;
