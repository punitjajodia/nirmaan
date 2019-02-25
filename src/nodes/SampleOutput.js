import React from "react";
import styled from "styled-components";
import { fontFamilies } from "../styles/fonts";

export const SampleOutput = props => {
  return (
    <Pre {...props.attributes}>
      <Samp>{props.children}</Samp>
    </Pre>
  );
};

const Samp = styled.samp``;

const Pre = styled.pre`
  background: #eee;
  position: relative;

  &:after {
    content: "Sample Output";
    font-family: ${fontFamilies.MONOSPACE};
    font-size: 10px;
    position: absolute;
    top: 2px;
    right: 2px;
  }
`;
