import React from 'react';
import ApexCharts from 'react-apexcharts';

const SalesChart = ({ salesData, filter, setFilter }) => {
  const getFilteredData = () => {
    if (filter === "week") return salesData.slice(0, 7);
    return salesData;
  };

  const filteredData = getFilteredData();

  const chartOptions = {
    chart: {
      id: "area",
      type: 'area',
      foreColor: '#4a3f35',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: filteredData.map((data) => data.day),
      labels: {
        style: {
          colors: '#fff',
          fontSize: '12px',
        },
        offsetX: 2,
      },
      grid: {
        show: false
      },
      axisTicks: {
        show: false, 
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#fff',
          fontSize: '12px',
        },
        // format the value to currency format
        formatter: (value) => `$${value}`,
      },
      grid: {
        show: false
      }
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      colors: ['#d4a373'],
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          {
            offset: 0,
            color: '#f5e6c8',
            opacity: 1,
          },
          {
            offset: 100,
            color: '#c1a57b',
            opacity: 1,
          },
        ],
      },
    },
    grid: {
      show: false, // Remove grid lines
    },
    tooltip: {
      theme: 'dark',
    },
  };

  const chartSeries = [{
    name: "Sales",
    data: filteredData.map((data) => data.sales),
  }];

  return (
    <div className="flex-[2] flex flex-col justify-between p-2 rounded-md bg-coffee">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold text-white">
          Sales Overview
        </h2>
        <select
          className="p-2 border rounded outline-none"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>
      <div className="w-full h-4/5">
        <ApexCharts
          options={chartOptions}
          series={chartSeries}
          type="area"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
};

export default SalesChart;