// Filename - components/SubMenu.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
    display: flex;
    color: rgb(0, 0, 0);
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    list-style: none;
    height: 60px;
    text-decoration: none;
    font-size: 18px;
    top: 0;
    &:hover {
  
        background: linear-gradient(145deg, #66b4e2, #5697be);
        box-shadow:  20px 20px 60px #518fb3,
                    -20px -20px 60px #6dc1f3;
        cursor: pointer;
        color: #1b4965;
        
    }
`;

const SidebarLabel = styled.span`
    margin-left: 16px;
`;

const DropdownLink = styled(Link)`
    display: flex;
    color: rgb(0, 0, 0);
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    list-style: none;
    height: 60px;
    text-decoration: none;
    font-size: 18px;
    margin-left: 20px;
    

    &:hover {
        border-left-right-radius: 0px 50px;
        background: linear-gradient(145deg, #66b4e2, #5697be);
        box-shadow:  20px 20px 60px #518fb3,
                    -20px -20px 60px #6dc1f3;

        cursor: pointer;
        color: #1b4965;
    }
`;

const SubMenu = ({ item }) => {
    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => setSubnav(!subnav);

    return (
        <>
            <SidebarLink
                to={item.path}
                onClick={item.subNav && showSubnav}
            >
                <div>
                    {item.icon}
                    <SidebarLabel>
                        {item.title}
                    </SidebarLabel>
                </div>
                <div>
                    {item.subNav && subnav
                        ? item.iconOpened
                        : item.subNav
                        ? item.iconClosed
                        : null}
                </div>
            </SidebarLink>
            {subnav &&
                item.subNav.map((item, index) => {
                    return (
                        <DropdownLink
                            to={item.path}
                            key={index}
                        >
                            {item.icon}
                            <SidebarLabel>
                                {item.title}
                            </SidebarLabel>
                        </DropdownLink>
                    );
                })}
        </>
    );
};

export default SubMenu;
