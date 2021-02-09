import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { FaBars } from "react-icons/fa"
import { menuData } from "../data/MenuData"
import { Button } from "./Button"

const Header = () => {
  return (
    <Nav>
      <NavLink to="/">BETATRAVEL</NavLink>
      <Bars />
      <NavMenu count={menuData.length}>
        {menuData.map((item, index) => (
          <NavLink to={item.link} key={index}>
            {item.title}
          </NavLink>
        ))}
      </NavMenu>
      <NavBtn>
        <Button primary="true" round="true" to="/trips">
          Book a Flight
        </Button>
      </NavBtn>
    </Nav>
  )
}
export default Header

const Nav = styled.nav`
  /* background: red; */
  height: 80px;
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: space-between;
  padding: 0 30px;
  /* padding: 0.5rem calc((100vw - 130px) / 2); */
  z-index: 100;
  position: relative;
`

const NavLink = styled(Link)`
  color: white;
  display: grid;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  align-self: start;
  justify-self: start;
`
const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media (max-width: 760px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`

const NavMenu = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(${props => props.count}, auto);
  text-transform: capitalize;

  @media screen and (max-width: 760px) {
    display: none;
  }
`
const NavBtn = styled.div`
  display: grid;
  align-items: center;
  padding: 0 1rem;

  @media screen and (max-width: 760px) {
    display: none;
  }
`
