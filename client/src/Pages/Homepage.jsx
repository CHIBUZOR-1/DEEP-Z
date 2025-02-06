import React from 'react'
import Layout from '../Components/Layout'
import { useSelector } from 'react-redux';

const Homepage = () => {
  const user = useSelector(state=> state?.user?.user);
  console.log(user)
  return (
    <Layout>
      <div className=' dark:bg-facebookDark-200 h-screen dark:text-slate-100'>Pagey</div>
    </Layout>
  )
}

export default Homepage