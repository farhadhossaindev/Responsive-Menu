import React from 'react'
import '../Style/Style.css';
import Slider from '../components/Slider'
import Layout from '../Layout/Layout';
import { Helmet } from 'react-helmet';
import { useAuth } from '../context/auth';

function Home() {
  const currentYear = new Date().getFullYear();
  const [auth, setAuth] = useAuth()
  return (

    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="B Discover premium, stylish clothing designed for modern elegance. Perfect for every occasion, our collection redefines fashion with timeless pieces" />
        <meta name="keywords" content="Fashion Clothing, Stylish Trendy Outfits, Designer Clothes, Women's Fashion, Men's Fashion, Kids' Clothing, Sustainable Fashion, Eco-friendly Clothing, Luxury Clothing, Urban Fashion, Bohemian Style, Minimalist Fashion, Activewear, Athleisure, Casual Wear, Formal Wear, Vintage Clothing, Boutique Fashion, Fashion Accessories, High-end Fashion, Trendy Tops, Elegant Dresses, Fashionable Outerwear, Chic Clothing  " />
        <meta name="author" content='QC Artistry' />
      </Helmet>

      <div className='h-[90vh]'>
        {/* -------------------- Slider ---------------------- */}
        <Slider />
      </div>

      <pre>
        {JSON.stringify(auth, null, 4) }
      </pre>

    </>


  )
}

export default Home