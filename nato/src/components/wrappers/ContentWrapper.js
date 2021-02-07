import styled from "styled-components";
export const ContentWrapper = styled.div`
  padding: 80px 70px;
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
