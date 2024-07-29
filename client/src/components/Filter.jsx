import React from 'react'

const Filter = ({
    search,
    handleSearch
}) => {
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
              className='border border-gray-300 rounded-md px-3 py-2'
            >
              <option value=''>All Categories</option>
              <option value=''>Category 1</option>
              <option value=''>Category 2</option>
              <option value=''>Category 3</option>
            </select>
          </div>
        </div>
    
    </div>
  )
}

export default Filter