import React from 'react'
import styled from 'styled-components'
import bannerImage from '../assets/agentforce-agent-astro.avif'

const BannerContainer = styled.div`
  width: 100%;
  height: 180px;
  background: linear-gradient(90deg, #4a46cc 0%, #0b1b42 100%);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 140px;
  }
`

const BackgroundGraphics = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 60%;
  background-image: url("data:image/svg+xml,%3Csvg width='800' height='400' viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,400 C150,300 350,300 500,400 C650,300 750,300 800,400 L800,0 L0,0 L0,400 Z' fill='rgba(255,255,255,0.05)'/%3E%3C/svg%3E");
  background-size: cover;
  opacity: 0.2;

  @media (max-width: 768px) {
    display: none;
  }
`

const AstroImageContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 200px;
  background-image: url(${bannerImage});
  background-size: contain;
  background-position: left center;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    display: none; // Hide on mobile like Anypoint does with decorative elements
  }
`

const BannerContent = styled.div`
  position: absolute;
  left: 220px; // Make space for the Astro image
  top: 0;
  width: calc(100% - 220px);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 72px;
  color: white;

  @media (max-width: 992px) {
    padding-right: 40px;
  }

  @media (max-width: 768px) {
    left: 0;
    width: 100%;
    padding: 0 24px;
    align-items: center;
    text-align: center;
    height: auto; // Fix height to auto on small screens
  }
`

const BannerTitle = styled.h1`
  font-size: 42px;
  font-weight: 500;
  margin: 0 0 12px 0;
  line-height: 1.2;

  @media (max-width: 992px) {
    font-size: 36px;
  }

  @media (max-width: 768px) {
    font-size: 28px;
  }
`

const BannerText = styled.p`
  font-size: 18px;
  font-weight: 400;
  opacity: 0.9;
  margin: 0;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`

// Create decorative elements like in the Anypoint Platform
const Dot = styled.div`
  position: absolute;
  width: ${(props) => props.size || '12px'};
  height: ${(props) => props.size || '12px'};
  border-radius: 50%;
  background-color: ${(props) => props.color || 'rgba(255, 255, 255, 0.3)'};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};

  @media (max-width: 768px) {
    display: none;
  }
`

const Star = styled.div`
  position: absolute;
  width: ${(props) => props.size || '16px'};
  height: ${(props) => props.size || '16px'};
  transform: rotate(45deg);
  background-color: ${(props) => props.color || 'rgba(255, 255, 255, 0.3)'};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};

  @media (max-width: 768px) {
    display: none;
  }
`

export const Banner = () => {
  return (
    <BannerContainer>
      <BackgroundGraphics />
      <AstroImageContainer />

      {/* Decorative elements */}
      <Dot size="16px" top="20%" right="30%" color="rgba(102, 204, 255, 0.5)" />
      <Dot size="24px" bottom="20%" right="15%" color="rgba(180, 180, 255, 0.4)" />
      <Star size="12px" top="40%" right="20%" color="rgba(255, 255, 255, 0.4)" />
      <Star size="8px" top="25%" right="40%" color="rgba(255, 255, 255, 0.3)" />

      <BannerContent>
        <BannerTitle>Supercharge Your MuleSoft Migration Journey</BannerTitle>
        <BannerText>
          Save time and reduce complexity with our purpose-built accelerators to build faster,
          migrate smarter, deliver sooner
        </BannerText>
      </BannerContent>
    </BannerContainer>
  )
}

export const SmallBanner = ({ title, subtitle }) => {
  return (
    <BannerContainer style={{ height: '140px' }}>
      <BackgroundGraphics />
      <BannerContent
        style={{
          left: '0',
          width: '100%',
          textAlign: 'center',
          alignItems: 'center',
          padding: '0 24px',
        }}
      >
        <BannerTitle style={{ fontSize: '32px' }}>{title}</BannerTitle>
        <BannerText>{subtitle}</BannerText>
      </BannerContent>
    </BannerContainer>
  )
}
