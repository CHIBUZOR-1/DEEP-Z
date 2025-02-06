import React from 'react'
import { Link } from 'react-router-dom'
import { CiLight } from "react-icons/ci";
import { Switch } from 'antd';
import { MdDarkMode } from "react-icons/md";
import { useTheme } from '../Context/ThemeContext';
import { useSelector } from 'react-redux';

const AvatarMenu = ({refy1}) => {
  const { mode, toggleMode} = useTheme();
  const user = useSelector(state=> state?.user?.user)
  return (
    <div ref={refy1} className='absolute shadow-md top-14 gap-1 flex p-1 w-40 dark:bg-facebookDark-300 z-10 flex-col rounded'>
      {
        user?.admin ? 
        <Link to={'/dashboard?view=admin-panel'} className={`gap-2 ${!user?.id && 'hidden'} active:bg-green-300 text-slate-100 hover:border-green-300 hover:border border bg-facebookDark-300 border-slate-300  cursor-pointer font-semibold flex items-center p-2 rounded-md`}>
            <p className='dark:text-slate-100'>Dashboard</p>
        </Link> :
        <Link to={'/user?view=my-profile'} className={`gap-2 ${!user?.id && 'hidden'} active:bg-green-300 text-slate-100 hover:border-green-300 hover:border bg-facebookDark-300 border border-slate-300  cursor-pointer font-semibold flex items-center p-2 rounded-md`}>
            <p className='dark:text-slate-100'>Dashboard</p>
        </Link>
      }
        <div className='flex p-2 justify-between gap-2 w-full hover:border-green-300 rounded-md border text-slate-100 bg-facebookDark-300 border-slate-300 items-center'>{mode === 'dark'? <MdDarkMode className='text-[23px] dark:text-slate-200 font-semibold'/> :
          <CiLight className='text-[23px] font-semibold' />}<Switch className='bg-purple-700 ' checked={mode === 'dark'} onChange={toggleMode} />
        </div>
    </div>
  )
}

export default AvatarMenu