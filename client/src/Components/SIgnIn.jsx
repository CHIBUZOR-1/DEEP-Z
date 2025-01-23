import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {setUser} from '../Redux/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SIgnIn = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        firstInput: '',
        password: ''
    });
    const dispatch = useDispatch();

    const handleChange = (e)=> {
        setInfo({ ...info, [e.target.name]: e.target.value });
    
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/signIn`, info);
        if(response.data.success) {
            toast.success(response.data.message);
            dispatch(setUser(response.data.details));
            setLoading(false)
            navigate('/');
        } 
            
        if(!response.data.success) {
          setLoading(false)
          toast.error(response.data.message);
            
        }
      }
  return (
    <div className='flex flex-col items-center gap-2'>
        <input type="text" value={info.firstInput} name='firstInput' onChange={handleChange} className='w-full max-sm:text-sm outline-purple-500 p-2 border border-gray-400 rounded-md'  placeholder='Username/email' />
        <input type="password" value={info.password} name='password' onChange={handleChange} className='w-full max-sm:text-sm outline-purple-500 p-2 border border-gray-400 rounded-md'   placeholder='password'/>
        <button onClick={handleSubmit} className='w-[80%] flex max-sm:text-sm items-center justify-center gap-2 bg-facebookDark-400 active:bg-orange-800 p-2 outline-purple-500 text-white font-semibold rounded-md'>
            sign in
        </button>
            <div className="flex w-full gap-1 items-center">
              <hr  className='border-slate-300 w-full'/>
              <p className='text-slate-600'>or</p>
              <hr  className='border-slate-300  w-full'/>
            </div>
        <button className='w-[80%] flex max-sm:text-sm items-center justify-center gap-2 bg-facebookDark-400 active:bg-orange-800 p-2 outline-purple-500 text-white font-semibold rounded-md'>
            continue with <FcGoogle className='text-xl'/>
        </button>
    </div>
  )
}

export default SIgnIn