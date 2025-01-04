// src/components/Card.js

import React, { useState } from "react";

const Card = ({ onConfirm,handlhhtp }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Handle checkbox changes (multi-selection)
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // Add the option if checked
      setSelectedOptions((prev) => [...prev, value]);
    } else {
      // Remove the option if unchecked
      setSelectedOptions((prev) => prev.filter((option) => option !== value));
    }
  };

  // Handle the confirm button click
   // Handle the confirm button click and pass data to parent
   const handleConfirm = () => {
    const data = {
      startDate:new Date(startDate).toLocaleDateString(),
      endDate:new Date(endDate).toLocaleDateString(),
      selectedOptions,
    };
    if(startDate!=undefined && endDate!=undefined && selectedOptions.length>0){
      onConfirm(data); // Passing the data to the parent via the callback function
      handlhhtp();//Triger HTTP handle function on Parent
    }else{
      
      alert("Please select parameters corectly!")
    }
   
  };

  return (
    <div className="max-w-md mx-auto bg-gray-200 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Filtering Data</h2>

      {/* Start Date Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* End Date Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Multi-Selection Checkboxes in Two Columns */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Options</label>
        <div className="grid grid-cols-2 gap-4">
          {/* Column 1 */}
          <div>
            <input
              type="checkbox"
              value="RUNNING"
              onChange={handleCheckboxChange}
              checked={selectedOptions.includes("RUNNING")}
              className="mr-2"
            />
            RUNNING
          </div>
          <div>
            <input
              type="checkbox"
              value="COPPER BROKEN"
              onChange={handleCheckboxChange}
              checked={selectedOptions.includes("COPPER BROKEN")}
              className="mr-2"
            />
            COPPER BROKEN
          </div>
          <div>
            <input
              type="checkbox"
              value="TAPE DETECT"
              onChange={handleCheckboxChange}
              checked={selectedOptions.includes("TAPE DETECT")}
              className="mr-2"
            />
            TAPE DETECT
          </div>

          {/* Column 2 */}
          <div>
            <input
              type="checkbox"
              value="SPOOL EMPTHY"
              onChange={handleCheckboxChange}
              checked={selectedOptions.includes("SPOOL EMPTHY")}
              className="mr-2"
            />
            SPOOL EMPTHY
          </div>
          <div>
            <input
              type="checkbox"
              value="SPOOL FILED"
              onChange={handleCheckboxChange}
              checked={selectedOptions.includes("SPOOL FILED")}
              className="mr-2"
            />
           SPOOL FILED
          </div>
          <div>
            <input
              type="checkbox"
              value="IDLE"
              onChange={handleCheckboxChange}
              checked={selectedOptions.includes("IDLE")}
              className="mr-2"
            />
            IDLE
          </div>
          <div>
            <input
              type="checkbox"
              value="OTHERS"
              onChange={handleCheckboxChange}
              checked={selectedOptions.includes("OTHERS")}
              className="mr-2"
            />
           OTHERS
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="flex justify-center">
        <button
          onClick={handleConfirm}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Card;
