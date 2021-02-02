import React from "react"
import styled from "styled-components"
import Button from "../buttons/Button"
import { Ring } from "../ring/Ring"
import { themes } from "../styles/ColorStyles"

export default function HeroSection(props) {
  const { id } = props

  return (
    <Wrapper id={id}>
      <ContentWrapper>
        <TextWrapper>
          <Title>
            I'm <br /> Odukpahie Nathanael
          </Title>
          <Description>
            Always new beginnings can move the business forward.A user
            experience is required before service. Now is a great opportunity to
            work with me and move your brand forward.
          </Description>
          <WorksButton title="View More" link="/" />
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
      </ContentWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: black;
  color: white;
`
const ContentWrapper = styled.div`
  padding: 80px 10px;
  max-width: 1234px;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  margin: 0 auto;
  gap: 120px;

  @media (max-width: 996px) {
    grid-template-columns: auto;
    gap: 60px;
    justify-content: center;
    text-align: center;
    margin: 0 auto;
    padding: 50px 10px;
  }
`
const TextWrapper = styled.div`
  display: grid;
  gap: 0px;
`

const Title = styled.h1`
  font-size: 55px;
  font-weight: bold;
  line-height: 60px;
`

const Description = styled.p`
  font-size: 16px;
  font-weight: normal;
  line-height: 30px;
`

const WorksButton = styled(Button)``

const ImageWrapper = styled.div`
  margin: 0 auto;
`

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
`
