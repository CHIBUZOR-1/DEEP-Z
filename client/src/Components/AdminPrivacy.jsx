import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";
import axios from "axios";
import UnAuthorized from '../Pages/UnAuthorized';
import Loading from './Loading';

const AdminPrivacy = () => {
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(true);
    const user = useSelector(state=> state?.user?.user)

    useEffect(() => {
        const passCheck = async () => {
            try {
              const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/admin-pass`);
              setOk(data.ok);
            } catch (error) {
              setOk(false);
            } finally {
              setLoading(false); // Set loading to false after check
            }
        };
        if(user?.id) passCheck();
    }, [user?.id])
    if (!user) {
        return <UnAuthorized />;
    }
    if (loading) return <Loading />;
    return ok ? <Outlet/> : <UnAuthorized />
}

export default AdminPrivacy