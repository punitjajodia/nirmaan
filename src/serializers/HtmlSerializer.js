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
          case "heading-3":
            return <h3>{children}</h3>;
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
          case "pre":
            return <pre>{children}</pre>;
          case "hr":
            return <hr />;
          default:
            return <p>{children}</p>;
        }
      }
    },
    deserialize: (el, next) => {
      const tag = el.tagName.toLowerCase();

      if (tag === "p") {
        return {
          object: "block",
          type: "paragraph",
          nodes: next(el.childNodes)
        };
      }
      if (tag === "h1") {
        return {
          object: "block",
          type: "heading-1",
          nodes: next(el.childNodes)
        };
      }
      if (tag === "h2") {
        return {
          object: "block",
          type: "heading-2",
          nodes: next(el.childNodes)
        };
      }
      if (tag === "h3") {
        return {
          object: "block",
          type: "heading-3",
          nodes: next(el.childNodes)
        };
      }
      if (tag === "ul") {
        return {
          object: "block",
          type: "ul-list",
          nodes: next(el.childNodes)
        };
      }
      if (tag === "ol") {
        return {
          object: "block",
          type: "ol-list",
          nodes: next(el.childNodes)
        };
      }
      if (tag === "li") {
        return {
          object: "block",
          type: "list-item",
          nodes: next(el.childNodes)
        };
      }
      if (tag === "table") {
        return {
          object: "block",
          type: "table",
          nodes: next(el.childNodes)
        };
      }
      if (tag === "tr") {
        return {
          object: "block",
          type: "table_row",
          nodes: next(el.childNodes)
        };
      }
      if (tag === "td") {
        return {
          object: "block",
          type: "table_cell",
          nodes: next(el.childNodes)
        };
      }
      if (tag === "hr") {
        return {
          object: "block",
          type: "hr"
        };
      }
      if (tag === "pre") {
        const childOfPre = el.childNodes[0];
        if (
          childOfPre &&
          childOfPre.tagName &&
          childOfPre.tagName.toLowerCase() === "code" &&
          childOfPre.classList.contains("exec")
        ) {
          return {
            object: "block",
            type: "code",
            nodes: next(childOfPre.childNodes)
          };
        }

        if (
          childOfPre &&
          childOfPre.tagName &&
          childOfPre.tagName.toLowerCase() === "code" &&
          !childOfPre.classList.contains("exec")
        ) {
          return {
            object: "block",
            type: "nonexecutable-code",
            nodes: next(childOfPre.childNodes)
          };
        }

        if (
          childOfPre &&
          childOfPre.tagName &&
          childOfPre.tagName.toLowerCase() === "samp"
        ) {
          return {
            object: "block",
            type: "sample-output",
            nodes: next(childOfPre.childNodes)
          };
        }
        return {
          object: "block",
          type: "pre",
          nodes: next(el.childNodes)
        };
      }

      if (tag === "img") {
        return {
          object: "block",
          type: "image",
          nodes: next(el.childNodes),
          data: {
            src: el.getAttribute("src")
          }
        };
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
          case "var":
            return <var>{children}</var>;
          case "samp":
            return <samp>{children}</samp>;
          default:
            return;
        }
      }
    },
    deserialize: (el, next) => {
      const tag = el.tagName.toLowerCase();
      if (tag === "strong") {
        return {
          object: "mark",
          type: "bold",
          nodes: next(el.childNodes)
        };
      }
      if (tag === "em") {
        return {
          object: "mark",
          type: "italic",
          nodes: next(el.childNodes)
        };
      }
      if (tag === "var") {
        return {
          object: "mark",
          type: "var",
          nodes: next(el.childNodes)
        };
      }
      if (tag === "code" && el.parentNode.tagName.toLowerCase() !== "pre") {
        return {
          object: "mark",
          type: "code",
          nodes: next(el.childNodes)
        };
      }
      if (tag === "samp" && el.parentNode.tagName.toLowerCase() !== "pre") {
        return {
          object: "mark",
          type: "samp",
          nodes: next(el.childNodes)
        };
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
    },
    // Special case for links, to grab their href.
    deserialize: (el, next) => {
      if (el.tagName.toLowerCase() === "a") {
        return {
          object: "inline",
          type: "link",
          nodes: next(el.childNodes),
          data: {
            href: el.getAttribute("href")
          }
        };
      }
    }
  }
];

// Create a new serializer instance with our `rules` from above.
const htmlSerializer = new Html({ rules });

export default htmlSerializer;
