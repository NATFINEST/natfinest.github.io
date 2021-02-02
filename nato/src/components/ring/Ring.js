import styled from "styled-components"
import { themes } from "../styles/ColorStyles"

export const Ring = styled.div`
  border-radius: 50%;
  border: 2px solid ${themes.primary.text};
  padding: 20px;
`
