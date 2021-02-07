import React from "react";
import styled from "styled-components";
import Button from "../buttons/Button";
import { Ring } from "../ring/Ring";
import { themes } from "../styles/ColorStyles";
import { DarkWrapper } from "../wrappers/Wrapper";
import { ContentWrapper } from "../wrappers/ContentWrapper";
import { Link as LinkTo } from "react-scroll";

export default function HeroSection(props) {
  const { id } = props;

  return (
    <DarkWrapper id={id}>
      <HeroWrapper>
        <TextWrapper>
          <Title>
            I'm <br /> Odukpahie Nathanael
          </Title>
          <Description>
            Always new beginnings can move the business forward. A user
            experience is required before service. Now is a great opportunity to
            work with me and move your brand forward.
          </Description>
          <LinkTo
            activeClass="active"
            to="Portfolio"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            <WorksButton title="View Works" />
          </LinkTo>
        </TextWrapper>

        <ImageWrapper>
          <Image>
            <Ring>
              <Ring>
                <img src="/images/frontend.jpg" alt="hero" />
              </Ring>
            </Ring>
          </Image>
        </ImageWrapper>
      </HeroWrapper>
    </DarkWrapper>
  );
}

const HeroWrapper = styled(ContentWrapper)`
  @media (min-width: 996px) {
    grid-template-columns: auto auto;
  }
  gap: 20px;
`;

const TextWrapper = styled.div`
  display: grid;
  gap: 40px;

  @media (max-width: 996px) {
    a {
      margin: 0 auto;
    }
  }
`;

const Title = styled.h1`
  font-size: 55px;
  font-weight: bold;
  line-height: 60px;
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: normal;
  line-height: 30px;
`;

const WorksButton = styled(Button)``;

const ImageWrapper = styled.div`
  margin: 0 auto;
`;

const Image = styled.div`
  position: relative;
  width: 450px;

  img {
    border-radius: 50%;
    border: 10px solid ${themes.primary.light};
    max-width: 100%;
    height: auto;
  }

  @media (max-width: 996px) {
    width: 350px;
    height: 350px;
  }
`;
