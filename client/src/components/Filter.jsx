import React from 'react'
import useFetch from '../hook/useFetch'
import { baseUrl } from '../baseUrl'
const Filter = ({
    search,
    handleSearch,
    selectedCategory,
    handleCategoryChange
}) => {

  const { data: categories, loading, error } = useFetch(`${baseUrl}/products/categories`)

  console.log(categories) 
  return (
    <div className='w-full '>
        {/* Filter component for products table to filter products by category or name */}
        <div className='flex justify-between items-center mb-5'>
          <h1 className='text-2xl font-serif font-bold text-brown-900'>Products</h1>
          <div className='flex items-center'>
            <input
              type='text'
              placeholder='Search by name'
                value={search}
                onChange={handleSearch}

              className='border border-gray-300 rounded-md px-3 py-2 mr-3'
            />
             <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className='border border-gray-300 rounded-md px-3 py-2'
          >
            <option value=''>All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          </div>
        </div>
    
    </div>
  )
}

export default Filter