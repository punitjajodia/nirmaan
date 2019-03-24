import React from "react";
import { MarkHotKey } from "../marks/HotKeys";
import { CodeNode } from "../nodes/CodeNode";
import { NonExecutableCodeNode } from "../nodes/NonExecutableCodeNode";
import { SampleOutput } from "../nodes/SampleOutput";
import { getEventTransfer } from "slate-react";

export const codeMarkPlugin = MarkHotKey({
  type: "code",
  key: "`"
});

export const isCodeBlock = block => {
  return (
    block.type === "code" ||
    block.type === "nonexecutable-code" ||
    block.type === "sample-output"
  );
};

export const codeNodePlugin = options => {
  return {
    queries: {
      isCode: editor => {
        return editor.value.blocks.some(block => isCodeBlock(block));
      }
    },
    onPaste: (event, editor, next) => {
      const { text } = getEventTransfer(event);
      const isCode = editor.isCode();

      if (!isCode) {
        return next();
      }

      editor.insertText(text.replace(/\r\n/g, "\n").replace(/\r/g, ""));
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
