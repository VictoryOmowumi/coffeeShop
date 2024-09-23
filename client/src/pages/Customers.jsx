import React, { useState, useEffect } from "react";
import useFetch from "../hook/useFetch";
import { baseUrl } from "../baseUrl";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from "react-icons/md";
import Filter from "../components/Filter";
import AddCustomerForm from "../components/AddCustomerForm";
import Loading from "../components/Loading";
const Customers = () => {
  // Use the custom useFetch hook to fetch customer data
  const { data: customers, loading, error } = useFetch(`${baseUrl}/customers`);
  const [search, setSearch] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const handleSearch = (e) => setSearch(e.target.value);

  useEffect(() => {
    if (customers) {
      const filtered = customers.filter((customer) => {
        const matchesName = customer.name
          .toLowerCase()
          .includes(search.toLowerCase());
        return matchesName;
      });
      setFilteredCustomers(filtered);
    }
  }, [customers, search]);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  // Handle loading and error states
  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-5 bg-gray-100 flex-1">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>

      {showForm && (
        <AddCustomerForm showForm={showForm} setShowForm={setShowForm} />
      )}

      {customers && customers.length === 0 ? (
        <div>No customers found</div>
      ) : (
        <>
          <Filter
            search={search}
            handleSearch={handleSearch}
            btnText="Add Customer"
            showCategories={false}
            showForm={showForm}
            setShowForm={setShowForm}
          />

          <table className="w-full bg-white rounded-md shadow-sm">
            <thead className="bg-coffee-light text-white rounded-md">
              <tr className="text-left">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone No.</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={customer._id} className="border-t">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{customer.name}</td>
                  <td className="px-4 py-3">{customer.email}</td>
                  <td className="px-4 py-3">{customer.phone}</td>
                  <td className="px-4 py-3">{customer.address}</td>
                  <td className="px-4 py-3">
                    <button
                      className="text-coffee hover:text-coffee-light"
                      // onClick={() => setShowForm(true)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="ml-5 text-coffee hover:text-coffee-light"
                      // onClick={() => showDeleteModal(order._id)}
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
    </div>
  );
};

export default Customers;
