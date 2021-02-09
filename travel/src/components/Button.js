import styled from "styled-components"
import { Link } from "gatsby"

export const Button = styled(Link)`
  background: ${({ primary }) => (primary ? "#f26a2e" : "#077bf1")};
  color: #fff;
  white-space: nowrap;
  padding: ${({ big }) => (big ? "16px 40px" : "10px 32px")};
  font-size: ${({ big }) => (big ? "20px" : "16px")};
  outline: none;
  border: none;
  min-width: 100px;
  width: max-content;
  margin: 0 auto;
  cursor: pointer;
  text-decoration: none;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  border-radius: ${({ round }) => (round ? "50px" : "none")};

  &:hover {
    background: ${({ primary }) => (primary ? "#077bf1" : "#f26a2e")};
    transform: translateY(-2px);
  }
`
