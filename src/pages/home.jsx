// Updated home.jsx with improved footer styling
import React from "react";
import { Banner } from "../components/banner";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { RiAiGenerate, RiAiGenerate2 } from "react-icons/ri";
import { TbTools } from "react-icons/tb";
import { GiProcessor } from "react-icons/gi";
import { VscDashboard, VscServerProcess } from "react-icons/vsc";
import Footer from "../components/Footer";
import { MdFeaturedPlayList } from "react-icons/md";
import { IoMdTrendingUp } from "react-icons/io";
import styled from "styled-components";
import imgDiv from "../assets/backgroundImage.webp";

// Main container
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

// Two-column layout like Anypoint Platform
const ContentSection = styled.section`
  padding: 40px 16px;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

// Card components
const SectionContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const SectionHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
  
  svg {
    color: #009de2;
    font-size: 20px;
    margin-right: 8px;
  }
  
  span {
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }
`;

const MainTools = styled.div`
  padding: 0;
`;

const ToolLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 20px;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const ToolIconContainer = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  
  svg {
    font-size: 24px;
    color: #009de2;
  }
`;

const ToolContent = styled.div`
  flex: 1;
`;

const ToolTitle = styled.span`
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
`;

const ToolDescription = styled.span`
  display: block;
  font-size: 14px;
  color: #666;
`;

const RightToolsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const RightToolItem = styled.li`
  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }
`;

const RightToolLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f8f9fa;
  }
  
  svg {
    font-size: 20px;
    color: #009de2;
    margin-right: 12px;
  }
`;

// Improved footer styling
const FooterSection = styled.section`
  width: 100%;
  background-color: white;
  border-top: 1px solid #e5e5e5;
  margin-top: 40px;
`;

const FooterImageContainer = styled.div`
  width: 100%;
  position: relative;
  background: white;
  overflow: hidden;
  height: 240px;
  
  @media (max-width: 768px) {
    height: 180px;
  }
`;

const FooterImageBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${imgDiv});
  background-size: cover;
  background-position: center;
  opacity: 1; // Increased opacity for better visibility
`;

const FooterImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0.3)); // Lighter overlay
`;

const FooterImageText = styled.div`
  font-size: 42px;
  font-weight: bold;
  color: #032d60;
  text-shadow: 2px 2px 3px rgba(255,255,255,0.7);
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const FooterContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 16px;
  border-top: 1px solid #e5e5e5;
`;

const Home = () => {
  // Featured tools with descriptions
  const featuredTools = [
    {
      title: "RAML Example Generator",
      path: "/raml-tools/example-generator",
      icon: <RiAiGenerate />,
      description: "Generate example data based on your RAML specifications"
    },
    {
      title: "WSDL to RAML Generator",
      path: "/raml-tools/wsdl-to-raml",
      icon: <RiAiGenerate />,
      description: "Convert WSDL files to RAML API specifications"
    },
    {
      title: "XSLT Mapping Extractor",
      path: "/mapping-tools/xslt-mapping-extractor",
      icon: <VscServerProcess />,
      description: "Extract and analyze XSLT mappings for migration"
    }
    
  ];
  
  // Migration tools for right column
  const migrationTools = [
    {
      title: "Tibco Migration Dashboard",
      path: "/migration-tools/tibco",
      icon: <VscDashboard />,
      description: "Visualize and plan your TIBCO migration journey"
    },
    {
      title: "Generate",
      path: "/generate",
      icon: <RiAiGenerate2 />
    }
  ];

  return (
    <PageContainer>
      <Banner />
      
      <ContentSection>
        <ContentContainer>
          {/* Left Column - Featured Tools */}
          <LeftColumn>
            <SectionContainer>
              <SectionHeader>
                <MdFeaturedPlayList />
                <span>Trending Features</span>
              </SectionHeader>
              
              <MainTools>
                {featuredTools.map((tool, index) => (
                  <ToolLink to={tool.path} key={index}>
                    <ToolIconContainer>
                      {tool.icon}
                    </ToolIconContainer>
                    <ToolContent>
                      <ToolTitle>{tool.title}</ToolTitle>
                      <ToolDescription>{tool.description}</ToolDescription>
                    </ToolContent>
                  </ToolLink>
                ))}
              </MainTools>
            </SectionContainer>
          </LeftColumn>
          
          {/* Right Column - Migration Tools */}
          <RightColumn>
            <SectionContainer>
              <SectionHeader>
                <IoMdTrendingUp />
                <span>Migration Tools</span>
              </SectionHeader>
              
              <RightToolsList>
                {migrationTools.map((tool, index) => (
                  <RightToolItem key={index}>
                    <RightToolLink to={tool.path}>
                      {tool.icon}
                      <span>{tool.title}</span>
                    </RightToolLink>
                  </RightToolItem>
                ))}
              </RightToolsList>
            </SectionContainer>
          </RightColumn>
        </ContentContainer>
      </ContentSection>
      
      {/* Improved footer section */}
      <FooterSection>
        <FooterImageContainer>
          <FooterImageBackground />
          <FooterImageOverlay>
            <FooterImageText>Welcome</FooterImageText>
          </FooterImageOverlay>
        </FooterImageContainer>
        
        <FooterContentContainer>
          <Footer />
        </FooterContentContainer>
      </FooterSection>
    </PageContainer>
  );
};

export default Home;