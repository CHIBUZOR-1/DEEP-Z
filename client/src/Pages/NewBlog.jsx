import React, { useRef, useState } from 'react'
import Layout from '../Components/Layout'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const NewBlog = () => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    category: '',
    media: null,
    info: ''
  });
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const handleChange = (e)=> {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  }
  const handleQuillChange = (value) => {
    setNewBlog({ ...newBlog, info: value });
  };
  const uploadFile = (e) => {
    const file = e.target.files[0];
    setNewBlog(prev => ({ ...prev, media: file}));
  }
  const handleFileUpload = async (file) => { 
    const formData = new FormData(); 
    formData.append('file', file); 
    try { 
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/blogs/upload-post-file`, formData); 
        return response.data; 
    } catch (error) { 
        console.error('Error uploading file:', error); 
        return null; 
    } 
  };
  const handlePublish = async(e)=> {
    e.preventDefault();
    let imageUrl = null;
    let mediaId = null;
    if (newBlog?.media) { 
      const result = await handleFileUpload(newBlog.media);
      imageUrl = result.filePath;
      mediaId = result.publicId
    }
    const blog = { title: newBlog?.title, category: newBlog?.category, media: imageUrl, info: newBlog?.info, mediaId };
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/blogs/create-blog`, blog);
    if(data?.success) {
      toast.success(data?.message);
      setNewBlog({
        title: '',
        category: '',
        media: null,
        info: ''
      });
      navigate(`/vw-b/${data?.blog?._id}`)
    }
  }
  return (
    <Layout>
      <div className='min-h-screen dark:bg-facebookDark-300'>
        <div className='w-full flex items-center p-2 justify-center'>
          <h1 className='font-bold dark:text-slate-50 text-2xl'>Create a blog</h1>
        </div>
        <div className=' w-full flex items-center justify-center p-2'>
          <input name='title' required onChange={handleChange} value={newBlog?.title} placeholder='Title' className='dark:bg-slate-600 sm:w-[70%] max-sm:w-full font-semibold dark:text-slate-100 outline-none p-2 rounded-md' type="text" />
        </div>
        <div className='w-full flex items-center justify-center p-2'>
          <select onChange={handleChange} required  className='p-2 sm:w-[70%] border max-sm:w-full dark:bg-slate-600 dark:text-slate-100 rounded-md font-semibold dark:border-purple-600' name="category" id="">
            <option className='dark:bg-slate-600' value="">Select a category</option>
            <option className='dark:bg-slate-600' value="Sports">Sports</option>
            <option className='dark:bg-slate-600' value="Entertainment">Entertainment</option>
            <option className='dark:bg-slate-600' value="Lifestyle">Lifestyle</option>
            <option className='dark:bg-slate-600' value="Technology">Technology</option>
            <option className='dark:bg-slate-600' value="Food">Food</option>
            <option className='dark:bg-slate-600' value="Finance">Finance</option>
          </select>
        </div>
        <div className='w-full p-2 flex justify-center items-center'>
          <div className='flex w-[70%] max-sm:w-full rounded-md  border-purple-600 border-dotted border-[2px] items-center p-1 justify-between'>
            <input required  onChange={uploadFile} name='media' className='bg-purple-900 cursor-pointer text-white font-semibold rounded-md' type="file" accept='image/*' />
          </div>
        </div>
        {
          newBlog?.media && (
            <div className='w-full p-2 flex items-center justify-center'>
              <img className='sm:w-[70%] rounded-md shadow-lg max-sm:w-full h-80 inset-0 object-cover max-sm:object-fill' src={URL.createObjectURL(newBlog.media)} alt={newBlog?.media} />
            </div>
          )
        }
        <div  className='w-full flex h-52 max-sm:h-60  justify-center p-2'>
          <ReactQuill ref={quillRef} theme="snow" className='w-[70%] max-sm:w-full h-36 dark:text-slate-100' value={newBlog?.info} onChange={handleQuillChange} />
        </div>
        <div className='w-full flex items-center justify-center p-2'>
          <button onClick={handlePublish} className='w-[70%] max-sm:text-sm max-sm: p-2 bg-facebookDark-300 border - border-purple-600 active:bg-purple-700 text-white font-semibold rounded-md'>Publish</button>
        </div>
      </div>
    </Layout>
  )
}

export default NewBlog