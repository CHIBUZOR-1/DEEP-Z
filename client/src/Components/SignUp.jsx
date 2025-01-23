import axios from 'axios';
import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';

const SignUp = ({change}) => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  });
  const handleChange = (e)=> {
    setInfo({ ...info, [e.target.name]: e.target.value });

  }
  const handleSubmit = async(e)=> {
    e.preventDefault();
    setLoading(true)
      if(info.confirmPassword === info.password) {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/signUp`, info);
        if(data.success) {
          toast.success(data.message);
          setInfo({
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: ""
          })
          setLoading(false)
          change('Sign-In')
        }
        if(!data.success) {
          toast.warn(data.message)
          setLoading(false)
        }
      
      } 
  }
  
  return (
    <div className='w-full'>
        <div className='flex flex-col items-center gap-2 w-full'>
            <input type="text" value={info.firstname} onChange={handleChange} name='firstname' className='w-full text-slate-800 max-sm:text-sm p-2 border outline-purple-500 border-gray-400 rounded-md'  placeholder='firstname'/>
            <input type="text" value={info.lastname} onChange={handleChange} name='lastname' className='w-full text-slate-800 max-sm:text-sm p-2 border outline-purple-500 border-gray-400 rounded-md'  placeholder='lastname'/>
            <input type="text" value={info.username} onChange={handleChange} className='w-full max-sm:text-sm text-slate-800 p-2 border outline-purple-500 border-gray-400 rounded-md'  name="username"  placeholder='Username'/>
            <input type="email" value={info.email} onChange={handleChange} className='w-full max-sm:text-sm text-slate-800 p-2 border outline-purple-500 border-gray-400 rounded-md' name='email'  placeholder='email'/>
            <input type="text" value={info.phoneNumber} onChange={handleChange} name='phoneNumber' className='w-full text-slate-800 max-sm:text-sm p-2 border outline-purple-500 border-gray-400 rounded-md'  placeholder='phone'/>
            <div className='flex items-center max-[400px]:flex-col gap-1 justify-between w-full'>
                <input type="password" name='password' value={info.password} onChange={handleChange} className='w-full text-slate-800 max-sm:text-sm outline-purple-500 p-2 border border-gray-400 rounded-md'  placeholder='password'/>
                <input type="password" name='confirmPassword' value={info.confirmPassword} onChange={handleChange} className='w-full text-slate-800 max-sm:text-sm outline-purple-500 p-2 border border-gray-400 rounded-md' placeholder='confirm password'/>
            </div>
            <button onClick={handleSubmit} className='w-[80%] bg-facebookDark-400 active:bg-orange-800 text-white font-semibold rounded-md p-2'>Sign Up</button>
            <div className="flex w-full gap-1 items-center">
              <hr  className='border-slate-300 w-full'/>
              <p className='text-slate-600'>or</p>
              <hr  className='border-slate-300  w-full'/>
            </div>
            <button className='w-[80%] bg-white border-orange-300 border active:bg-orange-200 flex items-center justify-center gap-2 max-sm:text-sm text-slate-700 font-semibold rounded-md p-2'><FcGoogle className='text-xl' /> Google</button>
        </div>
    </div>
  )
}

export default SignUp