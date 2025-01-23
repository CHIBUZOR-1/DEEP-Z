import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div className='w-full flex justify-between items-center p-1 bg-white h-16 shadow-md fixed'>
        <div>
            <img src={assets.deepz} className='w-14 h-14 rounded-md' alt="" />
        </div>
        <div className='flex gap-3 justify-between items-center'>
            <button onClick={()=> navigate('/deep-z-auth')} className='bg-facebookDark-400 p-2 text-slate-50 rounded-md font-semibold'>Sign in/Get started</button>
        </div>
    </div>
  )
}

export default Navbar