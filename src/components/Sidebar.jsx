// Filename - components/Sidebar.js

import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './SidebarData'
import SubMenu from './SubMenu'
import { IconContext } from 'react-icons/lib'
import logo from '../assets/pngegg.png'
import MulesoftLogo from './MulesoftLogo'

import '../App.css'
const Nav = styled.div`
  height: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: rgb(255, 255, 255);
`

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 70px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

// Update this styled component to use the isOpen prop instead of sidebar
const SidebarNav = styled.nav`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  width: 280px;
  height: 100%;
  background-color: white;
  transition: 350ms;
  z-index: 1000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
`

// For the sidebar header
const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
`

const HeaderText = styled.span`
  font-weight: 500;
  font-size: 16px;
  color: #333;
`

// Update your SidebarWrap styling
const SidebarWrap = styled.div`
  width: 100%;
  padding: 20px 0;
`

// For category headers
const CategoryHeader = styled.div`
  padding: 16px 24px 8px;
  color: #767676;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`

// For menu items
const MenuItemLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  text-decoration: none;
  color: #333;
  font-size: 14px;
  font-weight: 400;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }

  &.active {
    background-color: #f0f7ff;
    color: #009de2;
    font-weight: 500;
  }

  svg {
    margin-right: 12px;
    font-size: 16px;
    color: #009de2;
  }
`

const link = '/'

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
      <SidebarNav isOpen={isOpen} ref={sidebarRef}>
        <SidebarHeader>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <MulesoftLogo size={24} />
            <HeaderText style={{ marginLeft: '10px' }}>MuleSoft Accelerator</HeaderText>
          </Link>
          <AiIcons.AiOutlineClose
            onClick={toggle}
            style={{ cursor: 'pointer', fontSize: '20px' }}
          />
        </SidebarHeader>

        {SidebarData.map((category, index) => (
          <div key={index}>
            <CategoryHeader>{category.title}</CategoryHeader>
            {category.items.map((item, idx) => (
              <MenuItemLink
                to={item.path}
                key={idx}
                className={location.pathname === item.path ? 'active' : ''}
                onClick={toggle}
              >
                {item.icon}
                <span>{item.title}</span>
              </MenuItemLink>
            ))}
          </div>
        ))}
      </SidebarNav>
    </IconContext.Provider>
  )
}

export default Sidebar
