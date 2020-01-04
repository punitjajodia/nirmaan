import React from "react";
import styled from "styled-components";

export const SubMark = props => {
  const { children, attributes } = props;
  return <Sub {...{ attributes }}>{children}</Sub>;
};

const Sub = styled.sub``;

export const SupMark = props => {
  const { children, attributes } = props;
  return <Sup {...{ attributes }}>{children}</Sup>;
};

const Sup = styled.sup``;
