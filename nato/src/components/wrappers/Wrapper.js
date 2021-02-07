import styled from "styled-components";
import { themes } from "../styles/ColorStyles";

export const WhiteWrapper = styled.div`
  background: ${themes.tetiary.main};
  color: ${themes.tetiary.text};
`;

export const DarkWrapper = styled.div`
  background: ${themes.tetiary.text};
  color: ${themes.tetiary.main};
`;

export const LightWrapper = styled.div`
  background: ${themes.tetiary.light};
  color: ${themes.tetiary.text};
`;
