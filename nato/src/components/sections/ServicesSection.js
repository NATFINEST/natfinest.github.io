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
          <Title>My Service</Title>
          <HR />
          <ServiceList>
            {servicesData.map((item, index) => (
              <ServiceItem key={index}>
                <ServiceNumber>0{index + 1}</ServiceNumber>
                <ServiceTitle>{item.title}:</ServiceTitle>
                <ServiceValue>{item.description}</ServiceValue>
              </ServiceItem>
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
    padding: 50px 10px;
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
  grid-template-columns: auto auto auto;
  gap: 30px;
  padding: 10px 0;
`;
const ServiceNumber = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: ${themes.primary.main};
  padding: 0 0 20px;
`;

const ServiceItem = styled.div`
  background: ${themes.tetiary.main};
  border-radius: 30px;
  box-shadow: 0 15px 30px 0 rgb(215 201 255);
  padding: 30px;
  display: grid;
  gap: 10px;
`;
const ServiceTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
const ServiceValue = styled.div`
  font-size: 16px;
  opacity: 0.5;
  padding: 0 0 7px;
`;
const HR = styled.div`
  background: ${themes.primary.light};
  width: 50px;
  height: 5px;
  margin: 0 auto;
`;
