import React from 'react'
import styled from 'styled-components'
// import FooterLogo from "../assets/muleSmallLogo.png"

const FooterContainer = styled.div`
  width: 100%;
  background: linear-gradient(90deg, #6561e0 0%, #1c2c5c 100%);
  padding: 16px 0;
  margin-top: auto;
`

const FooterContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  color: white;
  font-size: 14px;
  opacity: 0.9;
  padding: 0 24px;
`

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        © Copyright 2024 MuleSoft GDC India. All rights reserved. Various trademarks held by their
        respective owners. MuleSoft, a Salesforce company.
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer
