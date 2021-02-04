import React from "react";
import styled from "styled-components";
import { servicesData } from "../../data/ServicesData";
import { themes } from "../styles/ColorStyles";

export default function AboutSection(props) {
  const { id } = props;

  return (
    <Wrapper id={id}>
      <ContentWrapper>
        <ServiceWrapper>
          <Caption>Services</Caption>
          <Title>My Services</Title>
          <HR />
          <ServiceList>
            {servicesData.map((item, index) => (
              <ServiceItemWrapper>
                <ServiceItem key={index}>
                  <img src={item.image} />
                  <ServiceNumber>0{index + 1}</ServiceNumber>
                  <ServiceTitle>{item.title}:</ServiceTitle>
                  <ServiceValue>{item.description}</ServiceValue>
                </ServiceItem>
                <Icon>
                  <i className={item.icon}></i>
                </Icon>
                <IconRing></IconRing>
              </ServiceItemWrapper>
            ))}
          </ServiceList>
        </ServiceWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: ${themes.tetiary.light};
  color: black;
`;
const ContentWrapper = styled.div`
  padding: 80px 10px;
  max-width: 1234px;
  display: grid;
  justify-content: space-between;
  margin: 0 auto;
  gap: 30px;
  align-items: center;
  width: 100%;

  @media (max-width: 996px) {
    grid-template-columns: auto;
    gap: 10px;
    justify-content: center;
    text-align: center;
    margin: 0 auto;
    padding: 50px 40px;
  }
`;
const ServiceWrapper = styled.div`
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
  @media (max-width: 996px) {
  }
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
`;

const ServiceList = styled.div`
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

const ServiceItemWrapper = styled.div`
  position: relative;

  * {
    transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
`;

const ServiceItem = styled.div`
  background: ${themes.tetiary.main};
  color: ${themes.tetiary.text};
  border-radius: 30px;
  box-shadow: 0 10px 50px 0 rgb(215 201 255);
  padding: 50px 40px;
  display: grid;
  gap: 10px;
  position: relative;
  z-index: 2;

  img {
    width: 100%;
    position: absolute;
    opacity: 0;
    height: 100%;
    object-fit: cover;
    border-radius: 29px;

    ${ServiceItemWrapper}:hover & {
      opacity: 0.3;
    }
  }

  @media (max-width: 996px) {
    padding: 50px 30px;
  }

  ${ServiceItemWrapper}:hover & {
    background: ${themes.tetiary.text};
    color: ${themes.primary.text};
    opacity: 1;
  }
`;

const ServiceNumber = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: ${themes.primary.main};
  padding: 0 0 20px;

  ${ServiceItemWrapper}:hover & {
    color: ${themes.tetiary.main};
  }
`;

const ServiceTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const ServiceValue = styled.div`
  font-size: 16px;
  opacity: 0.5;
  padding: 0 0 7px;

  ${ServiceItemWrapper}:hover & {
    opacity: 0.7;
  }
`;
const HR = styled.div`
  background: ${themes.primary.light};
  width: 50px;
  height: 5px;
  margin: 0 auto;
`;
const Icon = styled.div`
  max-width: max-content;
  left: 50%;
  bottom: -26px;
  position: absolute;
  z-index: 2;
  margin-left: -6px;
  background: ${themes.primary.main};
  color: ${themes.primary.text};
  padding: 14px 17px;
  border-radius: 50%;
  margin-left: -21px;

  ${ServiceItemWrapper}:hover & {
    background: ${themes.primary.text};
    color: ${themes.primary.main};
  }
`;
const IconRing = styled.div`
  position: absolute;
  margin-left: -30px;
  bottom: 0px;
  left: 50%;
  bottom: -15px;
  z-index: 1;

  ::before {
    content: "";
    border: 2px solid ${themes.primary.main};
    padding: 20px 32px;
    border-radius: 50%;

    ${ServiceItemWrapper}:hover & {
      border-color: ${themes.tetiary.text};
    }
  }

  ::after {
    content: "";
    border: 2px solid ${themes.primary.main};
    padding: 40px;
    border-radius: 50%;
    left: -8px;
    top: -29px;
    position: absolute;

    ${ServiceItemWrapper}:hover & {
      border-color: ${themes.tetiary.text};
    }
  }
`;
