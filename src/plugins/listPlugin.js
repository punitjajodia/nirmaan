import React from "react";

export const listPlugin = options => {
  return {
    commands: {
      insertUnorderedList: editor => {
        editor
          .setBlocks("list-item")
          .wrapBlock("ul-list")
          .focus();
      },
      insertOrderedList: editor => {
        editor
          .setBlocks("list-item")
          .wrapBlock("ol-list")
          .focus();
      },
      unwrapList: editor => {
        editor
          .unwrapBlock("ul-list")
          .unwrapBlock("ol-list")
          .focus();
      }
    },
    queries: {
      isList: editor => {
        return editor.value.blocks.some(node => node.type === "list-item");
      },
      isParagraph: editor => {
        return editor.value.blocks.some(node => node.type === "paragraph");
      },
      isBlockEmpty: editor => {
        return editor.value.endText && editor.value.endText.text === "";
      }
    },
    renderNode: (props, editor, next) => {
      const { attributes, node, children } = props;
      switch (node.type) {
        case "ul-list":
          return <ul {...attributes}>{children}</ul>;
        case "ol-list":
          return <ol {...attributes}>{children}</ol>;
        case "list-item":
          return <li {...attributes}>{children}</li>;
        default:
          return next();
      }
    },
    onKeyDown: (event, editor, next) => {
      if (editor.isList() && editor.isBlockEmpty() && event.keyCode === 13) {
        event.preventDefault();
        editor
          .setBlocks("paragraph")
          .unwrapList()
          .focus();
      } else {
        return next();
      }
    }
  };
};
