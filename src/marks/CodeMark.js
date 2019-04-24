import React from "react";
import styled from "styled-components";
import { fontFamilies } from "../styles/fonts";

export const CodeMark = props => {
  const { children, attributes } = props;
  return <InlineCode {...{ attributes }}>{children}</InlineCode>;
};

const InlineCode = styled.code`
  background: #eee;

  &:after {
    content: "<code>";
    font-family: ${fontFamilies.MONOSPACE};
    font-size: 5px;
    margin-left: 2px;
  }
`;

export const SampMark = props => {
  const { children, attributes } = props;
  return <Samp {...{ attributes }}>{children}</Samp>;
};

const Samp = styled.samp`
  background: #eee;

  &:after {
    content: "<samp>";
    font-family: ${fontFamilies.MONOSPACE};
    font-size: 5px;
    margin-left: 2px;
  }
`;

export const VarMark = props => {
  const { children, attributes } = props;
  return <Var {...{ attributes }}>{children}</Var>;
};

const Var = styled.samp`
  background: #eee;

  &:after {
    content: "<var>";
    font-family: ${fontFamilies.MONOSPACE};
    font-size: 5px;
    margin-left: 2px;
  }
`;
