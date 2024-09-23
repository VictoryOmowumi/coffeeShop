import React, { useState, useEffect } from "react";
import useFetch from "../hook/useFetch";
import { baseUrl } from "../baseUrl";
import Filter from "../components/Filter";
import CustomModal from "../components/Modal";
import axios from "axios";
import EmptyState from "../components/EmptyState";
import CreateOrderForm from "../components/CreateOrderForm";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from "react-icons/md";
import { FaEye, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewDetailsModal from "../components/ViewDetailsModal";
import Loading from "../components/Loading";
const Orders = () => {
  const { data: orders, loading, error } = useFetch(`${baseUrl}/orders`);
  const [showModal, setShowModal] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingOrderId, setDeletingOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const itemsPerPage = 10;

  const handleSearch = (e) => setSearch(e.target.value);

  useEffect(() => {
    if (orders) {
      const filtered = orders.filter((order) => {
        const matchesOrderId = order._id
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesCustomerName = order.customer?.name
          .toLowerCase()
          .includes(search.toLowerCase());
        return matchesOrderId || matchesCustomerName;
      });
      setFilteredOrders(filtered);
    }
  }, [orders, search]);

  const handlePageChange = (page) => setCurrentPage(page);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`${baseUrl}/orders/${deletingOrderId}`);
      setFilteredOrders(
        filteredOrders.filter((order) => order._id !== deletingOrderId)
      );
      setShowModal(false);
      toast.success("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order");
      setShowModal(false);
    }
  };

  const showDeleteModal = (id) => {
    setDeletingOrderId(id);
    setShowModal(true);
  };

  const handleOrderCreated = (newOrder) => {
    setFilteredOrders([newOrder, ...filteredOrders]);
  };

  const viewDetails = async (orderId) => {
    try {
      const { data } = await axios.get(`${baseUrl}/orders/${orderId}`);
      console.log("Order details:", data);
      setSelectedOrder(data);
      setShowDetailsModal(true);
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast.error("Failed to fetch order details");
    }
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-5 relative bg-gray-100 flex-1">
      {!orders || orders.length === 0 ? (
        <EmptyState
          message="No orders found"
          onButtonClick={() => setShowForm(true)}
          buttonText="Create New Order"
        />
      ) : null}

      <CustomModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Delete Order"
        content="Are you sure you want to delete this order?"
        buttonText="Delete"
        onButtonClick={handleDeleteClick}
      />
      {showForm && (
        <CreateOrderForm
          onOrderCreated={handleOrderCreated}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      )}
      {showDetailsModal && (
        <ViewDetailsModal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          item={selectedOrder}
        />
      )}
      {orders.length > 0 && (
        <>
          <div className="flex justify-between mb-5">
            <h1 className="text-2xl font-serif font-bold text-brown-900">
              Orders
            </h1>
          </div>
          <Filter
            search={search}
            handleSearch={handleSearch}
            btnText="Create New Order"
            showForm={showForm}
            setShowForm={setShowForm}
            showCategories={showCategories}
             setShowCategories={setShowCategories}
          />
          <table className="w-full bg-white rounded-md shadow-sm">
            <thead className="bg-coffee-light text-white rounded-md">
              <tr className="text-left">
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order, index) => (
                <tr key={order._id} className="border-t">
                  <td className="px-4 py-4">{order?._id}</td>
                  <td className="px-4 py-4">{order?.customer?.name}</td>
                  <td className="px-4 py-4">{order?.address}</td>
                  <td className="px-4 py-4">${order?.total?.toFixed(2)}</td>
                  <td className="px-4 py-4">
                    {new Date(order?.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 gap-3">
                    <button
                      className="text-coffee hover:text-coffee-light"
                      onClick={() => viewDetails(order._id)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="ml-5 text-coffee hover:text-coffee-light"
                      onClick={() => showDeleteModal(order._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-5">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 mx-1 border bg-white text-coffee rounded-md"
              disabled={currentPage === 1}
            >
              <MdOutlineArrowBackIos />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 border ${
                  index + 1 === currentPage
                    ? "bg-coffee text-white"
                    : "bg-white text-coffee"
                } rounded-md`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 mx-1 border bg-white text-coffee rounded-md"
              disabled={currentPage === totalPages}
            >
              <MdOutlineArrowForwardIos />
            </button>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Orders;
