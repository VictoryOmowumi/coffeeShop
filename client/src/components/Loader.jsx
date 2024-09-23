import React from 'react'
import {ScaleLoader} from 'react-spinners';

const Loader = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
    <ScaleLoader color="#6F4E37" loading={true} size={150} />
    </div>
  )
}

export default Loader