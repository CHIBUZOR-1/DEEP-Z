import React from 'react'
import { TiHome } from 'react-icons/ti'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../Context/ThemeContext'
import { CiLight } from "react-icons/ci";
import { Switch } from 'antd';
import { MdDarkMode } from "react-icons/md";

const MenuList = ({refy, logout}) => {
  const { mode, toggleMode} = useTheme();
  const user = useSelector(state=> state?.user?.user);
  const navigate = useNavigate();
  return (
    <div ref={refy} className='absolute right-1 shadow-lg top-10 gap-2 p-1 w-40 dark:bg-facebookDark-500 z-10 bg-slate-50 flex flex-col rounded'>
        <Link to={'/'} className='gap-2 border bg-facebookDark-500 border-slate-300  active:bg-green-300 hover:border-green-300 hover:border cursor-pointer font-semibold flex items-center p-1 rounded-md'>
            <div className='bg-slate-100  dark:bg-slate-400 dark:text-slate-100 hover:border-green-300 hover:border cursor-pointer h-10 w-10 font-semibold flex justify-center text-[18px] items-center px-1 rounded-full'>
              <TiHome />  
            </div>
            <p className='dark:text-slate-200 text-slate-100 font-semibold'>Home</p>
        </Link>
        {
                user?.admin ? 
                <Link to={'/dashboard?view=admin-panel'} className={`${!user?.id && 'hidden'} gap-2 bg-facebookDark-500 active:bg-green-300 hover:border-green-300 hover:border border border-slate-300  cursor-pointer font-semibold flex items-center p-2 rounded-md`}>
                    <p className='dark:text-slate-100 text-slate-100'>Dashboard</p>
                </Link> :
                <Link to={'/user?view=my-profile'} className={`gap-2 ${!user?.id && 'hidden'} active:bg-green-300 bg-facebookDark-500 hover:border-green-300 hover:border border border-slate-300  cursor-pointer font-semibold flex items-center p-2 rounded-md`}>
                    <p className='dark:text-slate-100 text-slate-100'>Dashboard</p>
                </Link>
        }
        {
            user?.id ? 
            <div className='flex gap-3 w-full justify-between items-center'>
              <button onClick={logout} className='bg-facebookDark-500 w-full dark:border dark:border-slate-300 p-2 text-slate-50 rounded-md font-semibold'>Sign out</button>
            </div> : 
            <div className='flex w-full gap-3 justify-between items-center'>
                <button onClick={()=> navigate('/deep-z-auth')} className='bg-facebookDark-500 w-full p-2 dark:border dark:border-slate-300 text-sm py-2 text-slate-50 rounded-md font-semibold'>Sign in/Get started</button>
            </div>
        }
        <div className='flex bg-facebookDark-500 p-2 justify-between gap-2 w-full hover:border-green-300 rounded-md border border-slate-300 items-center'>{mode === 'dark'? <MdDarkMode className='text-[23px] dark:text-slate-200 font-semibold'/> :
          <CiLight className='text-[23px] text-slate-100 font-semibold' />}<Switch checked={mode === 'dark'} onChange={toggleMode} />
        </div>
    </div>
  )
}

export default MenuList