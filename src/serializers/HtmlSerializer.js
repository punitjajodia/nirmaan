import React from "react";
import Html from "slate-html-serializer";

const rules = [
  {
    serialize: (obj, children) => {
      if (obj.object === "block") {
        switch (obj.type) {
          case "code":
            return (
              <pre>
                <code className="exec">{children}</code>
              </pre>
            );
          case "nonexecutable-code":
            return (
              <pre>
                <code>{children}</code>
              </pre>
            );
          case "sample-output":
            return (
              <pre>
                <samp>{children}</samp>
              </pre>
            );
          case "image":
            return <img alt="" src={obj.data.get("src")} />;
          case "paragraph":
            return <p>{children}</p>;
          case "heading-1":
            return <h1>{children}</h1>;
          case "heading-2":
            return <h2>{children}</h2>;
          case "ul-list":
            return <ul>{children}</ul>;
          case "ol-list":
            return <ol>{children}</ol>;
          case "list-item":
            return <li>{children}</li>;
          case "table":
            return <table>{children}</table>;
          case "table_row":
            return <tr>{children}</tr>;
          case "table_cell":
            return <td>{children}</td>;
          default:
            return <p>{children}</p>;
        }
      }
    }
  },
  {
    serialize: (obj, children) => {
      if (obj.object === "mark") {
        switch (obj.type) {
          case "bold":
            return <strong>{children}</strong>;
          case "italic":
            return <em>{children}</em>;
          case "code":
            return <code>{children}</code>;
          case "link":
            return <a href={obj.data.get("href")}>{children}</a>;
          default:
            return;
        }
      }
    }
  },
  {
    serialize: (obj, children) => {
      if (obj.object === "inline") {
        switch (obj.type) {
          case "link":
            return <a href={obj.data.get("href")}>{children}</a>;
          default:
            return;
        }
      }
    }
  }
];

// Create a new serializer instance with our `rules` from above.
const htmlSerializer = new Html({ rules });

export default htmlSerializer;
