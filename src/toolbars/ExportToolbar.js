import React from "react";
import styled from "styled-components";
import { InlineButton } from "../components/Buttons";
import { viewerContent } from "../Viewer";

const copyToClipboard = string => {
  const el = document.createElement("textarea");
  el.value = string;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

export const ExportToolbar = props => {
  const { editor, setViewMode, viewMode } = props;
  return (
    <ExportToolbarWrapper>
      <InlineButton onClick={() => setViewMode("HTML")}>HTML</InlineButton>
      <InlineButton
        onClick={() => {
          setViewMode("JSON");
        }}
      >
        JSON
      </InlineButton>
      <InlineButton
        onClick={() => {
          const content = viewerContent(editor, viewMode);
          copyToClipboard(content);
          alert(`Copied ${viewMode} to clipboard!`);
        }}
      >
        Copy to Clipboard
      </InlineButton>
    </ExportToolbarWrapper>
  );
};

const ExportToolbarWrapper = styled.div`
  top: 0;
  right: 0;
`;
