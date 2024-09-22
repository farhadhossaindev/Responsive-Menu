import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router.jsx'
import { AuthProvider } from './context/auth.jsx'
import { Toaster } from 'react-hot-toast';



ReactDOM.createRoot(document.getElementById('root')).render(

  <NextUIProvider>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
      {/* <App /> */}
    </AuthProvider>

  </NextUIProvider>

)
