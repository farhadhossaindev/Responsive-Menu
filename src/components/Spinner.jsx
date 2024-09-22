import React, { useEffect, useState } from 'react';
import { Watch } from 'react-loader-spinner';
import { useLocation, useNavigate } from 'react-router-dom';

function Spinner({ path = '2024' }) {

    const [count, setCount] = useState(3)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((preValue) => --preValue)
        }, 1000)
        count === 0 && navigate(`${path}`, {
            state: location.pathname,
        })
        return () => clearInterval(interval)
    }, [count, navigate, location, path])

    return (
        <div className='flex justify-center items-center h-[100vh]'>
            <Watch
                visible={true}
                height="80"
                width="80"
                radius="48"
                color="#000"
                ariaLabel="watch-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
}

export default Spinner;
