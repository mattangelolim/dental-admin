import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { toast } from "react-toastify";

function Services() {
  const [services, setServices] = useState([]);
  const [isInput, setIsInput] = useState(false);
  const [newService, setNewService] = useState({
    service_name: "",
    service_cost: "",
    estimated_time: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://13.211.204.176/list/services"
        );
        setServices(response.data.FindAllServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewService({
      ...newService,
      [name]: value,
    });
  };

  const handleAddService = async () => {
    try {
      const responseCreate = await axios.post(
        "https://13.211.204.176/add/dental/service",
        newService
      );
      // Refresh the services list after adding the new service
      if (responseCreate.status === 201) {
        toast.success("Successfully added");
      }

      const response = await axios.get("https://13.211.204.176/list/services");
      setServices(response.data.FindAllServices);
      // Reset the input fields
      setNewService({
        service_name: "",
        service_cost: "",
        estimated_time: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Service Already Exist");
    }
  };

  const handleDeleteService = async (service_name) => {
    const body = {
      service_name,
    };

    try {
      const response = await axios.post(
        "https://13.211.204.176/delete/dental/service",
        body
      );
      if (response) {
        toast.success("Successfully deleted.");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      throw new Error("An error occured while deleting services.");
    }
  };

  return (
    <div className=" flex justify-center items-center bg-white shadow-inner p-2">
      <div className=" w-[75%] flex flex-col gap-4 justify-center items-center">
        <div className=" w-full">
          <div className="flex flex-col mt-4 justify-center items-center gap-2 font-[Poppins]">
            {isInput ? (
              <div className="p-4 border-2 bg-white shadow-md rounded-md w-[800px] flex flex-col justify-center items-center gap-4">
                <h1 className="text-xl font-bold">
                  Post new dental service to offer !!
                </h1>
                <TextField
                  label="Service Name"
                  variant="outlined"
                  name="service_name"
                  value={newService.service_name}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Service Cost"
                  variant="outlined"
                  name="service_cost"
                  value={newService.service_cost}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Estimated Time"
                  variant="outlined"
                  name="estimated_time"
                  placeholder="hourly"
                  value={newService.estimated_time}
                  onChange={handleInputChange}
                  fullWidth
                  inputProps={{ type: "number", min: 0 }} // min added to prevent negative values
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  name="description"
                  value={newService.description}
                  onChange={handleInputChange}
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddService}
                  style={{ backgroundColor: "#0096FF" }}
                >
                  Add Service
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 justify-center items-center font-[Poppins] ">
                <h2 className="text-3xl font-bold text-cyan-500 bg-gray-100 p-2 rounded-md shadow-md">
                  Manage Services
                </h2>
                <ul className="text-xl bg-gray-200 mt-2 p-4 rounded-lg border-2 h-[30rem] overflow-y-auto flex flex-col gap-4">
                  {services.map((service) => (
                    <li
                      key={service.id}
                      className=" bg-white p-6 rounded-md flex gap-10 justify-center items-center"
                    >
                      <div className="flex-1 flex flex-col gap-2">
                        <h3 className="text-2xl font-bold">
                          {service.service_name}
                        </h3>
                        <p className="text-base">
                          <strong>Cost:</strong> PHP {service.service_cost}
                        </p>
                        <p className="text-base">
                          <strong>Estimated Time:</strong>{" "}
                          {service.estimated_time} hours
                        </p>
                        <div className="max-h-[5rem] overflow-y-auto border-2 p-2 rounded-lg overfs">
                          <p className="text-base">{service.description}</p>
                        </div>
                      </div>
                      <Button
                        variant="outlined"
                        className="bg-red-600 text-white hover:bg-red-600"
                        onClick={() =>
                          handleDeleteService(service.service_name)
                        }
                      >
                        Delete
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Button
              variant="contained"
              onClick={() => setIsInput(!isInput)}
              style={{ backgroundColor: "#0096FF" }}
            >
              {isInput ? "Show Services" : "Add New Service"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
