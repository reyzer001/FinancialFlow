"use client";

import React from "react";
import {
  AreaChart as RechartsAreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatRupiah } from "@/lib/utils";

// Warna yang konsisten untuk semua chart
const COLORS = [
  "#0088FE", // Primary blue
  "#00C49F", // Teal
  "#FFBB28", // Yellow
  "#FF8042", // Orange
  "#8884D8", // Purple
  "#F5617F", // Pink
  "#82CA9D", // Green
  "#BA68C8", // Light purple
  "#4DB6AC", // Teal green
  "#FFB74D", // Light orange
];

interface ChartDataPoint {
  name: string;
  [key: string]: any;
}

interface PieChartDataPoint {
  name: string;
  value: number;
}

interface AreaChartProps {
  data: ChartDataPoint[];
  dataKey: string;
  height?: number;
  xAxisDataKey?: string;
  showTooltip?: boolean;
  showLegend?: boolean;
  showGrid?: boolean;
  fillOpacity?: number;
  stroke?: string;
  fill?: string;
}

interface BarChartProps {
  data: ChartDataPoint[];
  dataKey: string;
  height?: number;
  xAxisDataKey?: string;
  showTooltip?: boolean;
  showLegend?: boolean;
  showGrid?: boolean;
  barSize?: number;
  fill?: string;
}

interface DonutChartProps {
  data: PieChartDataPoint[];
  height?: number;
  showTooltip?: boolean;
  showLegend?: boolean;
  innerRadius?: number;
  outerRadius?: number;
}

interface LineChartProps {
  data: ChartDataPoint[];
  dataKeys: string[];
  height?: number;
  xAxisDataKey?: string;
  showTooltip?: boolean;
  showLegend?: boolean;
  showGrid?: boolean;
}

export const AreaChart: React.FC<AreaChartProps> = ({ 
  data, 
  dataKey, 
  height = 300, 
  xAxisDataKey = "name",
  showTooltip = true,
  showLegend = false,
  showGrid = true,
  fillOpacity = 0.2,
  stroke = "#0088FE",
  fill = "#0088FE",
}) => {
  const formatYAxisTick = (value: number) => {
    if (value >= 1000000) return `${value / 1000000}jt`;
    if (value >= 1000) return `${value / 1000}rb`;
    return value;
  };

  const formatTooltipValue = (value: number, name: string) => {
    return [formatRupiah(value), name];
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        <XAxis 
          dataKey={xAxisDataKey} 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false}
          tick={{ fontSize: 12 }}
          tickFormatter={formatYAxisTick}
        />
        {showTooltip && <Tooltip formatter={formatTooltipValue} />}
        {showLegend && <Legend />}
        <Area 
          type="monotone" 
          dataKey={dataKey} 
          stroke={stroke} 
          fill={fill} 
          fillOpacity={fillOpacity} 
          strokeWidth={2}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};

export const BarChartComponent: React.FC<BarChartProps> = ({ 
  data, 
  dataKey, 
  height = 300,
  xAxisDataKey = "name",
  showTooltip = true,
  showLegend = false,
  showGrid = true,
  barSize = 30,
  fill = "#0088FE",
}) => {
  const formatYAxisTick = (value: number) => {
    if (value >= 1000000) return `${value / 1000000}jt`;
    if (value >= 1000) return `${value / 1000}rb`;
    return value;
  };

  const formatTooltipValue = (value: number, name: string) => {
    return [formatRupiah(value), name];
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
        barSize={barSize}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        <XAxis
          dataKey={xAxisDataKey}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
          tickFormatter={formatYAxisTick}
        />
        {showTooltip && <Tooltip formatter={formatTooltipValue} />}
        {showLegend && <Legend />}
        <Bar dataKey={dataKey} fill={fill} radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export const DonutChart: React.FC<DonutChartProps> = ({ 
  data, 
  height = 300,
  showTooltip = true,
  showLegend = true,
  innerRadius = 60,
  outerRadius = 80,
}) => {
  const renderCustomizedLabel = ({ 
    cx, 
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    percent, 
    name 
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#666"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
      >
        {`${name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    
    return (
      <ul className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-gray-600 dark:text-gray-300">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        {showTooltip && (
          <Tooltip
            formatter={(value: number) => formatRupiah(value)}
          />
        )}
        {showLegend && <Legend content={renderLegend} />}
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          label={renderCustomizedLabel}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  dataKeys, 
  height = 300,
  xAxisDataKey = "name",
  showTooltip = true,
  showLegend = true,
  showGrid = true,
}) => {
  const formatYAxisTick = (value: number) => {
    if (value >= 1000000) return `${value / 1000000}jt`;
    if (value >= 1000) return `${value / 1000}rb`;
    return value;
  };

  const formatTooltipValue = (value: number, name: string) => {
    return [formatRupiah(value), name];
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        <XAxis
          dataKey={xAxisDataKey}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
          tickFormatter={formatYAxisTick}
        />
        {showTooltip && <Tooltip formatter={formatTooltipValue} />}
        {showLegend && <Legend />}
        {dataKeys.map((key, index) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={COLORS[index % COLORS.length]}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};