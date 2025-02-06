import React, { useEffect, useState } from 'react'
import DashBoardPanel from './DashBoardPanel';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../Components/Layout';
import { RiDashboardFill } from "react-icons/ri";
import AdminProfile from './AdminProfile';
import AllUsers from './AllUsers';
import AllBlogz from './AllBlogz';
import AllComments from './AllComments';

const AdminDashboard = () => {
  const location = useLocation();
  const [view, setView] = useState('');
  const navigate = useNavigate();
  
  useEffect(()=> {
    const params = new URLSearchParams(location.search);
    const viewUrl = params.get('view');
    if(viewUrl) {
      setView(viewUrl);
    }else {
      setView('');
    }
  }, [location.search]);

  const handleBackToMenu = () => {
    navigate('/dashboard');
  };

  return (
    <Layout>
      <div className='flex h-screen mt-0 top-0'>
          <div className={`${view && 'hidden sm:block'} bg-white dark:bg-facebookDark-600 w-full max-w-[180px] max-sm:max-w-full max-sm:px-2 border border-t-0 h-full`}>
            <aside className='flex flex-col p-2  max-sm:w-full gap-4'>
                <Link to={'/dashboard?view=admin-panel'} className='cursor-pointer bg-facebookDark-400 text-slate-50 rounded-md  px-3 h-[40px] text-[20px] border'>
                    <p  className='hover:text-red-500 flex justify-between'><span className=' rounded items-center text-slate-300 mt-1 p-1 text-[19px]'><RiDashboardFill /></span> Dashboard</p>
                </Link>
                <Link to={'/dashboard?view=admin-profile'} className='cursor-pointer bg-facebookDark-400 text-slate-50 rounded-md  px-3 h-[40px] text-[20px] border'>
                    <p  className='hover:text-red-500 flex justify-between'>Profile <span className='bg-black text-white rounded items-center mt-1 p-1 text-[12px]'>Admin</span></p>
                </Link>
                <Link to={'/dashboard?view=all-blogs'} className='cursor-pointer bg-facebookDark-400 text-slate-50 px-3 rounded-md h-[40px] text-[20px] border'>
                    <p className='hover:text-red-500 '>All Blogs</p>
                </Link>
                <Link to={'/dashboard?view=all-users'} className='cursor-pointer bg-facebookDark-400 text-slate-50 px-3 rounded-md h-[40px] text-[20px] border '>
                    <p className='hover:text-red-500 '>All Users</p>
                </Link>
                <Link to={'/dashboard?view=all-comments'} className='cursor-pointer bg-facebookDark-400 text-slate-50 px-3 rounded-md h-[40px] text-[20px] border '>
                    <p className='hover:text-red-500 '>All Comments</p>
                </Link>
            </aside>
          
          </div>
          <main className={`${view ? 'block' : 'hidden'} w-full sm:block`}>
            {view === 'admin-panel'? <DashBoardPanel toggleView={handleBackToMenu} /> : <Outlet/>}
            {view === 'admin-profile'? <AdminProfile toggleView={handleBackToMenu} /> : <Outlet/>}
            {view === 'all-users'? <AllUsers toggleView={handleBackToMenu} /> : <Outlet/>}
            {view === 'all-blogs'? <AllBlogz toggleView={handleBackToMenu} /> : <Outlet/>}
            {view === 'all-comments'? <AllComments toggleView={handleBackToMenu} /> : <Outlet/>}
            <Outlet />
          </main> 
      </div>
    </Layout>
  )
}

export default AdminDashboard