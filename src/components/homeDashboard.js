import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterDate from "./FilterDate";
import Chart from 'react-apexcharts';
import axios from "axios"

const HomeDashboard = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [clientsData, setClientsData] = useState(0)
  const [lineChartData, setLineChartData] = useState({
    options: {
      chart: {
        id: "basic-line"
      },
      xaxis: {
        categories: []
      },
      yaxis: {
        min: 0,
        forceNiceScale: true,
        labels: {
          formatter: function (value) {
            return Math.round(value);
          }
        }
      }
    },
    series: [
      {
        name: "Appointments",
        data: []
      }
    ]
  });


  const [servicesData, setServicesData] = useState([]);
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const defaultStart = new Date('2024-01-01').toISOString();
        const defaultEnd = new Date().toISOString();

        let servicesUrl = 'http://localhost:9000/top/services';
        let clientsUrl = 'http://localhost:9000/clients/count';
        let appointmentsUrl = 'http://localhost:9000/appointment/numbers';

        const startDateParamAppointment = fromDate ? fromDate : defaultStart;
        const endDateParamAppointment = toDate ? toDate : defaultEnd;
        appointmentsUrl += `?startDate=${startDateParamAppointment}&endDate=${endDateParamAppointment}`;

        const startDateParamServices = fromDate ? fromDate : defaultStart;
        const endDateParamServices = toDate ? toDate : defaultEnd;
        servicesUrl += `?startDate=${startDateParamServices}&endDate=${endDateParamServices}`

        const startDateParamClients = fromDate ? fromDate : defaultStart;
        const endDateParamClients = toDate ? toDate : defaultEnd;
        clientsUrl += `?startDate=${startDateParamClients}&endDate=${endDateParamClients}`;

        // Fetch appointments data
        const appointmentsResponse = await axios.get(appointmentsUrl);
        const appointmentsData = appointmentsResponse.data;
        console.log(appointmentsData)
        generateLineChartData(appointmentsData);

        // Fetch services data
        const servicesResponse = await axios.get(servicesUrl);
        const servicesData = servicesResponse.data;
        setServicesData(servicesData);

        // Fetch clients count data
        const clientsResponse = await axios.get(clientsUrl);
        const clientsDat = clientsResponse.data.users;
        setClientsData(clientsDat);
        console.log(clientsDat)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts or when fromDate or toDate changes
  }, [fromDate, toDate]);

  const barChartData = {
    options: {
      chart: {
        type: 'bar',
      },
      xaxis: {
        categories: servicesData.map(service => service.service),
      },
      yaxis: {
        title: {
          text: 'Count',
        },
      },
    },
    series: [
      {
        name: 'Service Counts',
        data: servicesData.map(service => service.count),
      },
    ],
  };

  const generateLineChartData = (data) => {
    const categories = data.map(item => item.date);
    const counts = data.map(item => item.count);
    setLineChartData({
      options: {
        ...lineChartData.options,
        xaxis: {
          categories: categories
        }
      },
      series: [
        {
          name: "Appointments",
          data: counts
        }
      ]
    });
  };

  return (
    <div className="border-2 border-red-600 flex justify-center items-center bg-white shadow-inner p-2">
      <div className="border-2 border-green-600 w-[75%] flex flex-col gap-4 justify-center items-center">
        <div className="border-2 border-blue-600 w-full flex gap-5">
          <div className=" pt-2">
            <IconButton
              onClick={toggleFilter}
              className="bg-[#182c34] hover:bg-[#182c34]"
            >
              <FilterListIcon className="text-white" />
            </IconButton>
          </div>
          {showFilter && (
            <div className="">
              <FilterDate
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
              />
            </div>
          )}
        </div>
        <div className="flex-1 w-full border-2 border-blue-600">
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* Sample Card 1 */}
            <div className="bg-white p-4 rounded-md shadow-md border-2">
              <h2 className="text-lg font-semibold mb-4">Clients:</h2>
              <p>{clientsData}</p>
            </div>
            {/* Sample Card 2 */}
            <div className="bg-white p-4 rounded-md shadow-md border-2">
              <h2 className="text-lg font-semibold mb-4">Pending Appointments:</h2>
              <p>This is another sample card. </p>
            </div>
            {/* Sample Card 2 */}
            <div className="bg-white p-4 rounded-md shadow-md border-2">
              <h2 className="text-lg font-semibold mb-4">Approved Appointments:</h2>
              <p>This is another sample card. </p>
            </div>
            {/* Sample Card 2 */}
            <div className="bg-white p-4 rounded-md shadow-md border-2">
              <h2 className="text-lg font-semibold mb-4">Today's Appointment:</h2>
              <p>This is another sample card. </p>
            </div>
            {/* Add more cards as needed */}
          </div>
          <div className="flex flex-col items-center justify-center p-2">

            <div className="flex shadow-md rounded-md border-2 mt-2 p-4 w-full">
              <Chart
                options={lineChartData.options}
                series={lineChartData.series}
                type="area"
                height={400}
                width={1000}
              />
            </div>

            <div className="flex justify-center shadow-md rounded-md border-2 mt-2 p-4 w-full" >
              <Chart
                options={barChartData.options}
                series={barChartData.series}
                type="bar"
                height={400}
                width={1000}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
