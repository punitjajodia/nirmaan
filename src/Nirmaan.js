import React, { Component } from "react";
import "./App.css";
import { Editor } from "slate-react";
import { Value, Block } from "slate";

import { CodeMark, SampMark, VarMark } from "./marks/CodeMark";
import { codeNodePlugin } from "./plugins/codePlugin";
import { FormatToolbar } from "./toolbars/FormatToolBar";
import { BlocksToolbar } from "./toolbars/BlocksToolbar";
import { ImageNode } from "./nodes/ImageNode";
import SoftBreak from "slate-soft-break";
import DeepTable from "slate-deep-table";
import { listPlugin } from "./plugins/listPlugin";
import Viewer from "./Viewer";
import styled from "styled-components";
import { alignPlugin } from "./plugins/alignPlugin";
import { notePlugin } from "./plugins/notePlugin";
import { DataToolbar } from "./toolbars/DataToolbar";
import { linkPlugin } from "./plugins/linkPlugin";
import { pasteHtmlPlugin } from "./plugins/pasteHtmlPlugin";
import { SubMark, SupMark } from "./marks/SubSupMark";
import { fontFamilies } from "./styles/fonts";

const existingValue = JSON.parse(localStorage.getItem("content"));

const schema = {
  // This section is need for the image upload functionality, if this is not there, then we cannot add anything after an image.
  document: {
    normalize: (editor, { code, node, child }) => {
      switch (code) {
        case "last_child_type_invalid": {
          const paragraph = Block.create("paragraph");
          return editor.insertNodeByKey(node.key, node.nodes.size, paragraph);
        }
        default:
          return;
      }
    }
  },
  blocks: {
    image: {
      isVoid: true
    },
    hr: {
      isVoid: true
    }
  }
};

const plugins = [
  SoftBreak({ shift: true }),
  DeepTable(),
  listPlugin(),
  notePlugin(),
  alignPlugin(),
  codeNodePlugin(),
  linkPlugin(),
  pasteHtmlPlugin()
];

class Nirmaan extends Component {
  // Set the initial value when the app is first constructed.

  initialValue = Value.fromJSON(
    existingValue || {
      document: {
        nodes: [
          {
            object: "block",
            type: "paragraph",
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    text: "A line of text in a paragraph."
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  );

  state = {
    value: this.initialValue || this.props.defaultValue
  };

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    const json = value.toJSON();
    window.content = json;

    const content = JSON.stringify(json);
    localStorage.setItem("content", content);

    this.setState({ value });
    this.props.onChange && this.props.onChange(json);
  };

  renderMark = (props, editor, next) => {
    const { attributes, children } = props;
    switch (props.mark.type) {
      case "bold":
        return <strong {...attributes}>{children}</strong>;
      case "underline":
        return <u {...attributes}>{children}</u>;
      case "italic":
        return <em {...attributes}>{children}</em>;
      case "code":
        return <CodeMark {...props} {...props.attributes} />;
      case "samp":
        return <SampMark {...props} {...props.attributes} />;
      case "var":
        return <VarMark {...props} {...props.attributes} />;
      case "sub":
        return <SubMark {...props} {...props.attributes} />;
      case "sup":
        return <SupMark {...props} {...props.attributes} />;
      default:
        return next();
    }
  };

  onKeyDown = (event, editor, next) => {
    if (!event.ctrlKey) return next();

    switch (event.key) {
      case "`":
        event.preventDefault();
        editor.toggleMark("code");
        break;
      case "q":
        event.preventDefault();
        editor.toggleMark("code");
        break;
      case "b":
        event.preventDefault();
        editor.toggleMark("bold");
        break;
      case "i":
        event.preventDefault();
        editor.toggleMark("italic");
        break;
      default:
        return next();
    }
  };

  renderNode = (props, editor, next) => {
    const { attributes, node, children, isFocused } = props;
    const align = node.data.get("align");
    const style = align
      ? {
          textAlign: align
        }
      : {};

    switch (node.type) {
      case "image":
        const src = node.data.get("src");
        return (
          <img
            src={src}
            className={isFocused ? "selected" : ""}
            {...attributes}
          />
        );
      case "heading-1":
        return (
          <h1 {...attributes} style={style}>
            {children}
          </h1>
        );
      case "heading-2":
        return (
          <h2 {...attributes} style={style}>
            {children}
          </h2>
        );
      case "heading-3":
        return (
          <h3 {...attributes} style={style}>
            {children}
          </h3>
        );
      case "paragraph":
        return (
          <p {...attributes} style={style}>
            {children}
          </p>
        );
      case "div":
        return (
          <Div {...attributes} style={style} id={node.data.get("id")}>
            {children}
          </Div>
        );
      case "hr":
        return <hr {...attributes} />;
      default:
        return next();
    }
  };

  renderEditor = (props, editor, next) => {
    const children = next();
    const wordCount = props.value.document
      .getBlocks()
      .reduce((memo, b) => memo + b.text.trim().split(/\s+/).length, 0);
    return (
      <div>
        <div>{children}</div>
        <WordCounter>Word Count: {wordCount}</WordCounter>
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        <ToolbarLayout>
          <FormatToolbar editor={this.editor} onChange={this.onChange} />
          <DataToolbar editor={this.editor} onChange={this.onChange} />
        </ToolbarLayout>

        <Layout>
          <BlocksToolbar editor={this.editor} onChange={this.onChange} />
          <EditorWrapper>
            <Editor
              plugins={plugins}
              value={this.state.value}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              renderMark={this.renderMark}
              renderNode={this.renderNode}
              renderEditor={this.renderEditor}
              schema={schema}
              ref={editor => (this.editor = editor)}
            />
          </EditorWrapper>
          <Viewer editor={this.editor} />
        </Layout>
      </React.Fragment>
    );
  }
}

const Div = styled.div`
  border: 1px dotted red;
  position: relative;
  padding: 15px 3px 5px;
  margin-bottom: 2px;
  &::after {
    content: "${props => props.id}";
    position: absolute;
    top:0;
    right:0;
    font-family: ${fontFamilies.MONOSPACE};
    font-size: 10px;
  }
`;

const EditorWrapper = styled.div`
  max-height: 100vh;
  overflow: auto;
  padding-right: 20px;
`;

const ToolbarLayout = styled.div`
  width: 100%;
  max-width: 1000px;
  position: fixed;
  display: grid;
  top: 0;
  grid-template-columns: auto auto;
  grid-column-gap: 50px;
  background: white;
`;

const Layout = styled.div`
  margin-top: 50px;
  display: grid;

  grid-column-gap: 40px;

  @media (min-width: 720px) {
    grid-template-columns: 50% 50%;
  }
`;

const WordCounter = styled("span")`
  margin-top: 10px;
  padding: 12px;
  background-color: #ebebeb;
  display: inline-block;
`;

export default Nirmaan;
