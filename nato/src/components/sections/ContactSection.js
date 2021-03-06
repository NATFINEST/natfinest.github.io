import React from "react";
import styled from "styled-components";
import { portfolioData } from "../../data/PortfolioData";
import { Ring } from "../ring/Ring";
import { themes } from "../styles/ColorStyles";
import { WhiteWrapper } from "../wrappers/Wrapper";
import { ContentWrapper } from "../wrappers/ContentWrapper";
import Button from "../buttons/Button";

export default function PortfolioSection(props) {
  const { id } = props;

  return (
    <WhiteWrapper id={id}>
      <ContentWrapper>
        <ContactWrapper>
          <Caption>Contact Me</Caption>
          <Title>Contact Us</Title>
          <HR />
        </ContactWrapper>
      </ContentWrapper>
    </WhiteWrapper>
  );
}

const ContactWrapper = styled.div`
  display: grid;
  align-items: center;
  gap: 25px;
  text-align: center;
`;

const Caption = styled.h2`
  font-size: 16px;
  font-weight: normal;
  background: ${themes.primary.light};
  color: ${themes.primary.text};
  width: max-content;
  border-radius: 50px;
  padding: 10px 20px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

const HR = styled.div`
  background: ${themes.primary.light};
  width: 50px;
  height: 5px;
  position: relative;
  margin: 0 auto;
`;

const PortfolioList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  gap: 40px;
  padding: 10px 0;

  @media (max-width: 996px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 60px;
  }

  @media (max-width: 759px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 80px;
  }
`;

const PortfolioItem = styled.div`
  background: ${themes.primary.text};
  border-radius: 30px;
  position: relative;
`;

const PortfolioImage = styled.div`
  background: none;
  border-radius: 30px;

  img {
    width: 100%;
    border-radius: 30px;
    display: block;

    :hover {
      opacity: 0.6;
    }
  }

  :hover {
    background: ${themes.tetiary.text};
  }
`;

const Search = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -55px;
  margin-top: -112px;
  opacity: 0;

  i {
    background: white;
    padding: 30px;
    border-radius: 50%;
    font-size: 24px;
  }

  ${PortfolioImage}:hover & {
    opacity: 1;

    :parent {
      background: red;
    }
  }
`;

const SearchRing = styled(Ring)`
  padding: 7px;
`;

const PortfolioDetail = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: auto auto;
  padding: 20px;
`;

const Info = styled.div`
  display: grid;
  text-align: left;
  font-weight: bold;
  gap: 10px;

  h4 {
    text-transform: uppercase;
    font-size: 14px;
    color: ${themes.primary.main};
  }

  h1 {
    font-size: 24px;
  }
`;

const ViewButton = styled(Button)`
  padding: 30px;
`;
