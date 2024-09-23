import React from "react";
import useFetch from "../hook/useFetch";
import { baseUrl } from "../baseUrl";
const Filter = ({
  search,
  handleSearch,
  selectedCategory,
  handleCategoryChange,
  showForm,
  setShowForm,
  btnText,
  showCategories,
}) => {
  const {
    data: categories,
  } = useFetch(`${baseUrl}/products/categories`);


  return (
    <div className="w-full ">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={handleSearch}
            className="border border-gray-300 rounded-md px-3 py-2 mr-3 w-[300px]"
          />
          {
            showCategories && (
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            )
          }
         
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-coffee hover:bg-coffee-light text-white font-bold py-2 px-4 rounded-md"
        >
          {btnText}
        </button>
      </div>
    </div>
  );
};

export default Filter;
