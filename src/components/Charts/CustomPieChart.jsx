import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    Sector ,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import CustomLegend from './CustomLegend';
import CustomTooltip from './CustomTooltip';
const CustomPieChart = ({ 
    data , label ,totalAmount , colors , showTextAnchor
}) => { 

     const coloredChartData = data.map((entry, index) => ({
        ...entry,
        fill: colors[index % colors.length]
     }));
    
    return <ResponsiveContainer width="100%" height={350}>
        <PieChart>
            <Pie 
                data={coloredChartData}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={130}
                innerRadius={100}
                labelLine={false}
                
            >
               
            </Pie>
            <Tooltip content={<CustomTooltip />}/>
            <Legend content={<CustomLegend />} />

            {showTextAnchor && (
                <>
                    <text
                        x="50%"
                        y="50%"
                        dy={-20}
                        textAnchor="middle"
                        fill="#666"
                        fontSize="14px"
                    >
                        {label}
                    </text>
                    <text
                        x="50%"
                        y="50%"
                        dy={8}
                        textAnchor="middle"
                        fill="#333"
                        fontSize="24px"
                        fontWeight="semi-bold"
                    >
                        {totalAmount}
                    </text>
                </>
            )}
      </PieChart>
  </ResponsiveContainer>
}

export default CustomPieChart