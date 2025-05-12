// Filename - components/Sidebar.js

import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './SidebarData'
import { IconContext } from 'react-icons/lib'
import MulesoftLogo from './MulesoftLogo'

const Sidebar = ({ isOpen, toggle }) => {
  const sidebarRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggle()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, toggle])

  return (
    <IconContext.Provider value={{ color: '#1e98f3' }}>
      <nav
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-90 bg-white shadow transition-all duration-300 z-[1000] overflow-y-auto text-sm font-sans ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <Link to="/" className="flex items-center text-gray-800 no-underline" onClick={toggle}>
            <MulesoftLogo size={24} />
            <span className="ml-2 font-medium text-base">MuleSoft Accelerator</span>
          </Link>
          <AiIcons.AiOutlineClose onClick={toggle} className="text-xl cursor-pointer" />
        </div>

        {/* Sidebar Content */}
        <div className="py-5">
          {SidebarData.map((category, index) => (
            <div key={index}>
              <div className="px-6 pt-4 pb-2 text-xs text-gray-500 font-semibold uppercase tracking-wide">
                {category.title}
              </div>
              {category.items.map((item, idx) => (
                <Link
                  to={item.active ? item.path : '/coming-soon'}
                  key={idx}
                  onClick={toggle}
                  className={`relative flex items-center px-6 py-3 text-sm no-underline transition hover:bg-gray-100 ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-800'
                  }`}
                >
                  <div className={`flex items-center ${!item.active ? 'opacity-40' : ''}`}>
                    <span className="mr-3 text-lg text-blue-500">{item.icon}</span>
                    <span>{item.title}</span>
                  </div>

                  {!item.active && (
                    <span
                      className="absolute top-0 right-0 bg-blue-800 text-white text-[10px] font-semibold px-2 py-0.5"
                      style={{
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 10% 100%)',
                      }}
                    >
                      Coming Soon
                    </span>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </nav>
    </IconContext.Provider>
  )
}

export default Sidebar
