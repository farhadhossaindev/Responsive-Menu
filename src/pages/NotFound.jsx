import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
        <meta name="description" content="Qc Artistry Not Found page" />
        <meta name="keywords" content="OnlineShop, clothingShop" />
        <meta name="author" content='QC Artistry' />
      </Helmet>

      <div className='bg-[#EEEEEE]'>
        <div className='flex flex-col justify-center items-center h-[85vh]'>
          <h2 className='text-9xl'>404</h2>
          <h4 className='text-5xl'>OH SORRY!</h4>
          <p className='text-center pt-3'>Page not found. The link might be broken. Please check the URL or return to the home page.</p>
          <Link to={'/'} className=' mt-5 border-3 border-[#9e9e9e] px-8 py-2 hover:border-black duration-300'>Home</Link>
        </div>
      </div>
    </>

  );
}

export default NotFound;
