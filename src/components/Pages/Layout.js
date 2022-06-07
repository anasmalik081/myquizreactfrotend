import { CssBaseline } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import Navbar from '../Navbar'

const Layout = () => {
  return (
    <>
        <CssBaseline />
        <Navbar />
        <Outlet />
        <Footer />
    </>
  )
}

export default Layout