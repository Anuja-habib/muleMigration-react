import styled from 'styled-components'

const FooterWrapper = styled.footer`
  width: 100%;
  padding: 20px 0;
  text-align: left;
  flex-shrink: 0;
  margin-top: auto;
  background-color: white;
  font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  color: #666;
  font-size: 14px;
`

function SimpleFooter() {
  return (
    <FooterWrapper>
      <FooterContent>© 2025 MuleSoft GDC India. All rights reserved.</FooterContent>
    </FooterWrapper>
  )
}

export default SimpleFooter
