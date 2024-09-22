import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";


function UserLayout() {

    const [ok, setOK] = useState(false)
    const [auth, setAuth] = useAuth()

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get(`${import.meta.env.VITE_REACT_QC_APP_API}/api/v1/auth/user-auth`)
            if (res.data.ok) {
                setOK(true)
            } else {
                setOK(false)
            }
        }
        if (auth?.token) authCheck()
    }, [auth?.token])


    return ok ? <Outlet /> : <Spinner path="/2024" />
}

export default UserLayout