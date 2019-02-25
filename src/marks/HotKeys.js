export const MarkHotKey = options => {
  const { type, key } = options;

  return {
    onKeyDown: (event, editor, next) => {
      if (!event.ctrlKey || event.key !== key) return next();
      event.preventDefault();
      editor.toggleMark(type);
    }
  };
};
