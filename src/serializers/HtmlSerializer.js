import React from "react";
import Html from "slate-html-serializer";

const attributes = ["id", "class", "name", "src", "alt", "href"];

const getHtmlAttributesFromSlate = obj => {
  if (!obj.data) return {};
  const attrs = obj.data.toJS();

  const htmlAttrs = attributes.reduce((o, attr) => {
    if (attrs[attr]) {
      o[attr] = attrs[attr];
    }
    return o;
  }, {});
  return htmlAttrs;
};

const getHtmlAttributesFromHtmlElement = el => {
  const data = attributes.reduce((o, attr) => {
    if (el.hasAttribute && el.hasAttribute(attr)) {
      o[attr] = el.getAttribute(attr);
    }
    return o;
  }, {});
  return data;
};

const isIterable = obj => {
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === "function";
};

const renderChildrenWithLineBreaks = obj => {
  if (isIterable(obj) && typeof obj !== "string") {
    return obj.map(o => renderChildrenWithLineBreaks(o));
  }
  if (typeof obj === "string") {
    return obj.split("\n").reduce((array, text, i) => {
      if (i !== 0) array.push(<br key={i} />);
      array.push(text);
      return array;
    }, []);
  }
  return obj;
};

const rules = [
  {
    serialize: (obj, children) => {
      if (obj.object === "block") {
        const htmlAttrs = getHtmlAttributesFromSlate(obj);

        switch (obj.type) {
          case "code":
            return (
              <pre {...htmlAttrs} className="exec">
                <code>{children}</code>
              </pre>
            );
          case "nonexecutable-code":
            return (
              <pre {...htmlAttrs}>
                <code>{children}</code>
              </pre>
            );
          case "sample-output":
            return (
              <pre {...htmlAttrs}>
                <samp>{children}</samp>
              </pre>
            );
          case "image":
            return <img {...htmlAttrs} />;
          case "paragraph":
            return (
              <p {...htmlAttrs}>{renderChildrenWithLineBreaks(children)}</p>
            );
          case "heading-1":
            return <h1 {...htmlAttrs}>{children}</h1>;
          case "heading-2":
            return <h2 {...htmlAttrs}>{children}</h2>;
          case "heading-3":
            return <h3 {...htmlAttrs}>{children}</h3>;
          case "ul-list":
            return <ul {...htmlAttrs}>{children}</ul>;
          case "ol-list":
            return <ol {...htmlAttrs}>{children}</ol>;
          case "list-item":
            return (
              <li {...htmlAttrs}>{renderChildrenWithLineBreaks(children)}</li>
            );
          case "table":
            return <table {...htmlAttrs}>{children}</table>;
          case "table_row":
            return <tr {...htmlAttrs}>{children}</tr>;
          case "table_cell":
            return <td {...htmlAttrs}>{children}</td>;
          case "pre":
            return <pre {...htmlAttrs}>{children}</pre>;
          case "hr":
            return <hr {...htmlAttrs} />;
          default:
            return <p {...htmlAttrs}>{children}</p>;
        }
      }
    },
    deserialize: (el, next) => {
      const tag = el.tagName.toLowerCase();
      const data = getHtmlAttributesFromHtmlElement(el);

      if (tag === "p") {
        return {
          object: "block",
          type: "paragraph",
          nodes: next(el.childNodes),
          data
        };
      }
      if (tag === "h1") {
        return {
          object: "block",
          type: "heading-1",
          nodes: next(el.childNodes),
          data
        };
      }
      if (tag === "h2") {
        return {
          object: "block",
          type: "heading-2",
          nodes: next(el.childNodes),
          data
        };
      }
      if (tag === "h3") {
        return {
          object: "block",
          type: "heading-3",
          nodes: next(el.childNodes),
          data
        };
      }
      if (tag === "ul") {
        return {
          object: "block",
          type: "ul-list",
          nodes: next(el.childNodes),
          data
        };
      }
      if (tag === "ol") {
        return {
          object: "block",
          type: "ol-list",
          nodes: next(el.childNodes),
          data
        };
      }
      if (tag === "li") {
        return {
          object: "block",
          type: "list-item",
          nodes: next(el.childNodes),
          data
        };
      }
      if (tag === "table") {
        return {
          object: "block",
          type: "table",
          nodes: next(el.childNodes),
          data
        };
      }
      if (tag === "tr") {
        return {
          object: "block",
          type: "table_row",
          nodes: next(el.childNodes),
          data
        };
      }
      if (tag === "td") {
        return {
          object: "block",
          type: "table_cell",
          nodes: next(el.childNodes),
          data
        };
      }
      if (tag === "hr") {
        return {
          object: "block",
          type: "hr",
          data
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
            nodes: next(childOfPre.childNodes),
            data
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
            nodes: next(childOfPre.childNodes),
            data
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
            nodes: next(childOfPre.childNodes),
            data
          };
        }
        return {
          object: "block",
          type: "pre",
          nodes: next(el.childNodes),
          data
        };
      }

      if (tag === "img") {
        return {
          object: "block",
          type: "image",
          nodes: next(el.childNodes),
          data
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
          case "underline":
            return <u>{children}</u>;
          case "italic":
            return <em>{children}</em>;
          case "code":
            return <code>{children}</code>;
          case "var":
            return <var>{children}</var>;
          case "samp":
            return <samp>{children}</samp>;
          case "sup":
            return <sup>{children}</sup>;
          case "sub":
            return <sub>{children}</sub>;
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
      if (tag === "u") {
        return {
          object: "mark",
          type: "underline",
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
      if (tag === "sub") {
        return {
          object: "mark",
          type: "sub",
          nodes: next(el.childNodes)
        };
      }
      if (tag === "sup") {
        return {
          object: "mark",
          type: "sup",
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
      const htmlAttrs = getHtmlAttributesFromSlate(obj);
      if (obj.object === "inline") {
        switch (obj.type) {
          case "link":
            return <a {...htmlAttrs}>{children}</a>;
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
  },
  {
    serialize(obj, children) {
      if (obj.object === "string") {
        return children;
      }
    }
  }
];

// Create a new serializer instance with our `rules` from above.
const htmlSerializer = new Html({ rules });

export default htmlSerializer;
