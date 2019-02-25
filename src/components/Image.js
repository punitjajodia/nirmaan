import styled from "styled-components";

export const Image = styled("img")`
  display: block;
  max-width: 100%;
  box-shadow: ${props => (props.selected ? "0 0 0 2px blue;" : "none")};
`;
