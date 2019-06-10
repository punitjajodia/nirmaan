import React from "react";

export const linkPlugin = options => {
  return {
    commands: {
      wrapLink: (editor, attrs) => {
        editor.wrapInline({
          type: "link",
          data: attrs
        });
        editor.moveToEnd();
      },
      unwrapLink: editor => {
        editor.unwrapInline("link");
      }
    },
    queries: {
      hasLinks: editor => {
        const { value } = editor;
        return value.inlines.some(inline => inline.type === "link");
      }
    },
    renderNode: (props, editor, next) => {
      const { attributes, node, children } = props;
      switch (node.type) {
        case "link":
          const { data } = node;
          const href = data.get("href");
          return (
            <a {...attributes} href={href}>
              {children}
            </a>
          );
        default:
          return next();
      }
    }
  };
};
