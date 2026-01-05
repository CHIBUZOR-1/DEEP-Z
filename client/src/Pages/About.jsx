import React from 'react'
import Layout from '../Components/Layout'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <Layout>
      <div className=' flex max-sm:flex-col gap-3 items-center px-3 justify-center'>
          <div className='border flex justify-center items-center max-sm:h-[300px] max-sm:w-[300px] w-[30%] h-[302px]'>
            <img src={assets?.deepz} className='h-full w-full' alt="" />
          </div>
          <div className='px-3 flex flex-col justify-center items-center gap-2 flex-1 max-sm:text-sm'>
            <div className=' flex justify-center items-center flex-col'>
              <h2 className='font-semibold'>About Us</h2>
              <hr className='border w-16 border-purple-600' />
            </div>
            
            <p>Lorem Ipsum is simply a dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text since the 1500s. When an unknown printer took a gallery of type and scrambled it to make a type specimen book.</p>
          </div>
        </div>
    </Layout>
  )
}

export default About