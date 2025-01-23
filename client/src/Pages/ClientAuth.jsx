import React, { useState } from 'react'
import TabNav from '../Components/TabNav';
import TabContent from '../Components/TabContent';
import SIgnIn from '../Components/SIgnIn';
import SignUp from '../Components/SignUp';

const ClientAuth = () => {
    const [activeTab, setActiveTab] = useState('Sign-In'); 
    const tabs = ['Sign-In', 'Sign-Up']; 
    const content = {
        'Sign-In': <SIgnIn/>,
        'Sign-Up': <SignUp change={setActiveTab}/>
    };
  return (
    <div className='h-screen flex justify-center pt-7'>
        <div className='w-[90%] items-center shadow-lg flex flex-col'>
            <h2 className='text-2xl font-semibold'>Welcome</h2>
            <p className='text-slate-500 max-sm:text-sm font-semibold'>{activeTab === 'Sign-In' ?"Login with your details":'Fill in your details to get started'}</p>
            <div className="w-[85%] mx-auto mt-10  rounded shadow-md"> 
                <TabNav tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} /> 
                <TabContent content={content[activeTab]} /> 
            </div>  
        </div>
        
    </div>
  )
}

export default ClientAuth