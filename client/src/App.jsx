import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ClientAuth from './Pages/ClientAuth';
import { ToastContainer } from 'react-toastify';
import Loading from './Components/Loading';
import Homepage from './Pages/Homepage';
import PrivateRoute from './ClientUtils/PrivateRoute';

const App = () => {
  const [loading, setLoading] = useState(true)
  const isAuthenticated = useSelector(state => state?.user?.user?.id);
  useEffect(() => { 
    // Simulate a loading process (e.g., fetching data) 
    setTimeout(() => { 
      setLoading(false); 
    }, 3000); // Adjust the loading time as needed 
  }, []); 
  if (loading) { 
    return <Loading />; 
  }
  return (
    <>
      <ToastContainer className={`max-sm:flex max-sm:justify-center max-sm:text-sm`} />
      <Routes>
        <Route path='/deep-z-auth' element={<ClientAuth/>}/>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </>
  )
}

export default App