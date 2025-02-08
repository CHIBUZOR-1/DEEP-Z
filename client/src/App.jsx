import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import ClientAuth from './Pages/ClientAuth';
import { ToastContainer } from 'react-toastify';
import Loading from './Components/Loading';
import Homepage from './Pages/Homepage';
import AdminPrivacy from './Components/AdminPrivacy';
import UserPrivacy from './Components/UserPrivacy';
import AdminDashboard from './Pages/ADMIN/AdminDashboard';
import UserDashboard from './Pages/USERS/UserDashboard';
import About from './Pages/About';
import NotFound from './Pages/NotFound';
import UnAuthorized from './Pages/UnAuthorized';
import NewBlog from './Pages/NewBlog';
import DashBoardPanel from './Pages/ADMIN/DashBoardPanel';
import AdminProfile from './Pages/ADMIN/AdminProfile';
import AllUsers from './Pages/ADMIN/AllUsers';
import AllBlogz from './Pages/ADMIN/AllBlogz';
import EditBlog from './Pages/EditBlog';
import ViewBlog from './Pages/ViewBlog';
import AllComments from './Pages/ADMIN/AllComments';
import Search from './Pages/Search';

const App = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => { 
    setTimeout(() => { 
      setLoading(false); 
    }, 3000);  
  }, []); 
  if (loading) { 
    return <Loading />; 
  }
  return (
    <>
      <ToastContainer className='max-sm:flex max-sm:w-[70%] max-sm:justify-center max-sm:text-sm' />
      <Routes>
        <Route path='/deep-z-auth' element={<ClientAuth/>}/>
        <Route path="/" element={<Homepage />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound/>}/>
        <Route element={<AdminPrivacy/>} >
          <Route path="/dashboard" element={<AdminDashboard />}>
            <Route path="admin-panel" element={<DashBoardPanel />} />
            <Route path="admin-profile" element={<AdminProfile />} />
            <Route path="all-users" element={<AllUsers />} />
            <Route path="all-blogs" element={<AllBlogz />} />
            <Route path="all-comments" element={<AllComments />} />
          </Route>
        </Route>
        <Route element={<AdminPrivacy/>} >
          <Route path='/create-blog' element={<NewBlog/>}/>
          <Route path='/ed-b/:id' element={<EditBlog />} />
        </Route>
        <Route element={<UserPrivacy/>} >
          <Route path='/user' element={<UserDashboard/>}/>
        </Route>
        <Route path='/vw-b/:id' element={<ViewBlog />} />
        <Route path='/search' element={<Search />} />
        <Route path='/unauthorized' element={<UnAuthorized />} />
      </Routes>
    </>
  )
}

export default App