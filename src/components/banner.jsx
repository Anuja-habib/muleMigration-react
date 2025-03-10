import React from 'react';
import styled from 'styled-components';
import  bannerImage from "../assets/agentforce-agent-astro.avif"

const BannerImageContainer =styled.div`
background-image: url(${bannerImage});
  width: 27%;
  height: 100%; // Adjust height as needed
  left: 5%;
  position: absolute;
  justify-content: left; 
  background-repeat: no-repeat;
`
const BannerContainer = styled.div`
    
width: 100%;
  height: 400px; // Adjust height as needed
  background: background: rgb(250,250,250);
  background: linear-gradient(90deg, rgba(250,250,250,1) 0%, rgba(199,197,214,1) 0%, rgba(185,200,214,1) 0%, rgba(102,8,214,1) 56%, rgba(30,152,243,1) 100%, rgba(50,113,235,1) 100%, rgba(44,125,237,1) 100%, rgba(0,212,255,1) 100%);
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column; // Align items vertically
  justify-content: center; // Center content vertically
  align-items: center;   // Center content horizontally
  color: white; // Text color
  text-align: center; // Center text horizontally

  /* Add any overlay or other styles here */
  position: relative; // For positioning overlay if needed

  
  }
`;

const BannerContent = styled.div`
  left: 15%;
  padding: 20px;
  position: relative;

  h1 {
    font-size: 3rem; // Adjust font size
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2rem; // Adjust font size
    margin-bottom: 20px;
    line-height: 1.5; // Improve readability
    max-width: 800px; // Limit text width for better readability on large screens
  }
`;
const SmallBannerContent = styled.div`

  padding: 20px;
  position: relative;

  h1 {
    font-size: 3rem; // Adjust font size
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2rem; // Adjust font size
    margin-bottom: 20px;
    line-height: 1.5; // Improve readability
    max-width: 800px; // Limit text width for better readability on large screens
  }
`;
const SmallBannerContainer = styled.div`
    
width: 100%;
  height: 200px; // Adjust height as needed
  background: background: rgb(250,250,250);
  background: linear-gradient(90deg, rgba(250,250,250,1) 0%, rgba(199,197,214,1) 0%, rgba(185,200,214,1) 0%, rgba(102,8,214,1) 56%, rgba(30,152,243,1) 100%, rgba(50,113,235,1) 100%, rgba(44,125,237,1) 100%, rgba(0,212,255,1) 100%);
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column; // Align items vertically
  justify-content: center; // Center content vertically
  align-items: center;   // Center content horizontally
  color: white; // Text color
  text-align: center; // Center text horizontally

  /* Add any overlay or other styles here */
  position: relative; // For positioning overlay if needed

  
  }
`;



export const Banner = () => {
  return (
    <BannerContainer>
         <BannerImageContainer />
      <BannerContent>
       
        <h1>Welcome to MuleSoft Migration Accelerator</h1>
        <p>This is a short, descriptive tagline for your website.  You can add more text here to explain what your site is about or what you offer.</p>
      </BannerContent>
    </BannerContainer>
  );
};



export const SmallBanner = ({heading,info}) => {
  return (
    <SmallBannerContainer>
      <SmallBannerContent>
        <h1>{heading}</h1>
        <p>{info}</p>
      </SmallBannerContent>
    </SmallBannerContainer>
  );
};


