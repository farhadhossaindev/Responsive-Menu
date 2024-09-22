import React, { useState, useEffect } from 'react';
import logo from '../../assets/Logo.png';
import { MdDashboard, MdCategory, MdDeleteForever } from "react-icons/md";
import { GiBeachBag, GiTravelDress } from "react-icons/gi";
import { IoLogOut } from "react-icons/io5";
import { FaUsers, FaPlus } from "react-icons/fa6";
import { RiMenuFoldFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../context/auth';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { GrEdit } from "react-icons/gr";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import PulseLoader from "react-spinners/PulseLoader";

function Category() {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const { isOpen: isAddCategoryModalOpen, onOpen: openAddCategoryModal, onClose: closeAddCategoryModal } = useDisclosure();
    const { isOpen: isEditCategoryModalOpen, onOpen: openEditCategoryModal, onClose: closeEditCategoryModal } = useDisclosure();
    const { register, handleSubmit, reset, setValue } = useForm();
    const [loading, setLoading] = useState(true); // Set loading to true initially
    const [buttonLoading, setButtonLoading] = useState({ create: false, edit: '', delete: '' });

    // Logout function
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null, token: ''
        });
        localStorage.removeItem('auth');
        toast.success('Logged Out Successfully', { position: 'top-right' });
        navigate('/sign-in2024');
    };

    // Category form submit handler
    const onSubmit = async (data) => {
        setButtonLoading({ ...buttonLoading, create: true });
        try {
            const res = await axios.post(`${import.meta.env.VITE_REACT_QC_APP_API}/api/v1/category/create-category`, {
                mainCategory: data.category,
            });

            if (res.data.success) {
                toast.success(res.data.message, { position: 'top-right' });
                getAllCategory(); // Refresh the category list
                closeAddCategoryModal(); // Close modal after submission
            } else {
                toast.error(res.data.message, { position: 'top-right' });
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong', { position: 'top-right' });
        } finally {
            setButtonLoading({ ...buttonLoading, create: false });
        }
        reset();
    };

    // Get All Categories
    const getAllCategory = async () => {
        setLoading(true); // Start loading before fetching data
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_REACT_QC_APP_API}/api/v1/category/get-all-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong in fetching categories', { position: 'top-right' });
        } finally {
            setLoading(false); // Stop loading after data is fetched
        }
    };

    // Edit category
    const handleEditCategory = async (data) => {
        setButtonLoading({ ...buttonLoading, edit: selectedCategory._id });
        try {
            const res = await axios.put(`${import.meta.env.VITE_REACT_QC_APP_API}/api/v1/category/update-category/${selectedCategory._id}`, {
                mainCategory: data.category,
            });

            if (res.data.success) {
                toast.success(res.data.message, { position: 'top-right' });
                getAllCategory();
                closeEditCategoryModal();
            } else {
                toast.error(res.data.message, { position: 'top-right' });
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong', { position: 'top-right' });
        } finally {
            setButtonLoading({ ...buttonLoading, edit: '' });
        }
    };

    // Handle Edit Button Click
    const handleEditClick = (category) => {
        setSelectedCategory(category);
        setValue('category', category.mainCategory);
        openEditCategoryModal();
    };

    // Handle Add Category Modal Open
    const handleOpenAddCategoryModal = () => {
        reset();  // Reset input fields
        openAddCategoryModal();
    };

    // Handle Delete Button Click
    const handleDeleteClick = (category) => {
        setCategoryToDelete(category);
        setDeleteConfirmModalOpen(true);
    };

    // Handle Delete Confirmation
    const handleDeleteCategory = async () => {
        setButtonLoading({ ...buttonLoading, delete: categoryToDelete._id });
        try {
            const res = await axios.delete(`${import.meta.env.VITE_REACT_QC_APP_API}/api/v1/category/delete-category/${categoryToDelete._id}`);

            if (res.data.success) {
                toast.success(res.data.message, { position: 'top-right' });
                getAllCategory();
                setDeleteConfirmModalOpen(false);
            } else {
                toast.error(res.data.message, { position: 'top-right' });
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong', { position: 'top-right' });
        } finally {
            setButtonLoading({ ...buttonLoading, delete: '' });
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    return (
        <>
            <Helmet>
                <title>Category</title>
            </Helmet>

            <Toaster /> {/* Ensure Toaster is included at the top level */}

            <div className='md:flex textFont'>
                {/* -----------Site menu for desktop ------------------------ */}
                <div className='w-[20%] border-r-3 border-[#9e9e9e] h-screen md:flex hidden flex-col items-center bg-white fixed'>
                    <div className='pt-5'>
                        <img src={logo} alt="QC Artictry" className='w-[150px] mx-auto' />
                    </div>
                    <h2 className='text-xl pt-5 font-extrabold border-b-3 pb-2'>Admin panel</h2>

                    <div className='flex flex-col space-y-4 items-center w-full mt-10 overflow-y-auto'>
                        <Link to={'/aameraaadmin2024'} className='flex items-center gap-3 md:text-[16px] lg:text-[18px] md:pl-[8%] lg:pl-[16%] w-full hover:text-black hover:font-medium duration-300 py-1.5 lg:py-2.5 uppercase'>
                            <div className='md:text-2xl lg:text-3xl'><MdDashboard /></div>Dashboard
                        </Link>
                        <Link to={'/aameraaadmin2024/order'} className='flex items-center gap-3 md:text-[16px] lg:text-[18px] md:pl-[8%] lg:pl-[16%] w-full hover:text-black hover:font-medium py-1.5 lg:py-2.5 uppercase'>
                            <div className='md:text-2xl lg:text-3xl'><GiBeachBag /></div>Orders
                        </Link>
                        <Link to={'/aameraaadmin2024/product'} className='flex items-center gap-3 md:text-[16px] lg:text-[18px] md:pl-[8%] lg:pl-[16%] w-full hover:text-black hover:font-medium py-1.5 lg:py-2.5 uppercase'>
                            <div className='md:text-2xl lg:text-3xl'><GiTravelDress /></div>Products
                        </Link>
                        <Link to={'/aameraaadmin2024/category'} className='font-bold flex items-center gap-3 md:text-[16px] lg:text-[18px] md:pl-[8%] lg:pl-[16%] w-full hover:text-black py-1.5 lg:py-2.5 uppercase'>
                            <div className='md:text-2xl lg:text-3xl'><MdCategory /></div>Categories
                        </Link>
                        <Link to={'/aameraaadmin2024/users'} className='flex items-center gap-3 md:text-[16px] lg:text-[18px] md:pl-[8%] lg:pl-[16%] w-full hover:text-black hover:font-medium py-1.5 lg:py-2.5 uppercase'>
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
                                <img src={logo} alt="QC Artistry" />
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
                                            <Link to={'/aameraaadmin2024/category'} className='font-bold flex items-center gap-3 text-[18px] w-full text-black   py-2.5 uppercase'>
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

                {/* ---------------------------------------- Main Content ----------------------------------------- */}
                <div className="w-full md:w-[80%] md:ml-[20%] h-full bg-[#EEEEEE]">

                    <div className="md:flex justify-between items-center my-2 mx-5">
                        <div className='flex md:w-[40%]'>
                            <input
                                type="search"
                                placeholder="Search here"
                                className='w-full border-none outline-none px-3 py-3 rounded-l-md'
                            />
                            <button className='bg-black text-white px-3 py-3 rounded-r-md'>Search</button>
                        </div>
                        <Button onPress={handleOpenAddCategoryModal} className='bg-black text-white px-3 py-[22.5px] rounded-md flex justify-center items-center gap-3 w-full md:w-auto mt-3 md:mt-0'>
                            <FaPlus /> Add Category
                        </Button>
                    </div>

                    {/* ------------------------------------Category Table--------------------------------------- */}

                    {loading ? (
                        <div className="flex justify-center items-center h-screen">
                            <PulseLoader size={15} color={"#000"} loading={loading} />
                        </div>
                    ) : (
                        <div className="overflow-x-auto overflow-y-hidden mt-5 shadow-lg mx-5 bg-white rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 bg-white">
                                <thead className="bg-gray-100 text-gray-600">
                                    <tr>
                                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center w-8 sm:w-12">
                                            Serial
                                        </th>
                                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center w-24 sm:w-24">
                                            Image
                                        </th>
                                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center w-48 sm:w-36">
                                            Category Name
                                        </th>
                                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center w-72 sm:w-64">
                                            Description
                                        </th>
                                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center w-32 sm:w-32">
                                            Products Count
                                        </th>
                                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center w-32 sm:w-32">
                                            Discount
                                        </th>
                                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center w-24 sm:w-24">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center w-32 sm:w-32">
                                            Date updated
                                        </th>
                                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center w-32 sm:w-28">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {/* Example Row */}
                                    {categories.map((c, index) => (
                                        <tr key={c._id} className="hover:bg-gray-50 transition-colors duration-200">
                                            <td className="px-4 py-4 text-sm font-medium text-gray-900 text-center w-8 sm:w-12">
                                                {categories.length - index}
                                            </td>
                                            <td className="px-4 py-4 text-center w-24 sm:w-24">
                                                <img
                                                    src="https://via.placeholder.com/64"
                                                    alt="Category Image"
                                                    className="w-16 h-16 object-cover rounded-md border border-gray-200"
                                                />
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 text-center w-48 sm:w-36">
                                                {c.mainCategory}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 text-center w-72 sm:w-64">
                                                Trendy and stylish....
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 text-center w-32 sm:w-32">
                                                120
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 text-center w-32 sm:w-32">
                                                0%
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 text-center w-24 sm:w-24">
                                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                    Active
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 text-center w-32 sm:w-32">
                                                {(() => {
                                                    const date = new Date(c.updatedAt);
                                                    const day = String(date.getDate()).padStart(2, '0');
                                                    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                                                    const year = date.getFullYear();

                                                    let hours = date.getHours();
                                                    const minutes = String(date.getMinutes()).padStart(2, '0');
                                                    const seconds = String(date.getSeconds()).padStart(2, '0');

                                                    // Determine AM or PM
                                                    const period = hours >= 12 ? 'PM' : 'AM';

                                                    // Convert to 12-hour format
                                                    hours = hours % 12;
                                                    hours = hours ? hours : 12; // the hour '0' should be '12'

                                                    // Format hours to two digits
                                                    const formattedHours = String(hours).padStart(2, '0');

                                                    return `${day}-${month}-${year} ${formattedHours}:${minutes}:${seconds} ${period}`;
                                                })()}
                                            </td>

                                            <td className="px-4 py-4 text-center w-32 sm:w-28">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button onClick={() => handleEditClick(c)} className="text-green-500 hover:bg-green-100 p-2 rounded-full transition-colors duration-300">
                                                        <GrEdit className="text-lg" />
                                                    </button>
                                                    <button onClick={() => handleDeleteClick(c)} className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors duration-300">
                                                        <MdDeleteForever className="text-lg" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}


                    {/* --------------------------------------- Add category modal-------------------------------------- */}
                    <Modal isOpen={isAddCategoryModalOpen} onOpenChange={closeAddCategoryModal} >
                        <ModalContent>
                            {onClose => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Add new category</ModalHeader>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <ModalBody>
                                            <div className="my-5 ">
                                                <Input
                                                    {...register('category')}
                                                    placeholder="Category Name"
                                                    className="text-black border-2 rounded-xl"
                                                    fullWidth
                                                />
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button type="submit" className="capitalize" onClick={onClose} disabled={buttonLoading.create}>
                                                {buttonLoading.create ? (
                                                    <PulseLoader size={8} color={"#ffffff"} />
                                                ) : (
                                                    "Create"
                                                )}
                                            </Button>
                                        </ModalFooter>
                                    </form>
                                </>
                            )}
                        </ModalContent>
                    </Modal>

                    {/* ------------------------------------ Edit Category Modal--------------------------------------- */}
                    <Modal isOpen={isEditCategoryModalOpen} onOpenChange={closeEditCategoryModal} >
                        <ModalContent>
                            {onClose => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Edit Category</ModalHeader>
                                    <form onSubmit={handleSubmit(handleEditCategory)}>
                                        <ModalBody>
                                            <div className="my-5 ">
                                                <Input
                                                    {...register('category')}
                                                    placeholder="Category Name"
                                                    className="text-black border-2 rounded-xl"
                                                    fullWidth
                                                />
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button type="submit" className="capitalize" onClick={onClose} disabled={buttonLoading.edit}>
                                                {buttonLoading.edit ? (
                                                    <PulseLoader size={8} color={"#ffffff"} />
                                                ) : (
                                                    "Update"
                                                )}
                                            </Button>
                                        </ModalFooter>
                                    </form>
                                </>
                            )}
                        </ModalContent>
                    </Modal>

                    {/* ------------------------------------ Delete Confirmation Modal--------------------------------------- */}
                    <Modal isOpen={deleteConfirmModalOpen} onOpenChange={() => setDeleteConfirmModalOpen(false)} >
                        <ModalContent>
                            <ModalHeader>Confirm Deletion</ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete this category?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    css={{ backgroundColor: '#111827', color: 'white', '&:hover': { backgroundColor: '#ff0000' } }}
                                    onClick={handleDeleteCategory}
                                    className="capitalize"
                                    auto
                                    disabled={buttonLoading.delete}
                                >
                                    {buttonLoading.delete ? (
                                        <PulseLoader size={8} color={"#ffffff"} />
                                    ) : (
                                        "Delete"
                                    )}
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </div>
            </div>
        </>
    );
}

export default Category;
