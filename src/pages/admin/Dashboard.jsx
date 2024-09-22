// src/components/Dashboard.js
import React from 'react';
import logo from '../../assets/Logo.png';
import deliveryIcon from '../../assets/delivery.png';
import PendingIcon from '../../assets/pending.png';
import cancelIcon from '../../assets/Cancel.png';
import { MdDashboard, MdCategory } from 'react-icons/md';
import { GiBeachBag, GiTravelDress } from 'react-icons/gi';
import { FaDollarSign, FaChartLine, FaTachometerAlt, } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import { FaUsers } from 'react-icons/fa';
import { RiMenuFoldFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';

// Registering all necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);




// Data for Sales Trend (Bar Chart)
const salesTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        {
            label: 'Monthly Sales',
            data: [5000, 6000, 5500, 7000, 8000, 7500],
            backgroundColor: 'rgba(75, 192, 192, 0.3)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }
    ]
};

// Data for Sales Target (Line Chart)
const salesTargetData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug'],
    datasets: [
        {
            label: 'Target vs Actual',
            data: [4500, 5800, 5300, 6900, 7800, 7300, 8500],
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
            tension: 0.3
        }
    ]
};


function Dashboard() {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();

    // Logout function
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        });
        localStorage.removeItem('auth');
        toast.success('Logged Out Successfully', { position: 'top-right' });
        navigate('/sign-in2024');
    };



    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>

            <div className="md:flex textFont">
                {/* -----------Site menu for desktop ------------------------ */}
                <div className='w-[20%] border-r-3 border-[#9e9e9e] h-screen textFont md:flex hidden flex-col items-center bg-white fixed'>
                    <div className="pt-5">
                        <img src={logo} alt="QC Artictry" className="w-[150px] mx-auto" />
                    </div>
                    <h2 className="text-xl pt-5 font-extrabold border-b-3 pb-2">Admin Panel</h2>

                    <div className="flex flex-col space-y-4 items-center w-full mt-10 overflow-y-auto">
                        <Link to={'/aameraaadmin2024'} className="font-bold flex items-center gap-3 md:text-[16px] lg:text-[18px] md:pl-[8%] lg:pl-[16%] w-full hover:text-black duration-300 py-1.5 lg:py-2.5 uppercase">
                            <div className="md:text-2xl lg:text-3xl"><MdDashboard /></div>Dashboard
                        </Link>
                        <Link to={'/aameraaadmin2024/order'} className="flex items-center gap-3 md:text-[16px] lg:text-[18px] md:pl-[8%] lg:pl-[16%] w-full hover:text-black hover:font-medium py-1.5 lg:py-2.5 uppercase">
                            <div className="md:text-2xl lg:text-3xl"><GiBeachBag /></div>Orders
                        </Link>
                        <Link to={'/aameraaadmin2024/product'} className="flex items-center gap-3 md:text-[16px] lg:text-[18px] md:pl-[8%] lg:pl-[16%] w-full hover:text-black hover:font-medium py-1.5 lg:py-2.5 uppercase">
                            <div className="md:text-2xl lg:text-3xl"><GiTravelDress /></div>Products
                        </Link>
                        <Link to={'/aameraaadmin2024/category'} className="flex items-center gap-3 md:text-[16px] lg:text-[18px] md:pl-[8%] lg:pl-[16%] w-full hover:text-black hover:font-medium py-1.5 lg:py-2.5 uppercase">
                            <div className="md:text-2xl lg:text-3xl"><MdCategory /></div>Categories
                        </Link>
                        <Link to={'/aameraaadmin2024/users'} className="flex items-center gap-3 md:text-[16px] lg:text-[18px] md:pl-[8%] lg:pl-[16%] w-full hover:text-black hover:font-medium py-1.5 lg:py-2.5 uppercase">
                            <div className="md:text-2xl lg:text-3xl"><FaUsers /></div>Users
                        </Link>
                    </div>

                    <div className="mt-auto mb-10 w-full flex justify-center">
                        <button onClick={handleLogout} className="flex items-center gap-3 md:text-[16px] lg:text-[18px] md:px-2 py-1.5 lg:px-3 lg:py-2 text-black duration-300 border-3 border-[#9e9e9e] rounded-full hover:border-black">
                            <div className="md:text-2xl lg:text-3xl"><IoLogOut /></div>LogOut
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
                                            <Link to={'/aameraaadmin2024'} className=' font-bold  flex items-center gap-3 text-[18px] w-full text-black  py-2.5 uppercase'>
                                                <div className='text-2xl'><MdDashboard /></div>Dashboard
                                            </Link>
                                            <Link to={'/aameraaadmin2024/order'} className='flex items-center gap-3 text-[18px] w-full hover:text-black hover:font-medium  py-2.5 uppercase'>
                                                <div className='text-2xl'><GiBeachBag /></div>Orders
                                            </Link>
                                            <Link to={'/aameraaadmin2024/product'} className=' flex items-center gap-3 text-[18px] w-full text-black py-2.5 hover:font-medium  uppercase'>
                                                <div className='text-2xl '><GiTravelDress /></div>Products
                                            </Link>
                                            <Link to={'/aameraaadmin2024/category'} className='flex items-center gap-3 text-[18px] w-full hover:text-black hover:font-medium   py-2.5 uppercase'>
                                                <div className='text-2xl'><MdCategory /></div>Categories
                                            </Link>
                                            <Link to={'/aameraaadmin2024/users'} className=' flex items-center gap-3 text-[18px]  w-full hover:text-black  py-2.5 uppercase'>
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





                {/* -----------Main Dashboard Content ------------------------ */}
                <div className="w-full md:w-[80%] md:ml-[20%] h-full bg-[#F9FAFB] p-6">

                    {/* -----------Sales Overview and Top Selling Products ------------------------ */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sales Overview</h2>
                            <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="text-4xl font-bold text-green-600">৳45,000</p>
                                    <p className="text-sm text-gray-600">Total Sales</p>
                                </div>
                                <div className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-semibold">
                                    +12% This Month
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Monthly Sales Trend</h3>
                                <Bar data={salesTrendData} options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { display: false },
                                        tooltip: { callbacks: { label: (tooltipItem) => `৳${tooltipItem.raw}` } },
                                    },
                                    scales: {
                                        x: { grid: { display: false } },
                                        y: { grid: { display: true, color: 'rgba(219, 219, 219, 1)' }, ticks: { callback: (value) => `৳${value}` } }
                                    }
                                }} />
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Selling Products</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-left">Image</th>
                                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-left">Product Name</th>
                                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-right">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <img src="https://via.placeholder.com/50" alt="Product A" className="w-12 h-12 object-cover rounded-md" />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">Product A</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-gray-900 font-bold">৳15,000</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* -----------Delivered, Pending, and Cancelled Orders ------------------------ */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-lg shadow-lg border border-green-300">
                            <div className="flex items-center gap-2">
                                <img src={deliveryIcon} alt="Delivery" className="w-10 h-10" />
                                <h2 className="text-lg text-gray-700 font-semibold">Delivered</h2>
                            </div>
                            <div className="flex justify-between text-2xl font-semibold px-2 mt-5 text-green-600">
                                <span>100</span>
                                <span>৳12,000</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg border border-yellow-300">
                            <div className="flex items-center gap-2">
                                <img src={PendingIcon} alt="Pending" className="w-10 h-10" />
                                <h2 className="text-lg text-gray-700 font-semibold">Pending</h2>
                            </div>
                            <div className="flex justify-between text-2xl font-semibold px-2 mt-5 text-yellow-600">
                                <span>1</span>
                                <span>৳1,850</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg border border-red-300">
                            <div className="flex items-center gap-2">
                                <img src={cancelIcon} alt="Cancel" className="w-10 h-10" />
                                <h2 className="text-lg text-gray-700 font-semibold">Cancelled</h2>
                            </div>
                            <div className="flex justify-between text-2xl font-semibold px-2 mt-5 text-red-600">
                                <span>1 (2%)</span>
                                <span>৳1,850</span>
                            </div>
                        </div>
                    </div>

                    {/* -----------Customer Insights, Recent Orders, and Exclusive Discount ------------------------ */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Customer Insights</h2>
                            <ul className="space-y-4">
                                <li className="flex justify-between items-center">
                                    <span className="text-gray-600">Customer Satisfaction</span>
                                    <span className="font-bold text-green-600">85%</                                span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="text-gray-600">New Customers (Last Week)</span>
                                    <span className="font-bold text-blue-600">150</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="text-gray-600">Returning Customers</span>
                                    <span className="font-bold text-yellow-600">75</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="text-gray-600">Total Customers</span>
                                    <span className="font-bold text-purple-600">225</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="text-gray-600">Average Order Value</span>
                                    <span className="font-bold text-red-600">৳75</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="text-gray-600">Most Popular Product</span>
                                    <span className="font-bold text-orange-600">Red Dress</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="text-gray-600">Most Engaged Customer Segment</span>
                                    <span className="font-bold text-amber-600">Women 25-34</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Orders</h2>
                            <ul className="space-y-4">
                                <li className="flex items-center space-x-4">
                                    <img src="https://via.placeholder.com/48" alt="Product 1" className="w-12 h-12 object-cover rounded-md" />
                                    <div className="flex-1 flex justify-between items-center">
                                        <span>Order #1234</span>
                                        <span className="font-bold">৳120</span>
                                    </div>
                                </li>
                                <li className="flex items-center space-x-4">
                                    <img src="https://via.placeholder.com/48" alt="Product 2" className="w-12 h-12 object-cover rounded-md" />
                                    <div className="flex-1 flex justify-between items-center">
                                        <span>Order #1235</span>
                                        <span className="font-bold">৳85</span>
                                    </div>
                                </li>
                                <li className="flex items-center space-x-4">
                                    <img src="https://via.placeholder.com/48" alt="Product 3" className="w-12 h-12 object-cover rounded-md" />
                                    <div className="flex-1 flex justify-between items-center">
                                        <span>Order #1236</span>
                                        <span className="font-bold">৳45</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-blue-100 p-6 rounded-lg shadow-lg border border-blue-300">
                            <div className="flex items-center gap-3 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l2 2m0 0l-2 2m2-2H5a2 2 0 00-2 2v1a2 2 0 002 2h14a2 2 0 002-2v-1a2 2 0 00-2-2h-7z" />
                                </svg>
                                <h2 className="text-lg font-semibold text-blue-700">Exclusive Discount</h2>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-300 shadow-inner">
                                <div className="flex flex-col md:flex-row items-center justify-between text-3xl font-bold">
                                    <h2 className="text-blue-600 mb-2 md:mb-0">25% OFF</h2>
                                    <div className="bg-blue-500 text-white px-4 py-2 rounded-lg text-center shadow-md">
                                        <h2 className="text-lg font-medium">Code: SAVE25</h2>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">Expires: <strong className="text-blue-700">31st Dec 2024</strong></p>
                        </div>
                    </div>

                    {/* -----------New Products, Inventory Overview, and Top Categories ------------------------ */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">New Products</h2>
                            <ul className="space-y-4">
                                <li className="flex items-center justify-between border-b border-gray-300 pb-2 mb-2">
                                    <div className="flex items-center space-x-4">
                                        <img src="https://via.placeholder.com/48" alt="Red Dress" className="w-12 h-12 object-cover rounded-md" />
                                        <span className="text-gray-700">Red Dress</span>
                                    </div>
                                    <span className="font-bold text-gray-900">৳60</span>
                                </li>
                                <li className="flex items-center justify-between border-b border-gray-300 pb-2 mb-2">
                                    <div className="flex items-center space-x-4">
                                        <img src="https://via.placeholder.com/48" alt="Blue Jeans" className="w-12 h-12 object-cover rounded-md" />
                                        <span className="text-gray-700">Blue Jeans</span>
                                    </div>
                                    <span className="font-bold text-gray-900">৳45</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Inventory Overview</h2>
                            <ul className="space-y-4">
                                <li className="flex justify-between items-center border-b border-gray-300 pb-2 mb-2">
                                    <span className="text-gray-700">Total Products</span>
                                    <span className="font-bold text-gray-900">350</span>
                                </li>
                                <li className="flex justify-between items-center border-b border-gray-300 pb-2 mb-2">
                                    <span className="text-gray-700">Out of Stock</span>
                                    <span className="font-bold text-gray-900">12</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="text-gray-700">Low Stock (Below 10)</span>
                                    <span className="font-bold text-gray-900">25</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Top Categories</h2>
                            <ul className="space-y-4">
                                <li className="flex justify-between items-center border-b border-gray-300 pb-2 mb-2">
                                    <span className="text-gray-700">Men’s Apparel</span>
                                    <span className="font-bold text-gray-900">320 sales</span>
                                </li>
                                <li className="flex justify-between items-center border-b border-gray-300 pb-2 mb-2">
                                    <span className="text-gray-700">Women’s Accessories</span>
                                    <span className="font-bold text-gray-900">290 sales</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="text-gray-700">Electronics</span>
                                    <span className="font-bold text-gray-900">250 sales</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* -----------Quick Actions ------------------------ */}
                    <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Link to={'/aameraaadmin2024/order'} className="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 text-center">
                                View Orders
                            </Link>
                            <Link to={'/aameraaadmin2024/product'} className="bg-green-500 text-white p-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300 text-center">
                                Add New Product
                            </Link>
                            <Link to={'/aameraaadmin2024/category'} className="bg-yellow-500 text-white p-3 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 text-center">
                                Manage Categories
                            </Link>
                            <Link to={'/aameraaadmin2024/users'} className="bg-red-500 text-white p-3 rounded-lg shadow-md hover:bg-red-600 transition duration-300 text-center">
                                Manage Users
                            </Link>
                        </div>
                    </div>

                </div>
            </div >
        </>
    );
}

export default Dashboard;
