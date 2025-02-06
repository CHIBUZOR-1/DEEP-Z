import React, { useEffect } from 'react'
import { GoAlert } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const UnAuthorized = () => {
  const navigate = useNavigate();
  useEffect(()=> {
    setTimeout(() => { 
      navigate('/')
    }, 4000);
  }, [])
   // Adjust the loading time as needed 
  return (
    <div className='flex min-h[65vh] flex-col items-center justify-center pt-9'>
        <div className='bg-orange-300 text-white p-4 items-center rounded-full text-[120px]'><GoAlert /></div>
        <h1 className=' font-semibold text-[90px]'>401</h1>
        <h2 className='text-red-700 font-bold text-[30px]'>Unauthorized Access:</h2>
        <p>You do not have permission to view this page using the credentials you supplied.</p>
    </div>
  )
}

export default UnAuthorized