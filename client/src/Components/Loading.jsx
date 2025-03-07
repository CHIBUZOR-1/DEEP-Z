import React from 'react'
import { assets } from '../assets/assets'

const Loading = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
        <img src={assets.deepz} className='h-52 w-52 rounded-md animate-pulse' alt="" />
    </div>
  )
}

export default Loading