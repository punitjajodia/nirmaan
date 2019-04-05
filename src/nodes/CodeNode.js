import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { fontFamilies } from "../styles/fonts";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const CodeNode = props => {
  const output = props.node.data.get("output") ? (
    <CodeOutput>
      <strong>Output:</strong>
      <br />
      {props.node.data.get("output")}
    </CodeOutput>
  ) : null;

  return (
    <div {...props.attributes}>
      <Pre>
        <Code>{props.children}</Code>
      </Pre>
      {output}
    </div>
  );
};

const Code = styled.code``;

const CodeOutput = styled.pre`
  background: #eee;
  font-family: ${fontFamilies.MONOSPACE};
  padding: 10px;
`;

const Pre = styled.pre`
  background: #eee;
  position: relative;
  z-index: -10;

  &:after {
    content: "Executable Code";
    font-family: ${fontFamilies.MONOSPACE};
    font-size: 10px;
    position: absolute;
    top: 2px;
    right: 2px;
  }
`;
