// Filename - components/Sidebar.js

import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import logo from '../assets/pngegg.png';
const Nav = styled.div`
    border-bottom-left-radius: 50px 20px;
    border-bottom-right-radius: 50px 20px;
    background: #e0e0e0;
    box-shadow: inset 6px 6px 12px #aaaaaa,
                inset -6px -6px 12px #ffffff;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    
`;

const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height: 5px;
    display: block;
    justify-content: flex-start;
    align-items: center;
`;

const SidebarNav = styled.nav`
    background:rgb(255, 255, 255);
    width: 250px;
    height: 50vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 20%;
    left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
    transition: 350ms;
    z-index: 10;
    background: #e0e0e0;
    box-shadow: inset 6px 6px 12px #aaaaaa,
                inset -6px -6px 12px #ffffff;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    
`;

const SidebarWrap = styled.div`
    width: 100%;
`;

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{ color: "#fff" }}>
                <Nav>
                    <NavIcon to="#">
                        <FaIcons.FaBars 
                            onClick={showSidebar}
                        />
                    </NavIcon>
                    <img width="10%"
                height="100%" className="logoImg" src={logo} alt="Your Logo" />
                </Nav>
                <SidebarNav sidebar={!sidebar}>
                    <SidebarWrap>
                        <NavIcon to="#">
                            
                        </NavIcon>
                        {SidebarData.map((item, index) => {
                            return (
                                <SubMenu
                                    item={item}
                                    key={index}
                                />
                            );
                        })}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </>
    );
};

export default Sidebar;


