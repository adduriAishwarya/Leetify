import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Label,
} from "recharts";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

const UserProblemSolvedPie = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(data);
  }, [data]);

  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        cx={100}
        cy={90}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default UserProblemSolvedPie;
