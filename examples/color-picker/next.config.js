const withTM = require("next-transpile-modules")(["microcms-iframe-react"]);

module.exports = withTM({
  reactStrictMode: true,
});
