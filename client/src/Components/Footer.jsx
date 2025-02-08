import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='p-2 border dark:border-purple-600 dark:bg-facebookDark-300 text-slate-50 bg-purple-950'>
      <div className='flex max-sm:flex-col  justify-between sm:items-center'>
        <div className='w-full'><img className='h-32 w-32' src={assets.deepz} alt="" /></div>
        <div className='flex w-full p-1 gap-4 max-sm:justify-between'>
          <div className='w-full'>
            <h2 className='font-semibold text-slate-100'>GET IN TOUCH</h2>
            <ul className='italic text-sm'>
              <li>(+234) 0709090090</li>
              <li>contact@deep-z.com</li>
            </ul>
          </div>
          <div className='w-full'>
              <h2 className='text-slate-100 font-semibold'>LEGAL</h2>
              <div className='text-sm w-full'>
                <p>Terms and Condition</p>
                <p>Privacy Policy</p>
              </div>
          </div> 
        </div>
      </div>
      <div className=' pt-8'>
          <hr className='text-white border border-solid w-full flex-row'/>
          <p className='max-sm:text-xs flex justify-center text-white pt-2'>Copyright 2024  &copy;  Shoplake.com - All Right Reserved</p>
      </div>
    </div>
  )
}

export default Footer