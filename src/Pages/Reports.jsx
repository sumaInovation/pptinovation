import React, { useState,useContext, useEffect } from "react";
import ParameterMenu from '../Components/Report/ParameterMenu'
import Chart from "../Components/Report/Chart";
import Rawdata from '../Components/Report/Rawdata'
import { useGoogleContext } from '../Components/Common/GoogleAuthContext';

const Reports = () => {
 const{userData}=useGoogleContext();

  
  const [Result, setResult] = useState([]);
  const [linedata, setLinedata] = useState({});
  const [piedata, setPiedata] = useState({});
  const[Tabledata,setTableData]=useState([]);
  const[Tableoption,setTableoptions]=useState([]);
  
  

  const options = ["IDLE", "RUNNING", "SPOOL FILED", "SPOOL EMPTHY", "TAPE DETECT", "COPPER BROKEN", "OTHERS"];
  
    // State to keep track of the active tab
    const [activeTab, setActiveTab] = useState(1);
    const [formData, setFormData] = useState({
      startDate: "",
      endDate: "",
      selectedOptions: options,
    });
   
     // Handle data from the child component
     const handleFormData = async(data) => {
      
       setFormData(data);
       handleHTTPRequest(data)
      
      // Optionally, log the data
     //console.log("Received data from child:", data);
    };

  function generateDateRange(startDate, endDate) {
    const dateArray = [];

    // Convert startDate and endDate to Date objects
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    // Loop to push each day to the dateArray
    while (currentDate <= end) {
      dateArray.push(new Date(currentDate)); // Push a copy of the current date
      currentDate.setDate(currentDate.getDate() + 1); // Increment by 1 day
    }

    return dateArray.map(i => i.toLocaleDateString());
  }

  function parseDate(dateString) {
    const [month, day, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day); // JavaScript months are 0-indexed
  }


  const handleHTTPRequest = async (date) => {
   
    if (1==1) {
      
      try {

        fetch("https://googlesheet-yuetcisb.b4a.run/userdata")
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();  // Read the response body as JSON
          })
          .then(data => {
            const filterData = data.filter(item =>
              (parseDate(item[0]) >= parseDate(date.startDate) && parseDate(item[0]) <= parseDate(date.endDate))
            )
            setResult(filterData);
            UpdatePiechart(date,filterData);
            UpdateLinechart(filterData);
            UpdatesTable(filterData,date.selectedOptions);
            
      
            setActiveTab(2);
            
           
            
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });

      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please set start and end date correctly \u{1F60A}");
    }


  }
  const value = Result.reduce((acc, current) => {
    if (!acc.some(i => i[0] == current[0])) {
      acc.push([current[0], 0, 0])
    }

    acc.forEach((j, index) => {
      if (j[0] == current[0]) {
        if (current[4] == "RUNNING") {
          acc[index][1] += parseInt(current[3], 10)
        } else {
          acc[index][2] += parseInt(current[3], 10)
        }
      }
    })
    return acc
  }, []);

  const UpdatePiechart = (data,Result) => {
    const myvalue = data.selectedOptions.reduce((acc, item) => {
      if (acc[item] == null) acc[item] = 0;
      acc[item] = Result.reduce((prev, current) => {
        if (current[4] == item) prev += parseInt(current[3], 10);
        return prev;
      }, 0)
      return acc;

    }, {})
    setPiedata(myvalue);
  }
  const UpdateLinechart = (Result) => {
    const grouped = Result.reduce((acc, item) => {
      const key = item[0];
      if (acc[key] == null) acc[key] = 0;
      if (item[4] == "RUNNING")
        acc[key] += parseInt(item[3], 10);
      return acc
    }, {})

    setLinedata(grouped);
  }

  const UpdatesTable=(Result,selecitem)=>{
    setTableData(Result);
    setTableoptions(selecitem);

  }
  if (!userData) {
    return <div className="mt-[100px] text-8xl">Please log in to see  Overviwe Page.</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto mt-[80px]">
      {/* Tabs Header */}
      <div className="flex border-b border-gray-300">
        <button
          onClick={() => setActiveTab(1)}
          className={`flex-1 py-2 text-center text-lg ${
            activeTab === 1 ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
          }`}
        >
          Search
        </button>
        <button
          onClick={() => {setActiveTab(2)
         
          }}
          className={`flex-1 py-2 text-center text-lg ${
            activeTab === 2 ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
          }`}
        >
          Graphycal
        </button>
        <button
          onClick={() => setActiveTab(3)}
          className={`flex-1 py-2 text-center text-lg ${
            activeTab === 3 ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
          }`}
        >
          Raw Data
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4 p-4 ">
        {activeTab === 1 && (
          <div>
           
            <ParameterMenu  onConfirm={handleFormData} handlhhtp={()=>{}} />
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-300">Analysis Report</h2>
            <Chart Linedata={linedata} Piedata={piedata} Tabledata={value}/>
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-300">Raw Data</h2>
           <Rawdata TableData={Tabledata} Tableoption={Tableoption}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default  Reports


