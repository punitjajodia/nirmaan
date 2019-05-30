import React, { useState } from "react";
import styled from "styled-components";
import htmlSerializer from "./serializers/HtmlSerializer";
import pretty from "pretty";
import { ExportToolbar } from "./toolbars/ExportToolbar";
import { html } from "js-beautify";

export const viewerContent = (editor, viewMode) => {
  if (!editor) {
    return "";
  }

  if (viewMode === "HTML") {
    const prettyHTML = html(htmlSerializer.serialize(editor.value), {
      extra_liners: [
        "p",
        "img",
        "h1",
        "h2",
        "h3",
        "pre",
        "ul",
        "li",
        "table",
        "hr",
        "div"
      ]
    });
    return prettyHTML;
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

  max-height: 100vh;
  overflow: scroll;
`;

export default Viewer;
