import { icons } from 'lucide-react';
import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as LineTooltip, Legend as LineLegend, ResponsiveContainer as LineResponsiveContainer } from 'recharts';







const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Chart = ({Linedata,Piedata,Tabledata}) => {
 

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
     const Maxefficency=Tabledata.reduce((acc,item)=>{
          const x=parseInt(item[1],10)/(parseInt(item[1],10)+parseInt(item[2],10))
          if(acc<x)acc=x;
           return acc;
         },-Infinity)

     
     const Minefficency=Tabledata.reduce((acc,item)=>{
       const x=parseInt(item[1],10)/(parseInt(item[1],10)+parseInt(item[2],10))
       if(acc>x)acc=x;
        return acc;
      },Infinity)
    const Average=Tabledata.reduce((acc,item)=>{
      
          acc[0]+=parseInt(item[1],10);
          acc[1]+=parseInt(item[2],10);
          acc[2]=((acc[0]*100)/(acc[0]+acc[1])).toFixed(2);
          return acc;

    },[0,0,0])
  
  const summaryData= [
    { title: 'Max Efficiency', value: (Maxefficency*100).toFixed(2)+"%", icon: '✈️' },
    { title: 'Min Efficiency', value: (Minefficency*100).toFixed(2)+"%", icon: '🚲' },
    { title: 'Average Efficiency', value: Average[2]+"%",icon: '🧰' },
    { title: 'Total Length', value: Average[0]*0.25+"M", icon: '⌛' },
  ]

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 z-0">
        {/* Pie Chart Section */}
        <div className=" flex justify-center items-center p-4 border rounded-lg shadow-lg">
          <ResponsiveContainer width="100%" height={300} >
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label={({ name, percent }) => 
                   `${(percent * 100).toFixed(0)}%`}
                
                className="text-[12px] p-1 lg:text-sm"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
               wrapperStyle={{
                fontSize: '12px',  // Set font size of legend text here
              }} />
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

      
      <div className="overflow-x-auto mt-8 text-white text-sm">
       <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
            <tr>
              <th className="py-2 px-2 border-b">Date</th>
              <th className="py-2 px-2 border-b">Runtime</th>
              <th className="py-2 px-2 border-b">Downtime</th>
              <th className="py-2 px-2 border-b">Effi</th>
            </tr>
          </thead> 
           
          <tbody>
            {Tabledata.map((row, index) => (
              <tr key={index} >
                <td className="py-2 px-2 border-b">{row[0]}</td>
                <td className="py-2 px-2 border-b">{row[1]}</td>
                <td className="py-2 px-2 border-b">{row[2]}</td>
                <td className="py-2 px-2 border-b">{
                    ((100*parseInt(row[1],10))/( parseInt(row[2],10)+ parseInt(row[1],10))).toFixed(2)
                    }</td>
              </tr>
            ))}
          </tbody>
         </table> 
      </div> 
    </div>
  );
};

export default Chart;
