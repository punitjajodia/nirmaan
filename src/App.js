import React, { Component } from "react";
import "./App.css";
import { Value } from "slate";
import Nirmaan, { defaultSlateJson } from "./Nirmaan";

const value = {
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
                text: ""
              }
            ]
          }
        ]
      }
    ]
  }
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nirmaan defaultValue={value} />
      </div>
    );
  }
}

export default App;
