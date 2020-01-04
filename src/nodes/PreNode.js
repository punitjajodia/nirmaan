import React from "react";
import styled from "styled-components";
import { fontFamilies } from "../styles/fonts";

export const PreNode = props => {
  return <Pre {...props.attributes}>{props.children}</Pre>;
};

const Pre = styled.pre`
  background: #eee;
  position: relative;
  z-index: -1;

  &:after {
    content: "preformatted";
    font-family: ${fontFamilies.MONOSPACE};
    font-size: 10px;
    position: absolute;
    top: 2px;
    right: 2px;
  }
`;
