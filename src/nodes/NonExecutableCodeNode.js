import React from "react";
import styled from "styled-components";
import { fontFamilies } from "../styles/fonts";

export const NonExecutableCodeNode = props => {
  return (
    <Pre {...props.attributes}>
      <Code>{props.children}</Code>
    </Pre>
  );
};

const Code = styled.code``;

const Pre = styled.pre`
  background: #eee;
  position: relative;

  &:after {
    content: "Non Executable Code";
    font-family: ${fontFamilies.MONOSPACE};
    font-size: 10px;
    position: absolute;
    top: 2px;
    right: 2px;
  }
`;
