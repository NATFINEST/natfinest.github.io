import React from "react"
import styled from "styled-components"

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinksWrapper>
        <FooterDescription>
          <h1>BetaTravel</h1>
          <p>We strive to create the best experiences for our customers</p>
        </FooterDescription>
        <FooterLinksItems>
          <FooterLinkTitle>Contact Us</FooterLinkTitle>
          <FooterLink to="/about">Contact</FooterLink>
          <FooterLink to="/about">Destination</FooterLink>
          <FooterLink to="/about">Support</FooterLink>
          <FooterLink to="/about">Sponsorship</FooterLink>
        </FooterLinksItems>
      </FooterLinksWrapper>
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.div``
const FooterLinksWrapper = styled.div``
const FooterDescription = styled.div``
const FooterLinkTitle = styled.div``
const FooterLink = styled.div``
