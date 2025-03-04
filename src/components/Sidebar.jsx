// Filename - components/Sidebar.js

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import logo from '../assets/pngegg.png';

import '../App.css';
const Nav = styled.div`
    
    height: 100px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background:rgb(255, 255, 255)
   
`;

const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height: 70px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

`;

const SidebarNav = styled.nav`
    top: 0;
    font-size: 1.5rem;
    width: 250px;
    height: 70vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 20%;
    left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
    transition: 350ms;
    z-index: 10;
    background:rgb(242, 242, 242);


    box-shadow:  10px 10px 40px #518fb3,
                    -10px -10px 40px #6dc1f3;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    
    
`;

const SidebarWrap = styled.div`
    width: 100%;
`;
const link = '/'
const Sidebar = () => {
    const [sidebar, setSidebar] = useState(true);
    const sidebarRef = useRef(null);

    const showSidebar = () => setSidebar(!sidebar);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebar && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setSidebar(false); // Close sidebar if clicked outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside); // Use mousedown for better click detection

        return () => {
            document.removeEventListener("mousedown", handleClickOutside); // Clean up event listener
        };
    }, [sidebar]);

    return (
        <>
            <IconContext.Provider value={{ color: "#1e98f3" }}>
                <Nav>
                    <NavIcon to="#">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </NavIcon>

                <div className="logoImgDiv">
                    <Link to={link} style={{ textDecoration: 'none' }}>
                    <img className="logoImg" src={logo} alt="Your Logo" />
                    </Link>
                </div>    
                    
                </Nav>
                <hr></hr>
                <SidebarNav sidebar={sidebar} ref={sidebarRef}> {/* Add ref here */}
                    <SidebarWrap>
                        <NavIcon to="#"> </NavIcon>
                        {SidebarData.map((item, index) => (
                            <SubMenu item={item} key={index} />
                        ))}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>


        </>
    );
};

export default Sidebar;
