const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const path = require('path');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "ventas",
    projectName: "menu",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    devServer:{
      port:9003,
      https:Boolean(process.env.HTTPS)
    },
    externals:[/^@ventas\//],
    output:{
      path : path.resolve(__dirname,'dist'),
      filename:"main.js"
    }
  });
};
