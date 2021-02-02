import React from "react"
import styled from "styled-components"
import { themes } from "../styles/ColorStyles"
import { Ring } from "../ring/Ring"

export default function Button(props) {
  const { title, primary, secondary, icon } = props

  return (
    <Wrapper>
      {/* <Link to={link}> */}
      <ButtonWrapper primary={primary} secondary={secondary}>
        <MainButton title={title}>{title}</MainButton>
        <SecondaryButton>
          <Ring2>
            <Icon>
              <i className={icon ? icon : "fa fa-arrow-right"}></i>
            </Icon>
          </Ring2>
        </SecondaryButton>
      </ButtonWrapper>
      {/* </Link> */}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  @media (max-width: 996px) {
    margin: 0 auto;
  }
`

const ButtonWrapper = styled.div`
  background: ${props => (props.primary ? props.primary : themes.primary.main)};
  color: ${themes.primary.text};
  border-radius: 50px;
  width: max-content;
  display: grid;
  grid-template-columns: auto 55px;
  align-items: center;
  text-transform: uppercase;
  cursor: pointer;

  *,
  & {
    transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  :hover {
    color: ${props => (props.primary ? props.primary : themes.primary.main)};
    background: ${props =>
      props.secondary ? props.secondary : themes.primary.text};
  }
`

const MainButton = styled.div`
  padding: ${props => (props.title ? "0 20px" : "0")};
`

const SecondaryButton = styled.div``

const Ring2 = styled(Ring)`
  padding: 4px;

  ${ButtonWrapper}:hover & {
    border: 2px solid
      ${props => (props.secondary ? props.secondary : themes.primary.main)};
  }
`

const Icon = styled.div`
  background: ${themes.primary.text};
  color: ${themes.primary.main};
  border-radius: 50%;
  border: 10px solid ${themes.primary.text};
  text-align: center;

  ${ButtonWrapper}:hover & {
    background: ${themes.primary.main};
    border: 10px solid ${themes.primary.main};
    color: ${themes.primary.text};
  }
`
