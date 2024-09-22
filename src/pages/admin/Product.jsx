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
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import { Select, SelectItem } from "@nextui-org/select";
import PulseLoader from 'react-spinners/PulseLoader';  // Import PulseLoader

function Product() {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, setValue } = useForm();
    const [imagePreviews, setImagePreviews] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const [loading, setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState({ create: false, edit: false, delete: false });
    const { isOpen: isEditProductModalOpen, onOpen: openEditProductModal, onClose: closeEditProductModal } = useDisclosure();
    const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    //------------------------------------------- Fetch All category ------------------------------------------------//
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_QC_APP_API}/api/v1/category/get-all-category`);
            setCategories(res.data.category);
        } catch (error) {
            toast.error('Failed to fetch category');
        } finally {
            setLoading(false);
        }
    };

    //------------------------------------------- Fetch All Product ------------------------------------------------//
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_QC_APP_API}/api/v1/product/get-products`);
            setProducts(res.data.products);
        } catch (error) {
            toast.error('Failed to fetch product');
        } finally {
            setLoading(false);
        }
    };

    //------------------------------------------- Image Preview ------------------------------------------------//
    const handleMainImageChange = (event) => {
        const file = event.target.files[0];
        const preview = URL.createObjectURL(file);
        setImagePreviews(prev => [{ url: preview, file, main: true }, ...prev.filter(p => !p.main)]);
    };

    const handleGalleryImagesChange = (event) => {
        const files = Array.from(event.target.files);
        const newPreviews = files.map(file => ({ url: URL.createObjectURL(file), file, main: false }));
        setImagePreviews(prev => [...prev.filter(p => p.main), ...newPreviews]);
    };

    //------------------------------------------- Create Product ------------------------------------------------//
    const onSubmit = async (formData) => {
        setButtonLoading(prev => ({ ...prev, create: true }));
        const data = new FormData();
        data.append('productTitle', formData.productTitle);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('stock', formData.stock);
        data.append('sku', formData.sku);

        imagePreviews.forEach((preview, index) => {
            if (preview.file) {
                data.append('images', preview.file, `product-image-${index}.jpg`);
            }
        });

        try {
            const res = await axios.post(`${import.meta.env.VITE_REACT_QC_APP_API}/api/v1/product/create-product`, data);
            if (res.data.success) {
                toast.success(res.data.message);
                fetchProducts();
                reset();
                setImagePreviews([]); // Reset image previews after product is created
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error('Failed to create product');
        } finally {
            setButtonLoading(prev => ({ ...prev, create: false }));
        }
    };

    //------------------------------------------- Edit Product ------------------------------------------------//
    const handleEditClick = (product) => {
        setEditProduct(product);
        setValue('productTitle', product.productTitle);
        setValue('description', product.description);
        setValue('price', product.price);
        setValue('category', product.category._id); // Set the category ID
        setValue('stock', product.stock);
        setValue('sku', product.sku);
        openEditProductModal();
    };


    const handleEditProduct = async (data) => {
        setButtonLoading({ ...buttonLoading, edit: true });

        try {
            const res = await axios.put(`${import.meta.env.VITE_REACT_QC_APP_API}/api/v1/product/update-product/${editProduct._id}`, {
                productTitle: data.productTitle,
                description: data.description,
                price: data.price,
                category: data.category,
                stock: data.stock,
                sku: data.sku,
                // Assuming images are handled separately
            });

            if (res.data.success) {
                toast.success(res.data.message, { position: 'top-right' });
                fetchProducts(); // Refresh the product list
                handleEditModalClose();
            } else {
                toast.error(res.data.message, { position: 'top-right' });
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to update product', { position: 'top-right' });
        } finally {
            setButtonLoading({ ...buttonLoading, edit: false });
        }
    };


    //------------------------------------------- Delete Product ------------------------------------------------//
    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setDeleteConfirmModalOpen(true);
    };

    const handleDeleteProduct = async () => {
        setButtonLoading(prev => ({ ...prev, delete: true }));
        try {
            const res = await axios.delete(`${import.meta.env.VITE_REACT_QC_APP_API}/api/v1/product/delete-product/${productToDelete._id}`);
            if (res.data.message) {
                toast.success(res.data.message);
                fetchProducts();
                setDeleteConfirmModalOpen(false);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error('Failed to delete product');
        } finally {
            setButtonLoading(prev => ({ ...prev, delete: false }));
        }
    };

    //------------------------------------------- Handle Modal Close ------------------------------------------------//
    const handleEditModalClose = () => {
        closeEditProductModal();
        setImagePreviews([]);  // Reset image previews when edit modal is closed
    };

    //------------------------------------------- Handle Add Product Click ------------------------------------------------//
    const handleAddProductClick = () => {
        setImagePreviews([]);  // Reset previews before adding new product
        reset();  // Reset form fields
    };

    //----------------------- Logout function ----------------------//
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null, token: ''
        });
        localStorage.removeItem('auth');
        toast.success('Logged Out Successfully', { position: 'top-right' });
        navigate('/sign-in2024');
    };

    return (
        <div className="product-management">
            <Helmet>
                <title>Manage Products</title>
            </Helmet>
            <Toaster position="top-center" />

            {/* Sidebar */}
            <div className='md:flex textFont'>
                <div className='w-[20%] border-r-3 border-[#9e9e9e] h-screen md:flex hidden flex-col items-center bg-white fixed'>
                    <div className='pt-5'>
                        <img src={logo} alt="QC Artistry" className='w-[150px] mx-auto' />
                    </div>
                    <h2 className='text-xl pt-5 font-extrabold border-b-3 pb-2'>Admin panel</h2>
                    <div className='flex flex-col space-y-4 items-center w-full mt-10 overflow-y-auto'>
                        <Link to={'/aameraaadmin2024'} className='flex items-center gap-3 md:text-[16px] lg:text-[18px] md:pl-[8%] lg:pl-[16%] w-full hover:text-black hover:font-medium duration-300 py-1.5 lg:py-2.5 uppercase'>
                            <div className='md:text-2xl lg:text-3xl'><MdDashboard /></div>Dashboard
                        </Link>
                        <Link to={'/aameraaadmin2024/order'} className='flex items-center gap-3 md:text-[16px] lg:text-[18px] md:pl-[8%] lg:pl-[16%] w-full hover:text-black hover:font-medium py-1.5 lg:py-2.5 uppercase'>
                            <div className='md:text-2xl lg:text-3xl'><GiBeachBag /></div>Orders
                        </Link>
                        <Link to={'/aameraaadmin2024/product'} className='font-bold flex items-center gap-3 md:text-[16px] lg:text-[18px] md:pl-[8%] lg:pl-[16%] w-full hover:text-black py-1.5 lg:py-2.5 uppercase'>
                            <div className='md:text-2xl lg:text-3xl'><GiTravelDress /></div>Products
                        </Link>
                        <Link to={'/aameraaadmin2024/category'} className='flex items-center gap-3 md:text-[16px] lg:text-[18px] md:pl-[8%] lg:pl-[16%] w-full hover:text-black hover:font-medium py-1.5 lg:py-2.5 uppercase'>
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

                {/* Header for mobile */}
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
                                            <Link to={'/aameraaadmin2024/product'} className='font-bold  flex items-center gap-3 text-[18px] w-full text-black py-2.5 uppercase'>
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

                {/* Main content */}
                <div className="w-full md:w-[80%] md:ml-[20%] h-full bg-[#EEEEEE]">
                    <div className="md:flex justify-between items-center my-2 mx-5">
                        {/* Search button */}
                        <div className="flex md:w-[40%]">
                            <input
                                type="search"
                                placeholder="Search here"
                                className="w-full border-none outline-none px-3 py-3 rounded-l-md"
                            />
                            <button className="bg-black text-white px-3 py-3 rounded-r-md">
                                Search
                            </button>
                        </div>

                        {/* Add Product */}
                        <div className="rounded-md flex justify-center items-center gap-3 w-full md:w-auto mt-3 md:mt-0">
                            <div className="drawer drawer-end">
                                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                                <div className="drawer-content">
                                    <label
                                        htmlFor="my-drawer-4"
                                        onClick={handleAddProductClick}
                                        className="drawer-button bg-black text-white hover:bg-black cursor-pointer px-3 py-3 rounded-md flex justify-center items-center gap-3 w-full md:w-auto mt-3 md:mt-0"
                                    >
                                        <div className="flex items-center gap-3 justify-center">
                                            <FaPlus className="text-[16px] font-bold" />
                                            Add Products
                                        </div>
                                    </label>
                                </div>

                                <div className="drawer-side z-50 no-scrollbar">
                                    <label
                                        htmlFor="my-drawer-4"
                                        aria-label="close sidebar"
                                        className="drawer-overlay"
                                    ></label>

                                    <div className="menu bg-[#ffffff] text-base-content min-h-full w-[70%] md:w-[40%] px-5 py-5 ">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <Input
                                                type="text"
                                                label="Product Title"
                                                className='w-[100%] mb-5'
                                                {...register("productTitle")}
                                            />
                                            <div className='md:flex md:gap-3'>
                                                <Input
                                                    type="number"
                                                    label="Price"
                                                    className='w-[100%] mb-5'
                                                    {...register("price")}
                                                />

                                                <Select
                                                    id="category"
                                                    label="Select Category"
                                                    {...register('category')}
                                                    fullWidth
                                                    className="mb-5"
                                                    defaultValue={editProduct ? editProduct.category._id : ""}
                                                >
                                                    {categories.map((category) => (
                                                        <SelectItem key={category._id} value={category._id}>
                                                            {category.mainCategory}
                                                        </SelectItem>
                                                    ))}
                                                </Select>

                                            </div>
                                            <Textarea
                                                type='text'
                                                className='w-[100%] mb-5'
                                                label="Description"
                                                placeholder="Enter your product description"
                                                {...register("description")}
                                            />

                                            <div className='flex flex-col-reverse md:flex-row justify-between items-center gap-5'>
                                                <div className='md:w-[50%]'>
                                                    <input
                                                        type='file'
                                                        id='mainImage'
                                                        {...register('mainImage')}
                                                        onChange={handleMainImageChange}
                                                        className='mb-4'
                                                    />
                                                    {/* মূল ইমেজের প্রিভিউ */}
                                                    {imagePreviews.filter(p => p.main).map((preview, index) => (
                                                        <img key={index} src={preview.url} alt={`Main Preview`} className="preview-image w-full object-cover rounded-md" />
                                                    ))}
                                                </div>

                                                <div className="md:w-[50%] w-full">
                                                    <Input
                                                        type="number"
                                                        label="Stock"
                                                        className='w-full mb-5'
                                                        {...register("stock")}
                                                    />

                                                    <Input
                                                        type="number"
                                                        label="SKU"
                                                        className='w-full mb-5'
                                                        {...register("sku")}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <input
                                                    type='file'
                                                    id='galleryImages'
                                                    multiple
                                                    {...register('galleryImages')}
                                                    onChange={handleGalleryImagesChange}
                                                    className='mb-4'
                                                />
                                                {/* গ্যালারি ইমেজের প্রিভিউ */}
                                                <div className="gallery-previews flex flex-wrap">
                                                    {imagePreviews.filter(p => !p.main).map((preview, index) => (
                                                        <div key={index} className="preview-container relative w-24 h-24 mr-2 mb-2">
                                                            <img src={preview.url} alt={`Gallery Preview-${index}`} className="preview-image w-full h-full object-cover rounded-md" />
                                                            <button
                                                                type="button"
                                                                className="absolute top-0 right-0 w-5 h-5 bg-red-600 text-white rounded-full"
                                                                onClick={() => {
                                                                    setImagePreviews(prev => prev.filter((_, i) => i !== index + (prev.filter(p => p.main).length)));
                                                                }}
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <button className='bg-[#000] text-white w-full py-4 rounded-md hover:bg-[#555555] duration-300 uppercase' type='submit' disabled={buttonLoading.create}>
                                                {buttonLoading.create ? (
                                                    <PulseLoader size={8} color={"#ffffff"} />
                                                ) : (
                                                    "Create product"
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Edit Product Modal */}
                    <Modal isOpen={isEditProductModalOpen} onOpenChange={handleEditModalClose} className="max-w-lg mx-auto">
                        <ModalContent className="w-full max-w-full sm:max-w-lg mx-auto h-full sm:h-auto max-h-[90vh] overflow-y-auto">
                            {onClose => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Edit Product</ModalHeader>
                                    <form onSubmit={handleSubmit(handleEditProduct)}>
                                        <ModalBody className="space-y-4">
                                            <Input {...register('productTitle')} label="Product Title" type='text' fullWidth />
                                            <Textarea {...register('description')} label="Description" type='text' fullWidth />
                                            <Input {...register('price')} label="Price" type='number' fullWidth />
                                            <Select {...register('category')} label="Category">
                                                {categories.map((category) => (
                                                    <SelectItem key={category._id} value={category._id}>
                                                        {category.mainCategory}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                            <Input {...register('sku')} label="SKU" type='text' fullWidth />
                                            <Input {...register('stock')} label="Stock" type='number' fullWidth />

                                        </ModalBody>
                                        <ModalFooter className="flex justify-end space-x-2">
                                            <Button type="submit" className="capitalize" disabled={buttonLoading.edit}>
                                                {buttonLoading.edit ? (
                                                    <PulseLoader size={8} color={"#ffffff"} />
                                                ) : (
                                                    "Submit"
                                                )}
                                            </Button>
                                        </ModalFooter>
                                    </form>
                                </>
                            )}
                        </ModalContent>
                    </Modal>



                    {/* Delete Confirmation Modal */}
                    <Modal isOpen={deleteConfirmModalOpen} onOpenChange={() => setDeleteConfirmModalOpen(false)} >
                        <ModalContent>
                            <ModalHeader>Confirm Deletion</ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete this product?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    css={{ backgroundColor: '#111827', color: 'white', '&:hover': { backgroundColor: '#ff0000' } }}
                                    onClick={handleDeleteProduct}
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

                    {/* Display the loader when loading */}
                    {loading && (
                        <div className="flex justify-center items-center h-screen">
                            <PulseLoader size={15} color={"#000"} loading={loading} />
                        </div>
                    )}

                    {/* Only show the table when not loading */}
                    {!loading && (
                        <div className="overflow-x-auto mt-5 shadow-lg mx-5 bg-white rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 bg-white">
                                <thead className="bg-gray-100 text-gray-600">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-center">
                                            Serial
                                        </th>
                                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-center">
                                            Image
                                        </th>
                                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-center">
                                            Product Name
                                        </th>
                                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-center">
                                            Price
                                        </th>
                                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-center">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-center">
                                            Stock Quantity
                                        </th>
                                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-center">
                                            SKU
                                        </th>
                                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-center">
                                            Discount
                                        </th>
                                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-center">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-center">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map((p, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-4 text-center w-24 sm:w-24">
                                                {p.images && p.images.length > 0 && (
                                                    <img
                                                        src={p.images[0].url} // Access the URL of the first image
                                                        alt="Product Image"
                                                        className="w-16 h-16 object-cover rounded-md border border-gray-200"
                                                    />
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">
                                                {p.productTitle.length > 15 ? `${p.productTitle.slice(0, 25)}...` : p.productTitle}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                                ৳ {p.price}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                                {p.category.mainCategory}  {/* Display the mainCategory */}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                                {p.stock}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                                {p.sku}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                                0%
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 text-center w-24 sm:w-24">
                                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                    Active
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                                <div className='flex gap-2'>
                                                    <div>CD : </div>
                                                    <div>
                                                        {(() => {
                                                            const date = new Date(p.createdAt);
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
                                                    </div>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <div>UD : </div>
                                                    <div>
                                                        {(() => {
                                                            const date = new Date(p.updatedAt);
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
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="flex items-center gap-2">
                                                    {/* Product Edit Button */}
                                                    <button onClick={() => handleEditClick(p)} className="text-green-500 hover:bg-green-100 p-2 rounded-full transition-colors duration-300">
                                                        <GrEdit className="text-lg" />
                                                    </button>

                                                    {/* Product Delete Button */}
                                                    <button onClick={() => handleDeleteClick(p)} className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors duration-300">
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
                </div>
            </div>
        </div>
    );
}

export default Product;
