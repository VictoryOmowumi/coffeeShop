import React from 'react'
import Lottie from 'react-lottie'
import loading from '../assets/loading.json'
const Loading = () => {
  return (
    
    <div className="flex flex-col h-screen justify-center items-center">
        <Lottie options={{
            loop: true,
            autoplay: true,
            animationData: loading,
            rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
            }
        }} height={300} width={500} />
        <p className='text-2xl mt-2'>Loading...</p>
    </div>
  )
}

export default Loading