
import React from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement,ChartDataLabels);

const Invoice = ({Linedata,Piedata,Tabledata}) => {
  

  // const pieData = [
  //   { name: 'Group A', value: 400 },
  //   { name: 'Group B', value: 300 },
  //   { name: 'Group C', value: 300 },
  //   { name: 'Group D', value: 200 },
  // ];
  const pieData = Object.keys(Piedata).map(key => ({
    name: key,
    value: Piedata[key],
  }));

  // // Data for LineChart
  // const lineData = [
  //   { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  //   { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  //   { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  //   { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  //   { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  //   { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  //   { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  // ];

  const lineData = Object.keys(Linedata).map(key => ({
    name: key,
    value: Linedata[key],
  }));

  const COLORS = [
    '#0088FE', // Blue
    '#00C49F', // Green
    '#FFBB28', // Yellow
    '#FF8042', // Orange
    '#FF6347', // Tomato Red
    '#4B0082', // Indigo
    '#D2691E', // Chocolate Brown
    '#20B2AA', // Light Sea Green
  ];


  
  return (
    <>
    <div className="container mx-auto p-8 text-white  bg-gray-900">
      <h1 className="lg:text-3xl text-xl font-bold text-center mb-8 ">Analysis Report</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Line Chart */}
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">Daily Production</h3>
          <div className="w-96 h-96">
          <ResponsiveContainer width="100%" height={400}>
      <LineChart data={lineData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">Running Time vs Downtime</h3>
          <div className="w-80 h-80">
          <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%" cy="50%" outerRadius={118}
          labelLine={false}  // Disable the lines connecting labels to the slices
          label={({percent }) => `${(percent * 100).toFixed(0)}%`} // Display name and percentage
        >
          {/* Map through the data and assign each slice a color */}
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        {/* Tooltip to display more info on hover */}
        <Tooltip />
        {/* Display Legend for Meaningful Names */}
        <Legend
          layout="horizontal" // Horizontal layout for the legend
          align="center" // Align the legend at the center
          verticalAlign="bottom" // Position the legend below the chart
          wrapperStyle={{
            paddingTop: '20px', // Add some spacing between chart and legend
            fontSize: '14px', // Adjust font size for better readability
          }}
        />

      </PieChart>
    </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className='lg:flex'>
      {/* Table */}
      <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Machine Performance Report</h2>
      <table border="1">
        <thead>
          <tr>
          <th style={{ border: '1px solid black', padding: '8px' }}>Date</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Runtime(Min)</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Downtime(Min)</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Effiecncy(%)</th>
          </tr>
        </thead>
        <tbody>
          {/* Render each row from the data array */}
          {Tabledata.map((entry, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{entry[0]}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{entry[1]}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{entry[2]}</td>
               <td style={{ border: '1px solid black', padding: '8px' }}>{
               
                   ((parseInt(entry[1],10)/(parseInt(entry[1],10)+parseInt(entry[2],10)))*100).toFixed(2)
               
               }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
     <div className='text-white'>
      <p>This Report Genarate by sysytem not signature requied</p>
     </div>
     </div>
     
    </div>
     <div className='h-[300px]'>
     
     </div>
    </>
  );
};

export default Invoice;
