import React from "react";
import styled from "styled-components";

export const CodeMark = props => {
  const { children, attributes } = props;
  return <InlineCode {...{ attributes }}>{children}</InlineCode>;
};

const InlineCode = styled.code`
  background: #ccc;
`;
