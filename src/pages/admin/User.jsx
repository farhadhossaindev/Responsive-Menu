import React from 'react';
import logo from '../../assets/Logo.png';
import { MdDashboard, MdCategory } from "react-icons/md";
import { GiBeachBag, GiTravelDress } from "react-icons/gi";
import { IoLogOut } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { RiMenuFoldFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import { GrEdit } from 'react-icons/gr';
import { MdDeleteForever } from 'react-icons/md';

// Logout function
function User() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    });
    localStorage.removeItem('auth');
    toast.success('LogOut Successfully', { position: 'top-right' });
    navigate('/sign-in2024');
  };

  return (
    <>
      <Helmet>
        <title>User</title>
      </Helmet>

      <div className='md:flex textFont'>
        {/* -----------Site menu for desktop ------------------------ */}
        <div className='w-[20%] border-r-3 border-[#9e9e9e] h-screen textFont md:flex hidden flex-col items-center bg-white fixed'>
          <div className='pt-5'>
            <img src={logo} alt="QC Artictry" className='w-[150px] mx-auto' />
          </div>
          <h2 className='text-xl pt-5 font-extrabold border-b-3 pb-2'>Admin panel</h2>

          <div className='flex flex-col space-y-4 items-center w-full mt-10 overflow-y-auto'>
            <Link to={'/aameraaadmin2024'} className='flex items-center gap-3 md:text-[16px] lg:text-[18px] md:pl-[8%] lg:pl-[16%] w-full hover:text-black hover:font-medium duration-300 py-1.5 lg:py-2.5 uppercase'>
              <div className='md:text-2xl lg:text-3xl'><MdDashboard /></div>Dashboard
            </Link>
            <Link to={'/aameraaadmin2024/order'} className='flex items-center gap-3 md:text-[16px] lg:text-[18px] md:pl-[8%] lg:pl-[16%] w-full hover:text-black hover:font-medium  py-1.5 lg:py-2.5 uppercase'>
              <div className='md:text-2xl lg:text-3xl'><GiBeachBag /></div>Orders
            </Link>
            <Link to={'/aameraaadmin2024/product'} className='flex items-center gap-3 md:text-[16px] lg:text-[18px] md:pl-[8%] lg:pl-[16%] w-full hover:text-black hover:font-medium  py-1.5 lg:py-2.5 uppercase'>
              <div className='md:text-2xl lg:text-3xl'><GiTravelDress /></div>Products
            </Link>
            <Link to={'/aameraaadmin2024/category'} className='flex items-center gap-3 md:text-[16px] lg:text-[18px] md:pl-[8%] lg:pl-[16%] w-full hover:text-black hover:font-medium  py-1.5 lg:py-2.5 uppercase'>
              <div className='md:text-2xl lg:text-3xl'><MdCategory /></div>Categories
            </Link>
            <Link to={'/aameraaadmin2024/users'} className='font-bold flex items-center gap-3 md:text-[16px] lg:text-[18px] md:pl-[8%] lg:pl-[16%] w-full hover:text-black  py-1.5 lg:py-2.5 uppercase'>
              <div className='md:text-2xl lg:text-3xl'><FaUsers /></div>Users
            </Link>
          </div>
          <div className='mt-auto mb-10 w-full flex justify-center'>
            <button onClick={handleLogout} className='flex items-center gap-3 md:text-[16px] lg:text-[18px] md:px-2 py-1.5 lg:px-3 lg:py-2 text-black duration-300 border-3 border-[#9e9e9e] rounded-full hover:border-black'>
              <div className='md:text-2xl lg:text-3xl'><IoLogOut /></div>LogOut
            </button>
          </div>
        </div>

        {/* ----------------Header for mobile version------------------------------- */}
        <div className='md:hidden'>
          <div className='bg-white h-[10vh] shadow-sm flex items-center justify-between px-5'>
            <div className='w-[70px]'>
              <Link to={'/aameraaadmin2024'}>
                <img src={logo} alt="" />
              </Link>
            </div>
            <div>
              <div className="drawer z-50">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                  {/* Page content here */}
                  <label htmlFor="my-drawer" className="text-3xl font-black"><RiMenuFoldFill /></label>
                </div>

                <div className="drawer-side">
                  <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

                  <ul className="menu bg-base-200 text-base-content min-h-full w-[250px] sm:w-80">
                    <div className='flex flex-col space-y-4 items-center w-full  overflow-y-auto ml-5 mt-5'>
                      <Link to={'/aameraaadmin2024'} className='flex items-center gap-3 text-[18px] w-full hover:text-black hover:font-medium duration-300 py-2.5 uppercase'>
                        <div className='text-2xl'><MdDashboard /></div>Dashboard
                      </Link>
                      <Link to={'/aameraaadmin2024/order'} className='flex items-center gap-3 text-[18px] w-full hover:text-black hover:font-medium  py-2.5 uppercase'>
                        <div className='text-2xl'><GiBeachBag /></div>Orders
                      </Link>
                      <Link to={'/aameraaadmin2024/product'} className='flex items-center gap-3 text-[18px] w-full hover:text-black hover:font-medium  py-2.5 uppercase'>
                        <div className='text-2xl '><GiTravelDress /></div>Products
                      </Link>
                      <Link to={'/aameraaadmin2024/category'} className='flex items-center gap-3 text-[18px] w-full hover:text-black hover:font-medium   py-2.5 uppercase'>
                        <div className='text-2xl'><MdCategory /></div>Categories
                      </Link>
                      <Link to={'/aameraaadmin2024/users'} className='font-bold flex items-center gap-3 text-[18px]  w-full  text-black  py-2.5 uppercase'>
                        <div className='text-2xl '><FaUsers /></div>Users
                      </Link>
                    </div>
                    <div className='mt-auto mb-10 w-full flex justify-center'>
                      <button onClick={handleLogout} className='flex items-center gap-3 text-[18px] px-3 py-2 text-black duration-300 border-3 border-[#9e9e9e] rounded-full hover:border-black'>
                        <div className='text-2xl'><IoLogOut /></div>LogOut
                      </button>
                    </div>
                  </ul>

                </div>

              </div>
            </div>
          </div>
        </div>

        <div className='w-full md:w-[80%] md:ml-[20%] h-screen bg-[#EEEEEE]'>
          <div className="overflow-x-auto mt-5 shadow-lg mx-5 bg-white rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center ">ID</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center ">Pic</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center ">Name</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center ">Email</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center ">Phone</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center ">Role</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center ">Total Spent</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center ">Reg Date</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center ">Last Purch</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center ">Total Orders</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center ">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-4 text-center">1</td>
                  <td className="text-center">
                    <img className="h-10 w-10 rounded-full mx-auto" src="https://via.placeholder.com/150" alt="User Profile" />
                  </td>
                  <td className="px-4 py-4 text-center">John Doe</td>
                  <td className="px-4 py-4 text-center">johndoe@example.com</td>
                  <td className="px-4 py-4 text-center">01810-116224</td>
                  <td className="px-4 py-4 text-center">Customer</td>
                  <td className="px-4 py-4 text-center">$540.75</td>
                  <td className="px-4 py-4 text-center">2023-05-01</td>
                  <td className="px-4 py-4 text-center">2024-07-15</td>
                  <td className="px-4 py-4 text-center">12</td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center gap-2">
                      <button className="text-green-500 hover:bg-green-100 p-2 rounded-full transition-colors duration-300">
                        <GrEdit className="text-lg" />
                      </button>
                      <button className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors duration-300">
                        <MdDeleteForever className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-center">1</td>
                  <td className="text-center">
                    <img className="h-10 w-10 rounded-full mx-auto" src="https://via.placeholder.com/150" alt="User Profile" />
                  </td>
                  <td className="px-4 py-4 text-center">John Doe</td>
                  <td className="px-4 py-4 text-center">johndoe@example.com</td>
                  <td className="px-4 py-4 text-center">01810-116224</td>
                  <td className="px-4 py-4 text-center">Customer</td>
                  <td className="px-4 py-4 text-center">$540.75</td>
                  <td className="px-4 py-4 text-center">2023-05-01</td>
                  <td className="px-4 py-4 text-center">2024-07-15</td>
                  <td className="px-4 py-4 text-center">12</td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center gap-2">
                      <button className="text-green-500 hover:bg-green-100 p-2 rounded-full transition-colors duration-300">
                        <GrEdit className="text-lg" />
                      </button>
                      <button className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors duration-300">
                        <MdDeleteForever className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-center">1</td>
                  <td className="text-center">
                    <img className="h-10 w-10 rounded-full mx-auto" src="https://via.placeholder.com/150" alt="User Profile" />
                  </td>
                  <td className="px-4 py-4 text-center">John Doe</td>
                  <td className="px-4 py-4 text-center">johndoe@example.com</td>
                  <td className="px-4 py-4 text-center">01810-116224</td>
                  <td className="px-4 py-4 text-center">Customer</td>
                  <td className="px-4 py-4 text-center">$540.75</td>
                  <td className="px-4 py-4 text-center">2023-05-01</td>
                  <td className="px-4 py-4 text-center">2024-07-15</td>
                  <td className="px-4 py-4 text-center">12</td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center gap-2">
                      <button className="text-green-500 hover:bg-green-100 p-2 rounded-full transition-colors duration-300">
                        <GrEdit className="text-lg" />
                      </button>
                      <button className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors duration-300">
                        <MdDeleteForever className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-center">1</td>
                  <td className="text-center">
                    <img className="h-10 w-10 rounded-full mx-auto" src="https://via.placeholder.com/150" alt="User Profile" />
                  </td>
                  <td className="px-4 py-4 text-center">John Doe</td>
                  <td className="px-4 py-4 text-center">johndoe@example.com</td>
                  <td className="px-4 py-4 text-center">01810-116224</td>
                  <td className="px-4 py-4 text-center">Customer</td>
                  <td className="px-4 py-4 text-center">$540.75</td>
                  <td className="px-4 py-4 text-center">2023-05-01</td>
                  <td className="px-4 py-4 text-center">2024-07-15</td>
                  <td className="px-4 py-4 text-center">12</td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center gap-2">
                      <button className="text-green-500 hover:bg-green-100 p-2 rounded-full transition-colors duration-300">
                        <GrEdit className="text-lg" />
                      </button>
                      <button className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors duration-300">
                        <MdDeleteForever className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-center">1</td>
                  <td className="text-center">
                    <img className="h-10 w-10 rounded-full mx-auto" src="https://via.placeholder.com/150" alt="User Profile" />
                  </td>
                  <td className="px-4 py-4 text-center">John Doe</td>
                  <td className="px-4 py-4 text-center">johndoe@example.com</td>
                  <td className="px-4 py-4 text-center">01810-116224</td>
                  <td className="px-4 py-4 text-center">Customer</td>
                  <td className="px-4 py-4 text-center">$540.75</td>
                  <td className="px-4 py-4 text-center">2023-05-01</td>
                  <td className="px-4 py-4 text-center">2024-07-15</td>
                  <td className="px-4 py-4 text-center">12</td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center gap-2">
                      <button className="text-green-500 hover:bg-green-100 p-2 rounded-full transition-colors duration-300">
                        <GrEdit className="text-lg" />
                      </button>
                      <button className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors duration-300">
                        <MdDeleteForever className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-center">1</td>
                  <td className="text-center">
                    <img className="h-10 w-10 rounded-full mx-auto" src="https://via.placeholder.com/150" alt="User Profile" />
                  </td>
                  <td className="px-4 py-4 text-center">John Doe</td>
                  <td className="px-4 py-4 text-center">johndoe@example.com</td>
                  <td className="px-4 py-4 text-center">01810-116224</td>
                  <td className="px-4 py-4 text-center">Customer</td>
                  <td className="px-4 py-4 text-center">$540.75</td>
                  <td className="px-4 py-4 text-center">2023-05-01</td>
                  <td className="px-4 py-4 text-center">2024-07-15</td>
                  <td className="px-4 py-4 text-center">12</td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center gap-2">
                      <button className="text-green-500 hover:bg-green-100 p-2 rounded-full transition-colors duration-300">
                        <GrEdit className="text-lg" />
                      </button>
                      <button className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors duration-300">
                        <MdDeleteForever className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-center">1</td>
                  <td className="text-center">
                    <img className="h-10 w-10 rounded-full mx-auto" src="https://via.placeholder.com/150" alt="User Profile" />
                  </td>
                  <td className="px-4 py-4 text-center">John Doe</td>
                  <td className="px-4 py-4 text-center">johndoe@example.com</td>
                  <td className="px-4 py-4 text-center">01810-116224</td>
                  <td className="px-4 py-4 text-center">Customer</td>
                  <td className="px-4 py-4 text-center">$540.75</td>
                  <td className="px-4 py-4 text-center">2023-05-01</td>
                  <td className="px-4 py-4 text-center">2024-07-15</td>
                  <td className="px-4 py-4 text-center">12</td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center gap-2">
                      <button className="text-green-500 hover:bg-green-100 p-2 rounded-full transition-colors duration-300">
                        <GrEdit className="text-lg" />
                      </button>
                      <button className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors duration-300">
                        <MdDeleteForever className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-center">1</td>
                  <td className=" text-center">
                    <img className="h-10 w-10 rounded-full mx-auto" src="https://via.placeholder.com/150" alt="User Profile" />
                  </td>
                  <td className="px-4 py-4 text-center">John Doeeeeeeeee</td>
                  <td className="px-4 py-4 text-center">johnerrftrfdoe@example.com</td>
                  <td className="px-4 py-4 text-center">01810-116224</td>
                  <td className="px-4 py-4 text-center">Customer</td>
                  <td className="px-4 py-4 text-center">$540.75</td>
                  <td className="px-4 py-4 text-center">2023-05-01</td>
                  <td className="px-4 py-4 text-center">2024-07-15</td>
                  <td className="px-4 py-4 text-center">12</td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center gap-2">
                      <button className="text-green-500 hover:bg-green-100 p-2 rounded-full transition-colors duration-300">
                        <GrEdit className="text-lg" />
                      </button>
                      <button className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors duration-300">
                        <MdDeleteForever className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>

          </div>
        </div>
      </div>
    </>
  );
}











export default User;
