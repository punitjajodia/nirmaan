import { ALIGN } from "../consts";

export const alignPlugin = options => {
  return {
    queries: {
      getData: editor => {
        return editor.value.document.nodes.reduce((prev, next) => {
          return {
            ...prev,
            ...next.get("data").toJS()
          };
        }, {});
      }
    },
    commands: {
      alignLeft: editor => {
        editor.setBlocks({
          data: {
            ...editor.getData(),
            align: ALIGN.LEFT
          }
        });
      },
      alignCenter: editor => {
        editor.setBlocks({
          data: {
            ...editor.getData(),
            align: ALIGN.CENTER
          }
        });
      },
      alignRight: editor => {
        editor.setBlocks({
          data: {
            ...editor.getData(),
            align: ALIGN.RIGHT
          }
        });
      }
    }
  };
};
