import { Link } from 'react-router-dom';
import logo from '../assets/Logo.png';
import { RiMenuFoldFill } from "react-icons/ri";

function Navbar() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="navbar bg-white z-50 px-[5%] h-[10vh]">
        <div className="flex-1">
          <Link to={'/'}> <img className='cursor-pointer w-[100px]' src={logo} alt="" /></Link>
        </div>
        {/* Wrapped ul and dropdown in a single flex container */}
        <div className="hidden md:flex flex-none items-center justify-between uppercase">
          <ul className=" flex justify-center gap-10 pr-5 ">
            <li className='relative cursor-pointer group'>
              <Link to={'/'} className='block py-0 px-0'>Home</Link>
              <div className=' border-b-2 border-black opacity-0 group-hover:opacity-100 duration-300 '></div>
            </li>
            <li className='relative cursor-pointer group'>
              <Link to={'/'} className='block py-0 px-0'>Man</Link>
              <div className=' border-b-2 border-black opacity-0 group-hover:opacity-100 duration-300 '></div>
            </li>
            <li className='relative cursor-pointer group'>
              <Link to={'/'} className='block py-0 px-0'>Woman</Link>
              <div className=' border-b-2 border-black opacity-0 group-hover:opacity-100 duration-300 '></div>
            </li>
            <li className='relative cursor-pointer group'>
              <Link to={'/'} className='block py-0 px-0'>Kid's</Link>
              <div className=' border-b-2 border-black opacity-0 group-hover:opacity-100 duration-300 '></div>
            </li>
          </ul>





          <div className="drawer drawer-end z-50">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer hover:bg-[#ccc] lg:px-3 lg:py-3 md:px-3 md:py-3 rounded-full justify-center items-center flex ">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className=" badge badge-sm indicator-item bg-black text-white z-10 ">2</span>
                </div>
              </label>
            </div>
            <div className="drawer-side z-50 no-scrollbar">
              <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 ">
                {/* Sidebar content here */}
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
              </ul>
            </div>
          </div>
        </div>


        {/* ------------ Mobail menu -----------------*/}


        <div className='flex gap-5 md:hidden'>
          <div className="indicator">
            <Link to={'/card'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
            <span className=" badge badge-sm indicator-item bg-black text-white z-10 ">5</span>
          </div>


          <div className="drawer z-50">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer" className="text-3xl font-black"><RiMenuFoldFill /></label>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-[250px] sm:w-80">
                <h2>Category here</h2>
              </ul>
            </div>
          </div>
        </div>






      </div>
    </div>
  )
}

export default Navbar;
