import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import htmlSerializer from "./serializers/HtmlSerializer";
import { ExportToolbar } from "./toolbars/ExportToolbar";
import { html } from "js-beautify";
import { fontFamilies } from "./styles/fonts";

export const viewerContent = (editor, viewMode) => {
  if (!editor) {
    return "";
  }

  if (viewMode === "HTML") {
    const prettyHtml = html(htmlSerializer.serialize(editor.value), {
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
    return prettyHtml;
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
    return (
      <HtmlEditor content={viewerContent(editor, viewMode)} editor={editor} />
    );
  }
};

const HtmlEditor = props => {
  const htmlEditorRef = useRef(null);
  const { content, editor } = props;

  const [editingMode, setEditingMode] = useState(false);
  const [html, setHtml] = useState("");

  return (
    <div>
      {!editingMode && (
        <button
          onClick={() => {
            setEditingMode(true);
            setHtml(content);
            htmlEditorRef.current.focus();
          }}
        >
          Edit HTML
        </button>
      )}
      {editingMode && (
        <button
          onClick={() => {
            editor.onChange({
              value: htmlSerializer.deserialize(html.replace(/>\s+</g, "><"))
            });
            setEditingMode(false);
          }}
        >
          Update
        </button>
      )}
      <HtmlEditorTextArea
        ref={htmlEditorRef}
        value={editingMode ? html : content}
        rows={100}
        onChange={e => setHtml(e.target.value)}
        onBlur={e => {
          editor.onChange({
            value: htmlSerializer.deserialize(
              e.target.value.replace(/>\s+</g, "><")
            )
          });
          setEditingMode(false);
        }}
        onFocus={e => {
          setEditingMode(true);
          setHtml(content);
        }}
        readOnly={!editingMode}
      />
    </div>
  );
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

const HtmlEditorTextArea = styled.textarea`
  width: 100%;
  outline: none;
  border: none;
  font-size: 0.9rem;
  font-family: ${fontFamilies.MONOSPACE};
`;

export default Viewer;
