import React, { Component } from "react";
import "./App.css";
import { Editor } from "slate-react";
import { Value, Block } from "slate";
import { BoldMark } from "./marks/BoldMark";
import { boldPlugin } from "./plugins/boldPlugin";
import { CodeMark } from "./marks/CodeMark";
import { codeNodePlugin, codeMarkPlugin } from "./plugins/codePlugin";
import { FormatToolbar } from "./toolbars/FormatToolBar";
import { ItalicMark } from "./marks/ItalicMark";
import { BlocksToolbar } from "./toolbars/BlocksToolbar";
import { ImageNode } from "./nodes/ImageNode";
import SoftBreak from "slate-soft-break";
import EditList from "slate-edit-list";

import DeepTable from "slate-deep-table";
import { listPlugin } from "./plugins/listPlugin";
import { ExportToolbar } from "./toolbars/ExportToolbar";
import Viewer from "./Viewer";
import styled from "styled-components";

const initialValue = Value.fromJSON({
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
});

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
    }
  }
};

const plugins = [
  SoftBreak({
    shift: true
  }),
  DeepTable(),
  listPlugin(),
  codeNodePlugin()
];

class App extends Component {
  // Set the initial value when the app is first constructed.

  state = {
    value: initialValue
  };

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    window.content = value.toJSON();

    this.setState({ value });
  };

  renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case "bold":
        return <BoldMark {...props} {...props.attributes} />;
      case "italic":
        return <ItalicMark {...props} {...props.attributes} />;
      case "code":
        return <CodeMark {...props} {...props.attributes} />;
      default:
        return next();
    }
  };
  renderNode = (props, editor, next) => {
    const { attributes, node, children, isFocused } = props;
    switch (node.type) {
      case "image":
        const src = node.data.get("src");
        console.log("Image source is ", src);
        return <ImageNode src={src} selected={isFocused} {...attributes} />;
      case "heading-1":
        return <h1 {...attributes}>{children}</h1>;
      case "heading-2":
        return <h2 {...attributes}>{children}</h2>;
      default:
        return next();
    }
  };

  render() {
    return (
      <div className="App">
        <FormatToolbar editor={this.editor} />
        <BlocksToolbar editor={this.editor} onChange={this.onChange} />
        <Layout>
          <Editor
            plugins={plugins}
            value={this.state.value}
            onChange={this.onChange}
            renderMark={this.renderMark}
            renderNode={this.renderNode}
            schema={schema}
            ref={editor => (this.editor = editor)}
          />
          <Viewer editor={this.editor} />
        </Layout>
      </div>
    );
  }
}

const Layout = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-column-gap: 50px;
`;

export default App;
