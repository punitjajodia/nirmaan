import React from "react";
import { getEventTransfer } from "slate-react";
import htmlSerializer from "../serializers/HtmlSerializer";

export const pasteHtmlPlugin = options => {
  return {
    onPaste: (event, editor, next) => {
      const transfer = getEventTransfer(event);
      if (transfer.type !== "html") return next();
      console.log("I am pasting yo");
      const { document } = htmlSerializer.deserialize(transfer.html);
      editor.insertFragment(document);
    }
  };
};
