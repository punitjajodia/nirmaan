import React, { Component } from "react";
import "./App.css";
import { Editor } from "slate-react";
import { Value, Block } from "slate";
import { CodeMark } from "./marks/CodeMark";
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
import Nirmaan from "./Nirmaan";

const existingValue = JSON.parse(localStorage.getItem("content"));
const initialValue = Value.fromJSON(
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

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nirmaan defaultValue={initialValue} />
      </div>
    );
  }
}

export default App;
