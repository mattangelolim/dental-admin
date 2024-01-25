import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';

const HomeDashboard = () => {
    const [showFilter, setShowFilter] = useState(false);

    const toggleFilter = () => {
        setShowFilter(!showFilter);
    };
    return (
        <div className="border-2 border-blue-200 flex flex-col bg-white shadow-inner mt-2 p-2">
            <div className="block space-x-4 p-8">
                <IconButton onClick={toggleFilter}>
                    <FilterListIcon />
                </IconButton>
                {showFilter && (
                    <div className="flex gap-2">
                        <div className="w-48">
                            <label className="block text-gray-700">Start Date</label>
                            <input
                                type="date"
                                // value={startDate.toISOString().slice(0, 10)}
                                // onChange={(e) => handleStartDateChange(new Date(e.target.value))}
                                className="border rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div className="w-48">
                            <label className="block text-gray-700">End Date</label>
                            <input
                                type="date"
                                // value={endDate.toISOString().slice(0, 10)}
                                // onChange={(e) => handleEndDateChange(new Date(e.target.value))}
                                className="border rounded px-3 py-2 w-full"
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="flex-1 px-8 overflow-y-auto">
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
    )
}

export default HomeDashboard
