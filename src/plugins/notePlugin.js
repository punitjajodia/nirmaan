import React from "react";
import { NoteNode } from "../nodes/NoteNode";

export const notePlugin = options => {
  return {
    commands: {
      insertNote: editor => {
        editor.insertBlock("note").unwrapList();
      }
    },
    renderNode: (props, editor, next) => {
      const { node } = props;
      const align = node.data.get("align");

      const style = align
        ? {
            textAlign: align
          }
        : {};

      switch (node.type) {
        case "note":
          return <NoteNode {...props} style={style} />;
        default:
          return next();
      }
    }
  };
};
