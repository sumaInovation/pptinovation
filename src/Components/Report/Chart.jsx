import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as LineTooltip, Legend as LineLegend, ResponsiveContainer as LineResponsiveContainer } from 'recharts';



const tableData = [
  { name: 'Alice', age: 24, location: 'New York', status: 'Active' },
  { name: 'Bob', age: 30, location: 'San Francisco', status: 'Inactive' },
  { name: 'Charlie', age: 22, location: 'Los Angeles', status: 'Active' },
  { name: 'David', age: 35, location: 'Chicago', status: 'Inactive' },
];

const summaryData = [
  { title: 'Total Sales', value: '$20,000', icon: '💵' },
  { title: 'New Users', value: '500', icon: '👥' },
  { title: 'Revenue', value: '$50,000', icon: '📊' },
  { title: 'Active Sessions', value: '120', icon: '⌛' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ResponsiveDashboard = ({Linedata,Piedata,Tabledata}) => {

    const pieData = Object.keys(Piedata).map(key => ({
        name: key,
        value: Piedata[key],
      }));
    
      
    
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
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pie Chart Section */}
        <div className="flex justify-center items-center p-4 border rounded-lg shadow-lg">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart Section */}
        <div className="flex justify-center items-center p-4 border rounded-lg shadow-lg">
          <LineResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <LineTooltip />
              <LineLegend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
              
            </LineChart>
          </LineResponsiveContainer>
        </div>
      </div>

      {/* Summary Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        {summaryData.map((item, index) => (
          <div key={index} className="bg-white p-6 border rounded-lg shadow-lg flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">{item.title}</div>
              <div className="text-xl font-bold">{item.value}</div>
            </div>
            <div className="text-4xl">{item.icon}</div>
          </div>
        ))}
      </div>
{/* 
      
      <div className="overflow-x-auto mt-8">
        <table className="min-w-full bg-gray-800 text-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Age</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} >
                <td className="py-2 px-4 border-b">{row.name}</td>
                <td className="py-2 px-4 border-b">{row.age}</td>
                <td className="py-2 px-4 border-b">{row.location}</td>
                <td className="py-2 px-4 border-b">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default ResponsiveDashboard;
