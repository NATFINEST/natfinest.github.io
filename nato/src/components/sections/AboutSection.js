import React from "react";
import styled from "styled-components";
import { bioData } from "../../data/BioData";
import Button from "../buttons/Button";
import { themes } from "../styles/ColorStyles";
import { WhiteWrapper } from "../wrappers/Wrapper";
import { ContentWrapper } from "../wrappers/ContentWrapper";

export default function AboutSection(props) {
  const { id } = props;

  return (
    <WhiteWrapper id={id}>
      <ContentWrapper>
        <ImageWrapper>
          <Image>
            <img src="/images/nato.jpg" alt="hero" />
          </Image>
        </ImageWrapper>
        <TextWrapper>
          <Caption>About Me</Caption>
          <Title>I am here with 10 years of user experience</Title>
          <Description>
            I prevent your loss of time and indecision in the works I have taken
            and the projects I have done and offer the best solution. Many of my
            customers and brands express their satisfaction with working with
            me.We can appeal to a huge audience and grow your business.
          </Description>
          <BioList>
            {bioData.map((item, index) => (
              <BioItem key={index}>
                <BioTitle>{item.title}:</BioTitle>
                <BioValue>{item.value}</BioValue>
              </BioItem>
            ))}
          </BioList>
          <CVButton
            title="Download CV"
            link="/"
            icon="fa fa-download"
            primary={themes.primary.light}
            secondary={themes.tetiary.text}
          />
        </TextWrapper>
      </ContentWrapper>
    </WhiteWrapper>
  );
}

const TextWrapper = styled.div`
  display: grid;
  align-items: center;
  gap: 20px;
`;

const Caption = styled.h2`
  font-size: 16px;
  font-weight: normal;
  background: ${themes.primary.light};
  color: ${themes.primary.text};
  width: max-content;
  border-radius: 50px;
  padding: 10px 20px;
  @media (max-width: 996px) {
    margin: 0 auto;
  }
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: lighter;
`;

const ImageWrapper = styled.div`
  margin: 0 auto;
`;

const BioList = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 30px;
`;
const BioItem = styled.div``;
const BioTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
const BioValue = styled.div`
  font-size: 16px;
  opacity: 0.5;
  padding: 0 0 7px;
`;

const CVButton = styled(Button)``;

const Image = styled.div`
  position: relative;
  width: 450px;

  img {
    border-radius: 50px;
    border: 20px solid ${themes.primary.light};
    max-width: 100%;
    height: auto;
  }

  @media (max-width: 996px) {
    width: 350px;
    height: 350px;
  }
`;
