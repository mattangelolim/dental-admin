import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterDate from "./FilterDate";
import Chart from "react-apexcharts";
import axios from "axios";

const HomeDashboard = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [clientsData, setClientsData] = useState(0);
  const [approvedData, setApprovedData] = useState(0);
  const [pendingData, setPendingData] = useState(0);
  const [todayData, setTodayData] = useState(0);
  const [lineChartData, setLineChartData] = useState({
    options: {
      chart: {
        id: "basic-line",
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        min: 0,
        forceNiceScale: true,
        labels: {
          formatter: function (value) {
            return Math.round(value);
          },
        },
      },
    },
    series: [
      {
        name: "Appointments",
        data: [],
      },
    ],
  });

  const [servicesData, setServicesData] = useState([]);
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const defaultStart = new Date("2024-01-01").toISOString();
        const defaultEnd = new Date().toISOString();

        let servicesUrl = "https://13.211.204.176/top/services";
        let clientsUrl = "https://13.211.204.176/clients/count";
        let appointmentsUrl = "https://13.211.204.176/appointment/numbers";
        let approvedAppointmentUrl =
          "https://13.211.204.176/approved/appointment/num";
        let pendingAppointmentUrl =
          "https://13.211.204.176/pending/appointment/num";
        let todayAppointmentUrl = "https://13.211.204.176/appointment/today";

        const startDateParamAppointment = fromDate ? fromDate : defaultStart;
        const endDateParamAppointment = toDate ? toDate : defaultEnd;
        appointmentsUrl += `?startDate=${startDateParamAppointment}&endDate=${endDateParamAppointment}`;
        servicesUrl += `?startDate=${startDateParamAppointment}&endDate=${endDateParamAppointment}`;
        clientsUrl += `?startDate=${startDateParamAppointment}&endDate=${endDateParamAppointment}`;
        approvedAppointmentUrl += `?startDate=${startDateParamAppointment}&endDate=${endDateParamAppointment}`;
        pendingAppointmentUrl += `?startDate=${startDateParamAppointment}&endDate=${endDateParamAppointment}`;
        todayAppointmentUrl += `?startDate=${startDateParamAppointment}&endDate=${endDateParamAppointment}`;

        // Fetch appointments data
        const appointmentsResponse = await axios.get(appointmentsUrl);
        const appointmentsData = appointmentsResponse.data;
        generateLineChartData(appointmentsData);

        // Fetch services data
        const servicesResponse = await axios.get(servicesUrl);
        const servicesData = servicesResponse.data;
        setServicesData(servicesData);

        // Fetch clients count data
        const clientsResponse = await axios.get(clientsUrl);
        const clientsDat = clientsResponse.data.users;
        setClientsData(clientsDat);

        const approvedResponse = await axios.get(approvedAppointmentUrl);
        // console.log("check",  approvedResponse.data.count)
        setApprovedData(approvedResponse.data.count);

        const pendingResponse = await axios.get(pendingAppointmentUrl);
        setPendingData(pendingResponse.data.count);

        const todayResponse = await axios.get(todayAppointmentUrl);
        setTodayData(todayResponse.data.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts or when fromDate or toDate changes
  }, [fromDate, toDate]);

  const barChartData = {
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: servicesData.map((service) => service.service),
      },
      yaxis: {
        title: {
          text: "Count",
        },
      },
    },
    series: [
      {
        name: "Service Counts",
        data: servicesData.map((service) => service.count),
      },
    ],
  };

  const generateLineChartData = (data) => {
    const categories = data.map((item) => item.date);
    const counts = data.map((item) => item.count);
    setLineChartData({
      options: {
        ...lineChartData.options,
        xaxis: {
          categories: categories,
        },
      },
      series: [
        {
          name: "Appointments",
          data: counts,
        },
      ],
    });
  };

  return (
    <div className=" flex justify-center items-center bg-white shadow-inner p-2">
      <div className=" w-[75%] flex flex-col gap-4 justify-center items-center">
        <div className=" w-full flex gap-5">
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
        <div className="flex-1 w-full ">
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* Sample Card 1 */}
            <div className="bg-white p-4 rounded-md shadow-md border-2">
              <div className="flex items-center mb-2">
                <FaUser className="text-blue-500 mr-2" />
                <h2 className="text-lg font-semibold">Clients:</h2>
              </div>
              <div className="flex justify-center items-center">
                <p className="text-2xl">{clientsData}</p>
                <span className="text-sm text-gray-400 ml-4">
                  {" "}
                  (no. of clients registered)
                </span>
              </div>
            </div>
            {/* Sample Card 2 */}
            <div className="bg-white p-4 rounded-md shadow-md border-2">
              <div className="flex items-center mb-2">
                <FaClock className="text-green-500 mr-2" />
                <h2 className="text-lg font-semibold">Pending Appointments:</h2>
              </div>
              <div className="flex justify-center items-center">
                <p className="text-2xl">{pendingData}</p>
                <span className="text-sm text-gray-400 ml-4">
                  {" "}
                  (no. of pending appointments)
                </span>
              </div>
            </div>
            {/* Sample Card 3 */}
            <div className="bg-white p-4 rounded-md shadow-md border-2">
              <div className="flex items-center mb-2">
                <FaCalendarCheck className="text-purple-500 mr-2" />
                <h2 className="text-lg font-semibold">
                  Approved Appointments:
                </h2>
              </div>
              <div className="flex justify-center items-center">
                <p className="text-2xl">{approvedData}</p>
                <span className="text-sm text-gray-400 ml-4">
                  {" "}
                  (no. of approved appointments)
                </span>
              </div>
            </div>
            {/* Sample Card 4 */}
            <div className="bg-white p-4 rounded-md shadow-md border-2">
              <div className="flex items-center mb-2">
                <FaCheckCircle className="text-red-500 mr-2" />
                <h2 className="text-lg font-semibold">Today's Appointment:</h2>
              </div>
              <div className="flex justify-center items-center">
                <p className="text-2xl">{todayData}</p>
                <span className="text-sm text-gray-400 ml-4">
                  {" "}
                  (needed appointment/procedure to perform today)
                </span>
              </div>
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

            <div className="flex justify-center shadow-md rounded-md border-2 mt-2 p-4 w-full">
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
