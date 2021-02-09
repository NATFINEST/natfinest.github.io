import React from "react"
import styled from "styled-components"
import { GiEarthAmeria } from "react-icons/gi"
import { MdAirplaneModeActive, MdTimer } from "react-icons/md"
import { FdMoneyCheck } from "react-icons/fa"

const Stats = () => {
  const StatsData = [
    {
      icon: <GiEarthAmeria />,
      title: "Over 100 Destinations",
      desc: "Travel to over 100 unique places",
    },
    {
      icon: <MdAirplaneModeActive />,
      title: "1 Million Trips Made",
      desc: "Over 1 Million trips completed last year",
    },
    {
      icon: <MdTimer />,
      title: "Fastest Support",
      desc: "Access our support team 24/7",
    },
    {
      icon: <FdMoneyCheck />,
      title: "Best Deals",
      desc: "We offer the best prices",
    },
  ]
  return (
    <StatsContainer>
      <Heading>Why Choose Us?</Heading>
      <Wrapper>
        {StatsData.map((item, index) => (
          <StatsBox key={index}>
            <Icon>{item.icon}</Icon>
            <Title>{item.title}</Title>
            <Description>{item.desc}</Description>
          </StatsBox>
        ))}
      </Wrapper>
    </StatsContainer>
  )
}

const StatsContainer = styled.div`
  width: 100%;
  background: #fff;
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem calc((100vw - 1300px) / 2);
`
const Heading = styled.div`
  text-align: start;
  font-size: clamp(1.5rem, 5vw, 2rem);
  margin-bottom: 3rem;
  padding: 0 2rem;
`
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media screen and (max-width: 760px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`

const StatsBox = styled.div`
  height: 100%;
  width: 100%;
  padding: 2rem;
`

const Icon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`

const Title = styled.div`
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  margin-bottom: 0.5rem;
`

const Description = styled.div``
