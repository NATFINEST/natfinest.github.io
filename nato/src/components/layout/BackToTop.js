// import React from "react"
import Button from "../buttons/Button"
import styled from "styled-components"
import { Link as LinkTo } from "react-scroll"
import React, { useState, useLayoutEffect } from "react"

export default function BackToTop() {
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
    <ButtonWrapper display={scrollPosition > 100 ? "block" : "none"}>
      <LinkTo
        activeClass="active"
        to="Home"
        spy={true}
        smooth={true}
        offset={-150}
        duration={500}
      >
        <BackToTopButton icon="fa fa-arrow-up" />

        {/* <BackToTopButton position={scrollPosition} /> */}
      </LinkTo>
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  transition: 5s cubic-bezier(0.075, 0.82, 0.165, 1);
  display: ${props => props.display};
`
const BackToTopButton = styled(Button)``
