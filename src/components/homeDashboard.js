import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterDate from "./FilterDate";

const HomeDashboard = () => {
  const [showFilter, setShowFilter] = useState(false);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Sample Card 1 */}
            <div className="bg-white p-4 rounded-md shadow-md border-2">
              <h2 className="text-lg font-semibold mb-4">Card 1</h2>
              <p>This is a sample card content.</p>
            </div>
            {/* Sample Card 2 */}
            <div className="bg-white p-4 rounded-md shadow-md border-2">
              <h2 className="text-lg font-semibold mb-4">Card 2</h2>
              <p>This is another sample card. </p>
            </div>
            {/* Add more cards as needed */}
          </div>
          <div className="flex h-72 shadow-md rounded-md border-2 mt-2">
            Dashboard Table
          </div>
          <div className="flex h-72 shadow-md rounded-md border-2 mt-2">
            Dashboard Table
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
