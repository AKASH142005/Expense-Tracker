import React from 'react'
import { 
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts"
import CustomTooltip from './CustomTooltip'


const CustomBarChart = ({ data = []}) => {
console.log("Chart Data Sample:", data[0])
    const getBarColor = (index) => {
        return index % 2 === 0 ? "#875cf5" : "#cfbefb";
    };


  return (
      <div className="bg-white mt-6">
          <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data}>
                <CartesianGrid  stroke='none'/>
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
                  <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
                  <Tooltip content={CustomTooltip} />
                  <Bar 
                      dataKey="amount"
                      fill="#FF8042"
                      radius={[10, 10, 0, 0]}
                  >
                      {data.map((entry, index) => ( 
                          <Cell key={`Cell-${index}`} fill={ getBarColor(index)} />
                      ))}
                  </Bar>
              </BarChart>
         </ResponsiveContainer>
      </div>
  )
}

export default CustomBarChart