import React, { useMemo, useState } from "react";
import { Box } from "@mui/material";
import HearderTab from "../components/HeaderTab";
import "react-datepicker/dist/react-datepicker.css";
import DateTabsComparison from "../components/DateTabsComparison";

const Revenue = () => {
  const data = [];

  const generateMonthData = (month, revenue, revenueColor) => {
    return {
      date: month,
      revenue,
      revenueColor,
    };
  };

  const revenueValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  for (let i = 0; i < months.length; i++) {
    const month = months[i];
    const revenue = revenueValues[i];
    const revenueColor = "hsl(120, 70%, 50%)";

    data.push(generateMonthData(month, revenue, revenueColor));
  }

  const formattedData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Revenue",
        data: data.map((item) => item.revenue),
        backgroundColor: data.map((item) => item.revenueColor),
      },
    ],
  };

  return (
    <div className=" flex justify-center items-center bg-white shadow-inner p-2">
      <div className=" w-[75%] flex flex-col gap-4 justify-center items-center">
        <div className=" w-full">
          <p className="text-2xl text-gray-800 font-[Poppins] font-bold">
            Revenue Analytics
          </p>
        </div>
        <div className="w-full">
          <DateTabsComparison data={formattedData} />
        </div>
      </div>
    </div>
  );
};

export default Revenue;
