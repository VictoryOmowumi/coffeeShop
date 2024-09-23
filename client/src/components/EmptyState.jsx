import React from 'react'
import Lottie from 'react-lottie'
import empty from '../assets/empty.json'
const EmptyState = ({buttonText,
        message,
        onButtonClick
}) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: empty,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    
      return (
        <div className="flex flex-col h-4/5 justify-center items-center">
          <Lottie options={defaultOptions} height={300} width={300} />
          <p className='text-2xl'>{message}</p>
          <button 
            onClick={onButtonClick}
          className='bg-coffee text-white px-4 py-2 rounded mt-5'>
            {buttonText}
          </button>

        </div>
      );
}

export default EmptyState