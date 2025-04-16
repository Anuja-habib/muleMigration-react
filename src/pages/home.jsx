// Updated home.jsx with improved footer styling
import React from "react";
// import { Banner } from "../components/Banner";
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
  flex: 1 0 auto;
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
  gap: 24px;
  height: 100%;
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

const FooterWrapper = styled.footer`
  width: 100%;
  background-color: #eef4ff;
  padding: 20px 0;
  text-align: left;
  flex-shrink: 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  color: #666;
  font-size: 14px;
`;

const newFeatures = [
  {
    title: "DataWeave Script Generator",
    path: "/mapping-tools/dwl-generator",
    icon: <RiAiGenerate />,
  }
];

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
      title: "IIB Migration Dashboard",
      path: "/migration-tools/tibco",
      icon: <RiAiGenerate2 />,
      description: "Visualize and plan your IIB migration journey"
    }
  ];

  const SimpleFooter = () => (
    <FooterWrapper>
      <FooterContent>
        © 2025 MuleSoft GDC India. All rights reserved.
      </FooterContent>
    </FooterWrapper>
  );

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
              
              <MainTools>
                {migrationTools.map((tool, index) => (
                  <ToolLink to={tool.path} key={index}>
                    <ToolIconContainer>
                      {tool.icon}
                    </ToolIconContainer>
                    <ToolContent>
                      <ToolTitle>{tool.title}</ToolTitle>
                    </ToolContent>
                  </ToolLink>
                ))}
              </MainTools>
            </SectionContainer>

            <SectionContainer>
              <SectionHeader>
                <FaIcons.FaCode />
                <span>New Feature</span>
              </SectionHeader>
              
              <MainTools>
                {newFeatures.map((tool, index) => (
                  <ToolLink to={tool.path} key={index}>
                    <ToolIconContainer>
                      {tool.icon}
                    </ToolIconContainer>
                    <ToolContent>
                      <ToolTitle>{tool.title}</ToolTitle>
                    </ToolContent>
                  </ToolLink>
                ))}
              </MainTools>
            </SectionContainer>
          </RightColumn>
        </ContentContainer>
      </ContentSection>
      
      {/* Simplified footer section */}
      <SimpleFooter />
    </PageContainer>
  );
};

export default Home;