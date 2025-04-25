// components/GlobalNavigation.jsx
import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaBars, FaBuilding, FaChevronDown } from 'react-icons/fa'
import { IoMdHelpCircle } from 'react-icons/io'
import { MdOutlineUpdate } from 'react-icons/md'
import { BsBook, BsQuestionCircle } from 'react-icons/bs'
import { FiMessageSquare } from 'react-icons/fi'
import { VscBook } from 'react-icons/vsc'
import { BiSupport } from 'react-icons/bi'
import MulesoftLogo from './MulesoftLogo'

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
  font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
`

const MenuButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 20px;
  cursor: pointer;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0;
  padding: 0;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e8e8e8;
  }
`

const ProductLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  margin-left: 0;
  padding: 6px 12px;
  border-radius: 20px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e8e8e8;
  }
`

const LogoWrapper = styled.span`
  display: flex;
  align-items: center;
  margin-right: 10px;
`

const ProductName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`

const BusinessGroup = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 20px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e8e8e8;
  }

  svg.building-icon {
    margin-right: 8px;
    font-size: 18px;
  }

  svg.chevron-icon {
    margin-left: 4px;
    font-size: 12px;
  }
`

const IconButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 20px;
  margin-left: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e8e8e8;
  }
`

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
`

const HelpDropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`

const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  min-width: 280px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 8px 0;
  z-index: 1000;
  margin-top: 8px;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`

const QuickStartSection = styled.div`
  padding: 16px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e5e5e5;
`

const QuickStartTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
`

const QuickStartDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 12px 0;
  line-height: 1.4;
`

const GetStartedButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: #009de2;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }

  svg {
    margin-left: 4px;
    font-size: 12px;
  }
`

const DropdownSection = styled.div`
  padding: 8px 0;
  border-bottom: 1px solid #e5e5e5;

  &:last-child {
    border-bottom: none;
  }
`

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  text-decoration: none;
  color: #333;
  font-size: 14px;

  &:hover {
    background-color: #f8f9fa;
  }

  svg {
    margin-right: 12px;
    font-size: 18px;
    color: #666;
  }
`

const GlobalNavigation = ({ toggleSidebar }) => {
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const helpDropdownRef = useRef(null)
  const userInitials = 'RH'

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (helpDropdownRef.current && !helpDropdownRef.current.contains(event.target)) {
        setIsHelpOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <NavContainer aria-label="Global Navigation">
      <LeftSection>
        <MenuButton aria-haspopup="true" title="Menu" onClick={toggleSidebar}>
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

        <HelpDropdownContainer ref={helpDropdownRef}>
          <IconButton
            title="Help"
            onClick={() => setIsHelpOpen(!isHelpOpen)}
            aria-expanded={isHelpOpen}
          >
            <IoMdHelpCircle />
          </IconButton>

          <DropdownContent isOpen={isHelpOpen}>
            <QuickStartSection>
              <QuickStartTitle>QUICK START</QuickStartTitle>
              <QuickStartDescription>
                Learn about the benefits of starting with an API specification as well as the ways
                you can leverage the spec within Anypoint Platform.
              </QuickStartDescription>
              <GetStartedButton to="/quick-start">
                Get started <FaChevronDown />
              </GetStartedButton>
            </QuickStartSection>

            <DropdownSection>
              <DropdownItem to="/design-center">
                <BsBook /> About Design Center
              </DropdownItem>
              <DropdownItem to="/release-notes">
                <VscBook /> Design Center Release Notes
              </DropdownItem>
              <DropdownItem to="/upload-spec">
                <BsQuestionCircle /> Upload an API Specification Created Outside of API Designer
              </DropdownItem>
            </DropdownSection>

            <DropdownSection>
              <DropdownItem to="/documentation">
                <VscBook /> Documentation
              </DropdownItem>
              <DropdownItem to="/forums">
                <FiMessageSquare /> Forums
              </DropdownItem>
              <DropdownItem to="/help-center">
                <BiSupport /> Help Center
              </DropdownItem>
              <DropdownItem to="/training">
                <BsBook /> Training
              </DropdownItem>
              <DropdownItem to="/tutorials">
                <VscBook /> Tutorials
              </DropdownItem>
            </DropdownSection>
          </DropdownContent>
        </HelpDropdownContainer>

        {/* <IconButton title="Updates">
          <MdOutlineUpdate />
        </IconButton>
        
        <ProfileCircle title="Profile">
          {userInitials}
        </ProfileCircle> */}
      </RightSection>
    </NavContainer>
  )
}

export default GlobalNavigation
