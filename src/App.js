import React, { Component } from "react";
import "./App.css";
import { Value } from "slate";
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
