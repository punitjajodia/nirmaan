import React from "react";

export const ItalicMark = props => {
  const { children, mark, attributes } = props;
  return <em {...{ attributes }}>{children}</em>;
};
