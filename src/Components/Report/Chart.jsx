import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as LineTooltip, Legend as LineLegend, ResponsiveContainer as LineResponsiveContainer } from 'recharts';

const ResponsiveCharts = ({Linedata,Piedata}) => {
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
    </div>
  );
};

export default ResponsiveCharts;
