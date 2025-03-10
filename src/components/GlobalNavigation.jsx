// components/GlobalNavigation.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaBars, FaBuilding, FaChevronDown } from 'react-icons/fa';
import { IoMdHelpCircle } from 'react-icons/io';
import { MdOutlineUpdate } from 'react-icons/md';
import MulesoftLogo from './MulesoftLogo';

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  height: 60px;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  
  &:hover {
    background-color: #f5f5f5;
    border-radius: 4px;
  }
`;

const ProductLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  margin-left: 4px;
`;

const LogoWrapper = styled.span`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const ProductName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const BusinessGroup = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  svg.building-icon {
    margin-right: 8px;
    font-size: 18px;
  }
  
  svg.chevron-icon {
    margin-left: 4px;
    font-size: 12px;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 20px;
  margin-left: 16px;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ProfileCircle = styled.div`
  width: 36px;
  height: 36px;
  background-color: #009de2;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  margin-left: 16px;
  cursor: pointer;
`;

const GlobalNavigation = ({ toggleSidebar }) => {
  // You can customize the initials
  const userInitials = 'RH';
  
  return (
    <NavContainer aria-label="Global Navigation">
      <LeftSection>
        <MenuButton 
          aria-haspopup="true" 
          title="Menu"
          onClick={toggleSidebar}
        >
          <FaBars />
        </MenuButton>
        
        <ProductLink to="/">
          <LogoWrapper>
            <MulesoftLogo size={24} />
          </LogoWrapper>
          <ProductName>MuleSoft Accelerator</ProductName>
        </ProductLink>
      </LeftSection>
      
      <RightSection>
        <BusinessGroup>
          <FaBuilding className="building-icon" />
          <span>Migration Tools</span>
          <FaChevronDown className="chevron-icon" />
        </BusinessGroup>
        
        <IconButton title="Help">
          <IoMdHelpCircle />
        </IconButton>
        
        <IconButton title="Updates">
          <MdOutlineUpdate />
        </IconButton>
        
        <ProfileCircle title="Profile">
          {userInitials}
        </ProfileCircle>
      </RightSection>
    </NavContainer>
  );
};

export default GlobalNavigation;