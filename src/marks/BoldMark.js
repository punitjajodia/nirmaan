import React from "react";

export const BoldMark = props => {
  const { children, attributes } = props;
  return <strong {...{ attributes }}>{children}</strong>;
};
