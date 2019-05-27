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
  } else if (viewMode === "OUTPUT") {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: htmlSerializer.serialize(editor.value)
        }}
      />
    );
  } else {
    return JSON.stringify(editor.value.toJSON(), null, 4);
  }
};

export const viewerRender = (editor, viewMode) => {
  if (viewMode === "OUTPUT") {
    return viewerContent(editor, viewMode);
  } else {
    return <pre>{viewerContent(editor, viewMode)}</pre>;
  }
};

const Viewer = props => {
  const { editor } = props;

  const [viewMode, setViewMode] = useState("OUTPUT");
  let content = viewerRender(editor, viewMode);

  return (
    <ViewerWrapper>
      <ExportToolbar
        editor={editor}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      {content}
    </ViewerWrapper>
  );
};

const ViewerWrapper = styled.div`
  padding: 10px;
  max-width: 100%;
  overflow-x: auto;
`;

export default Viewer;
