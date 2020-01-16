module.exports = function(api) {
  api.cache(false);

  const presets = [
    [
      "@babel/preset-env",
      {
        modules: "commonjs"
      }
    ],
    "@babel/preset-react"
  ];

  const plugins = ["@babel/plugin-proposal-class-properties"];

  return {
    presets,
    plugins
  };
};
