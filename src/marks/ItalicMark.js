import React from "react";

export const ItalicMark = props => {
  const { children, attributes } = props;
  return <em {...{ attributes }}>{children}</em>;
};
