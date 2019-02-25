import React, { useState } from "react";
import styled from "styled-components";
import htmlSerializer from "./serializers/HtmlSerializer";
import pretty from "pretty";
import { ExportToolbar } from "./toolbars/ExportToolbar";

export const viewerContent = (editor, viewMode) => {
  if (!editor) {
    return "";
  }

  if (viewMode === "HTML") {
    return pretty(htmlSerializer.serialize(editor.value));
  } else {
    return JSON.stringify(editor.value.toJSON(), null, 4);
  }
};

const Viewer = props => {
  const { editor } = props;

  const [viewMode, setViewMode] = useState("HTML");
  let content = viewerContent(editor, viewMode);

  return (
    <ViewerWrapper>
      <ExportToolbar
        editor={editor}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <pre>{content}</pre>
    </ViewerWrapper>
  );
};

const ViewerWrapper = styled.div`
  position: relative;
  padding: 10px;
`;

export default Viewer;
