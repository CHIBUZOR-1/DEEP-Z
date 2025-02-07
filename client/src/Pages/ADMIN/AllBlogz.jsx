import { Button, Modal } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { MdDelete, MdEdit } from 'react-icons/md';
import moment from 'moment'
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllBlogz = ({toggleView}) => {
  const [allBlogz, setAllBlogz] = useState([]);
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [b, setB] = useState(null)
  const navigate = useNavigate()

  useEffect(()=> {
    getAllBlogs();
  }, []);

  const getAllBlogs = async()=> {
    setLoad(true)
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/blogs/all-blogs`);
    if(data.success) {
      setAllBlogz(data?.blogs);
      setLoad(false)
    }
  }
  
  const cancel = ()=> {
    setShow(false)
    setB(null)
  }
  const deleteBlog = async () => {
    const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/api/blogs/delete-blog/${b?._id}`)
    if(data.ok) {
      setShow(false);
      toast.success(data?.msg)
      setAllBlogz(allBlogz.filter(blog => blog?._id !== b?._id));
      setB(null)
    }
    
  }
  
  return (
    <div className='p-1 w-full overflow-x-auto scrollbar dark:bg-facebookDark-300 h-screen'>
      <div className='w-full flex sm:hidden'>
        <FaArrowLeft onClick={toggleView} className='dark:text-slate-100'/>
      </div>
      <div className='w-full p-1'>
        <p className={`text-2xl ${!allBlogz.length && 'hidden'} dark:text-slate-100 font-bold`}>AllBlogz <span className='font-normal border px-2'>{allBlogz.length}</span></p>
      </div>
      {
        load && (
          <div className=' w-full h-screen flex justify-center pt-11'>
            <ReactLoading type='bars' color='purple'/>
          </div>
        )
      }
      {
        allBlogz.length === 0 && !load && (
          <div className='h-screen flex pt-10 justify-center dark: text-slate-400 w-full'>
            <h2 className='font-semibold text-2xl'>No Blogs Found</h2>
          </div>
        )
      }
      {
        allBlogz.length > 0 && !load && (
          <div className=' flex items-center justify-center max-md:w-screen p-1'>
            <table className='w-full tb shadow-md rounded'>
              <thead className='text-slate-600 dark:bg-slate-500 max-sm:text-sm shadow-sm dark:text-slate-100'>
                <tr className=''>
                  <th className='p-1 max-sm:text-sm'>Created</th>
                  <th className='p-1 max-sm:text-sm'>Image</th>
                  <th className='p-1 max-sm:text-sm'>Title</th>
                  <th className='p-1 max-sm:text-sm'>Category</th>
                  <th className='p-1 max-sm:text-sm'>Edit</th>
                  <th className='p-1 max-sm:text-sm'>Delete</th>
                </tr>
              </thead>
              <tbody className='w-full'>
                {
                  allBlogz.map((us, i)=> {
                    return(
                      <tr key={i} onClick={()=> {navigate(`/vw-b/${us?._id}`), window.scrollTo(0,0)}} className='w-full cursor-pointer'>
                        <td className='text-center max-md:text-sm  dark:text-slate-100 p-1'>{moment(us?.createdAt).format('ll')}</td>
                        <td className='flex w-full justify-center items-center dark:text-slate-100 p-1'><img className='h-12 w-full object-cover' src={us?.media} alt={us?.media} /></td>
                        <td className='text-center max-md:text-sm  dark:text-slate-100 p-1'>{us?.title}</td>
                        <td className=' text-center max-md:text-sm  dark:text-slate-100 p-1'>{us?.category}</td>
                        <td className=' text-center max-md:text-sm  p-1'><Button onClick={(e)=> { e.stopPropagation(); navigate(`/ed-b/${us?._id}`)}}><MdEdit /></Button></td>
                        <td className=' text-center max-md:text-sm  p-1'><Button onClick={(e)=> { e.stopPropagation(); setShow(true); setB(us)}}><MdDelete /></Button></td>
                      </tr>
                    )
                    
                  })
                }
              </tbody>
            </table>
            <Modal open={show} className='custom-modal' footer={null} onCancel={cancel} >
              <div className='w-full flex items-center justify-center p-3'>
                <h2 className='font-semibold dark:text-slate-100 text-2xl'>Are you sure ?</h2>
              </div>
              <div className='w-full flex items-center justify-center gap-3 p-2'>
                <Button onClick={deleteBlog} className='font-semibold bg-red-500 text-slate-100'>Yes</Button>
                <Button onClick={()=> setShow(false)} className='font-semibold  bg-green-500 text-slate-100'>No</Button>
              </div>
            </Modal>
          </div>
        )
      }
      
    </div>
  )
}

export default AllBlogz