import React from "react"
import styled from "styled-components"
import { Button } from "../Button"
import Video from "../../assets/videos/video2.mp4"

const Hero = () => {
  return (
    <HeroContainer>
      <HeroBg>
        <VideoBg src={Video} type="video/mp4" autoPlay loop muted playsInline />
      </HeroBg>
      <HeroContent>
        <HeroItems>
          <h1>Unreal Destination</h1>
          <p>Out of this world</p>
          <Button primary="true" big="true" round="true" to="/trips">
            Travel Now!
          </Button>
        </HeroItems>
      </HeroContent>
    </HeroContainer>
  )
}

export default Hero

const HeroContainer = styled.div`
  background: #0c0c0c;
  display: grid;
  justify-content: center;
  color: #ffffff;
  align-items: center;
  padding: 0 1rem;
  position: relative;
  margin-top: -80px;
  height: 100vh;

  :before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0.4) 100%
      ),
      linear-gradient(100deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%);
  }
`
const HeroBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const VideoBg = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const HeroContent = styled.div`
  z-index: 3;
  height: calc(100vh - 80px);
  max-height: 100%;
  padding: 0 calc((100vw - 1300px) / 2);
`

const HeroItems = styled.div`
  display: grid;
  gap: 40px;
  justify-content: center;
  align-content: center;
  text-align: center;
  height: 100%;
  max-height: 100vh;
  padding: 0;
  color: #fff;
  line-height: 1.1;
  font-weight: bold;
  margin: 0 auto;

  h1 {
    font-size: clamp(1.5rem, 6vw, 4rem);
    letter-spacing: 2px;
    font-weight: bold;
    padding: 0 1rem;
  }

  p {
    font-size: clamp(1rem, 3vw, 3rem);
    font-weight: 400;
  }
`
