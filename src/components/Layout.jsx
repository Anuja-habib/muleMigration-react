import { Outlet } from 'react-router-dom'
import React, { useState } from 'react'
import Sidebar from './Sidebar'
import GlobalNavigation from './GlobalNavigation'
import Footer from './Footer'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <>
      <GlobalNavigation toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
