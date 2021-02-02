import { Link as LinkTo } from "react-scroll"
import React, { useState, useLayoutEffect } from "react"
import styled from "styled-components"
import { menuData } from "../../data/MenuData"
import Button from "../buttons/Button"
import { themes } from "../styles/ColorStyles"

export default function Header() {
  const [scrollPosition, setPosition] = useState(0)

  useLayoutEffect(() => {
    function updatePosition() {
      setPosition(window.pageYOffset)
    }
    window.addEventListener("scroll", updatePosition)
    updatePosition()
    return () => window.removeEventListener("scroll", updatePosition)
  }, [])

  return (
    <Wrapper
      position={scrollPosition > 100 ? "fixed" : "relative"}
      left={scrollPosition > 100 ? "calc(50vw - 615px)" : 0}
    >
      <ContentWrapper>
        <LogoWrapper>
          <img src="/images/logo/logo_transparent.png" alt="Natfinest" />
        </LogoWrapper>
        <MenuWrapper count={menuData.length + 1}>
          {menuData.map((item, index) => (
            <LinkTo
              activeClass="active"
              to={item.title}
              key={index}
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
            >
              <MenuItem>{item.title}</MenuItem>
            </LinkTo>
          ))}
          <HireButton title="Hire Me" link="/hire" />
        </MenuWrapper>
      </ContentWrapper>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background: ${themes.primary.main};
  color: ${themes.primary.text};
  position: ${props => props.position};
  width: 100%;
  z-index: 1;
`

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1234px;
  display: grid;
  grid-template-columns: 150px auto;
  justify-content: space-between;
  margin: 0 auto;
  align-items: center;
  padding: 10px;
`
const LogoWrapper = styled.div`
  img {
    height: 50px;
  }
`
const MenuWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.count}, auto);
  gap: 30px;
  align-items: center;
  cursor: pointer;
  a {
    color: ${themes.primary.text};
    position: relative;
    *,
    & {
      transition: 5s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    :after {
      content: "";
      position: absolute;
      background-color: ${themes.tetiary.main};
      width: 0px;
      height: 4px;
      transition: width 1s ease-in-out;
    }

    :hover:after {
      width: 100%;
    }
  }

  a.active {
    color: ${themes.primary.text};
    position: relative;
    :after {
      content: "";
      position: absolute;
      background-color: ${themes.primary.text};
      width: 100%;
      height: 4px;
    }
  }
`
const MenuItem = styled.div``

const HireButton = styled(Button)`
  background: ${themes.primary.text};
  color: ${themes.primary.main};
`
