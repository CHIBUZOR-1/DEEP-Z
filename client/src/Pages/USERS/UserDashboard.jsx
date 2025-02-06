import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout';
import { Link, Outlet, useLocation } from 'react-router-dom'
import UserProfile from '../USERS/UserProfile';

const UserDashboard = () => {
  const location = useLocation();
  const [view, setView] = useState('');
  
  useEffect(()=> {
    const params = new URLSearchParams(location.search);
    const viewUrl = params.get('view');
    if(viewUrl) {
      setView(viewUrl);
    }
  }, [location.search]);
  return (
    <Layout>
      <div className='flex dark:bg-facebookDark-200  max-sm:gap-4 max-sm:flex-col min-h-[100vh] mt-0 top-0'>
          <div className='bg-white dark:bg-facebookDark-200 w-full max-w-[180px] max-sm:max-w-full max-sm:px-2  border-t-0 h-full'>
            <aside className='flex dark:bg-facebookDark-200 flex-col p-2 max-sm:w-full gap-2'>
                <Link to={'/user?view=my-profile'} className='cursor-pointer bg-facebookDark-300 text-slate-100  rounded-md px-3 h-[40px] text-[20px] border'>
                    <p  className='hover:text-red-500 flex justify-between'>Profile <span className='bg-black text-white rounded animate-pulse items-center font-semibold mt-1 p-1 text-[12px]'>USER</span></p>
                </Link>
            </aside>
          
          </div>
          <main className='w-full'>
            {view === 'my-profile'? <UserProfile /> : <Outlet/>}
          </main> 
        </div>
    </Layout>
  )
}

export default UserDashboard