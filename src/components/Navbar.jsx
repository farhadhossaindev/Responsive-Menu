import React, { useState } from 'react'
import logo from "../assets/Logo.png"
import { Link, } from 'react-router-dom'
import NavLinks from './NavLinks'
import Button from './button'
import { RiMenuFoldLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <nav className='bg-black text-white'>
        <div className='flex items-center font-medium justify-around'>
          <div className='z-50 p-5 md:w-auto w-full flex justify-between'>
            <img src={logo} alt="logo" className='md:cursor-pointer h-9' />

            <div className='text-3xl md:hidden' onClick={() => setOpen(!open)} >
              {open ? <IoClose /> : <RiMenuFoldLine />}
            </div>

          </div>
          <ul className='md:flex hidden uppercase items-center gap-8 font-[poppines]'>
            <li>
              <Link to={"/"} className='py-7 px-3 inline-block'>
                Home
              </Link>
            </li>
            <NavLinks />
          </ul>
          <div className='md:block hidden'>
            <Button />
          </div>

          {/* Mobail navbar */}
          <ul className={`md:hidden bg-black absolute w-full h-full bottom-0 py-24 pl-4 duration-500 ${open ? 'left-0' : 'left-[-100%]'}`}>
            <li>
              <Link to={"/"} className='py-7 px-3 inline-block'>
                Home
              </Link>
            </li>
            <NavLinks />
            <div className='py-5'>
              <Button />
            </div>
          </ul>



        </div>
      </nav>
    </div>
  )
}

export default Navbar