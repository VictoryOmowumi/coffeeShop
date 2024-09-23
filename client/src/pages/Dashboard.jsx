import React, { useState } from "react";
import SalesChart from "../components/SalesChart";
import { useNotifications } from "../context/NotificationContext";
import useFetch from "../hook/useFetch";
import { baseUrl } from "../baseUrl";
import banner from "../assets/coffee-banner.jpg";
import Loading from "../components/Loading";
import tokenDecode from "../utils/tokenDecode";
const Dashboard = () => {
  const userDetail = tokenDecode();
  const userName = userDetail?.name;
  const [filter, setFilter] = useState("week");
  const { notifications } = useNotifications();
  const greetings = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) return "Good Morning";
    if (hours < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const {data: salesData} = useFetch(`${baseUrl}/orders/sales-data?filter=${filter}`);
  const { data: summaryData, } = useFetch(`${baseUrl}/orders/sales-summary`);
  const { data: recentOrders, } = useFetch(`${baseUrl}/orders/recent-orders`);
  const { data: topProducts, loading, error } = useFetch(`${baseUrl}/products/top-products`);

  if (loading) return <Loading />;
 
  return (
    <div className="px-5 py-3 bg-gray-100 flex-1">
      <h1 className="text-2xl font-serif font-bold text-brown-900 mb-6">
        {greetings()}, {userName}!
      </h1>
      <div className="flex gap-5">
        {/* Top */}
        <div className="flex-[3] flex flex-col gap-5">
          <div className="flex w-full h-[400px] gap-5">
            <SalesChart
              salesData={salesData}
              filter={filter}
              setFilter={setFilter}
            />
            <div className="grid grid-cols-1 w-[300px] gap-4">
              {summaryData?.map((data, index) => (
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
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={index} className="">
                    <td className="p-3 bg-white">{order._id}</td>
                    <td className="p-3 bg-white">{order?.customer?.name}</td>
                    <td className="p-3 bg-white">{order?.customer?.email}</td>
                    <td className="p-3 bg-white">${order.total}</td>
                    <td className="p-3 bg-white">{order.date.toString().substring(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* right, top products and notifications */}
        <div className="flex-1 h-screen overflow-y-scroll no-scrollbar flex flex-col gap-5 bg-white p-4 rounded-md">
        <div className="flex flex-col gap-5">
              <img src={banner} alt="banner" className="rounded-md" />
            </div>
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
                  {product.name}
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