import * as React from "react";
import { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import dayjs from 'dayjs';



export default function FilterDate({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}) {
  const [showDate, setShowDate] = useState(null)
  const [toShowDate, setToShowDate] = useState(null)

  const handleFromDateChange = (newDate) => {
    setToShowDate(newDate)
    const modifiedDate = dayjs(newDate).add(8, 'hour');
    setFromDate(modifiedDate);
  };

  const handleToDateChange = (newDate) => {
    setShowDate(newDate)
    const modifiedDate = dayjs(newDate).add(1, 'day');
    // Update the state with the modified date
    setToDate(modifiedDate);
  };

  const handleFilterClick = () => {

    console.log("checker", toDate)
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="From"
          value={toShowDate}
          onChange={handleFromDateChange}
        />
        <DatePicker label="To" value={showDate} onChange={handleToDateChange} />
        <Button
          variant="contained"
          className="bg-[#182c34] font-[Poppins]"
          onClick={handleFilterClick}
        >
          Filter
        </Button>
      </DemoContainer>
    </LocalizationProvider>
  );
}
