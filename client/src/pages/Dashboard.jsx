import React, { useState } from "react";
import ApexCharts from 'react-apexcharts';
import {
  summaryData,
  recentOrders,
  topProducts,
  notifications,
  salesData,
} from "../utils/dummyData";

const Dashboard = () => {
  const username = "John Webster";
  const [filter, setFilter] = useState("week");

  const greetings = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) return "Good Morning";
    if (hours < 18) return "Good Afternoon";
    return "Good Evening";
  };

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
    <div className="px-5 py-3 bg-gray-100 flex-1">
      <h1 className="text-2xl font-serif font-bold text-brown-900 mb-6">
        {greetings()}, {username}!
      </h1>
      <div className="flex gap-5">
        {/* Top */}
        <div className="flex-[3] flex flex-col gap-5">
          <div className="flex w-full h-[400px] gap-5">
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

            <div className="grid grid-cols-1 w-[300px] gap-4">
              {summaryData.map((data, index) => (
                <div
                  key={index}
                  className="p-4 border flex flex-col justify-between rounded-md text-coffee-dark bg-coffee-light  shadow-sm"
                >
                  <div>
                    <h2 className="">{data.title}</h2>
                    <p className=" text-2xl font-bold">{data.amount}</p>
                  </div>
                  <p className="text-[12px] opacity-40 relative left-1/2">{data.lastUpdated}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Middle, recent orders */}
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <table className="w-full rounded-md">
              <thead
                className="bg-coffee-light text-coffee-dark rounded-md"
                style={{
                  borderTopLeftRadius: "0.375rem",
                  borderTopRightRadius: "0.375rem",
                }}
              >
                <tr className="rounded-md text-left ">
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={index} className="">
                    <td className="p-3 bg-white">{order.orderId}</td>
                    <td className="p-3 bg-white">{order.customer}</td>
                    <td className="p-3 bg-white">{order.total}</td>
                    <td className="p-3 bg-white">{order.status}</td>
                    <td className="p-3 bg-white">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* right, top products and notifications */}
        <div className="flex-1 h-screen flex flex-col gap-5 bg-white p-4 rounded-md">
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-bold">Notifications</h2>
            <ul className=" space-y-5">
              {notifications.map((notification, index) => (
                <li
                  key={index}
                  className="bg-[#FAF9F6] rounded border-l-4 border-coffee-light p-3"
                >
                  {notification}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col mt-5 gap-5">
            <h2 className="text-xl font-bold">Top Products</h2>
            <ul className="space-y-5">
              {topProducts.map((product, index) => (
                <li key={index} className="bg-[#FAF9F6] rounded border-l-4 border-coffee-light p-3">
                  {product}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
 