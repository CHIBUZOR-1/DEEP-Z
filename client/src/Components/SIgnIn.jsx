import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {setUser} from '../Redux/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../ClientUtils/Firebase';

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
      const handleGoogleLogin = async() => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account'})
        try {
          const oauthResults = await signInWithPopup(auth, provider)
          console.log(oauthResults)
          const userData = { 
            email: oauthResults.user.email,
            googleId: oauthResults.user.uid
          };
          const{ data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/googleAuthLogin`, userData);
          if(data.success) {
            toast.success(data.message);
            dispatch(setUser(data.details));
            navigate('/');
          }
        } catch (error) {
          console.log(error)
        }
      }
      console.log(info)
  return (
    <div className='flex flex-col dark:bg-facebookDark-400 items-center gap-2'>
        <input type="text" value={info.firstInput} name='firstInput' onChange={handleChange} className='w-full max-sm:text-sm outline-purple-500 p-2 border border-gray-400 rounded-md'  placeholder='Username/email' />
        <input type="password" value={info.password} name='password' onChange={handleChange} className='w-full max-sm:text-sm outline-purple-500 p-2 border border-gray-400 rounded-md'   placeholder='password'/>
        <button onClick={handleSubmit} className='w-[80%] dark:border-purple-600 dark:border  flex max-sm:text-sm items-center justify-center gap-2 bg-facebookDark-400 active:bg-orange-800 p-2 outline-purple-500 text-white font-semibold rounded-md'>
            sign in
        </button>
            <div className="flex w-full gap-1 items-center">
              <hr  className='border-slate-300 w-full'/>
              <p className='text-slate-600'>or</p>
              <hr  className='border-slate-300  w-full'/>
            </div>
        <button onClick={handleGoogleLogin} className='w-[80%] dark:border-purple-600 dark:border flex max-sm:text-sm items-center justify-center gap-2 bg-white active:bg-orange-300 p-2 outline-purple-500 text-slate-700 font-semibold rounded-md'>
           <FcGoogle className='text-xl' /> Google
        </button>
    </div>
  )
}

export default SIgnIn