import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";

export default function FilterDate({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}) {
  const handleFromDateChange = (newDate) => {
    setFromDate(newDate);
  };

  const handleToDateChange = (newDate) => {
    setToDate(newDate);
  };

  const handleFilterClick = () => {
    // Add your filtering logic here based on fromDate and toDate
    console.log("Date Range:", fromDate, toDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="From"
          value={fromDate}
          onChange={handleFromDateChange}
        />
        <DatePicker label="To" value={toDate} onChange={handleToDateChange} />
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
