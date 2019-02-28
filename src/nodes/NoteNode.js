import React from "react";
import styled from "styled-components";

export const NoteNode = props => {
  const { attributes, children, ...rest } = props;
  return (
    <Note {...attributes} {...rest}>
      {children}
    </Note>
  );
};

const Note = styled.div`
  padding: 20px;
  border: 1px solid #777;
`;
