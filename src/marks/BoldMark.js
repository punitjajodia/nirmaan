import React from "react";

export const BoldMark = props => {
  const { children, mark, attributes } = props;
  return <strong {...{ attributes }}>{children}</strong>;
};
