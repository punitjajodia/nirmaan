import React, { Component } from "react";
import "./App.css";
import { Editor } from "slate-react";
import { Value, Block } from "slate";
import { BoldMark } from "./marks/BoldMark";
import { CodeMark, SampMark, VarMark } from "./marks/CodeMark";
import { codeNodePlugin } from "./plugins/codePlugin";
import { FormatToolbar } from "./toolbars/FormatToolBar";
import { ItalicMark } from "./marks/ItalicMark";
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

const existingValue = JSON.parse(localStorage.getItem("content"));

const schema = {
  // This section is need for the image upload functionality, if this is not there, then we cannot add anything after an image.
  document: {
    last: { type: "paragraph" },
    normalize: (editor, { code, node, child }) => {
      switch (code) {
        case "last_child_type_invalid": {
          const paragraph = Block.create("paragraph");
          return editor.insertNodeByKey(node.key, node.nodes.size, paragraph);
        }
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
  SoftBreak({
    shift: true
  }),
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
    switch (props.mark.type) {
      case "bold":
        return <BoldMark {...props} {...props.attributes} />;
      case "italic":
        return <ItalicMark {...props} {...props.attributes} />;
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
        console.log("Image source is ", src);
        return <ImageNode src={src} selected={isFocused} {...attributes} />;
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
      case "paragraph":
        return (
          <p {...attributes} style={style}>
            {children}
          </p>
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
      <>
        <ToolbarLayout>
          <FormatToolbar editor={this.editor} onChange={this.onChange} />
          <DataToolbar editor={this.editor} onChange={this.onChange} />
        </ToolbarLayout>

        <Layout>
          <BlocksToolbar editor={this.editor} onChange={this.onChange} />
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
          <Viewer editor={this.editor} />
        </Layout>
      </>
    );
  }
}

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

  grid-column-gap: 75px;

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
