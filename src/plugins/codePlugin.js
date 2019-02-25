import React from "react";
import { MarkHotKey } from "../marks/HotKeys";
import { CodeNode } from "../nodes/CodeNode";
import { NonExecutableCodeNode } from "../nodes/NonExecutableCodeNode";
import { SampleOutput } from "../nodes/SampleOutput";

export const codeMarkPlugin = MarkHotKey({
  type: "code",
  key: "`"
});

export const codeNodePlugin = options => {
  return {
    onKeyDown: (event, editor, next) => {
      if (!event.ctrlKey) return next();

      switch (event.key) {
        case "`":
          event.preventDefault();
          const isCode = editor.value.blocks.some(
            block => block.type === "code"
          );
          editor.setBlocks(isCode ? "paragraph" : "code");
          break;
        default:
          return next();
      }
    },
    renderNode: (props, editor, next) => {
      switch (props.node.type) {
        case "code":
          return <CodeNode {...props} />;
        case "nonexecutable-code":
          return <NonExecutableCodeNode {...props} />;
        case "sample-output":
          return <SampleOutput {...props} />;
        default:
          return next();
      }
    }
  };
};
