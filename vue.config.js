const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: "@import './src/assets/styles/_variables.scss';",
      },
    },
  },
  pages: {
    index: {
      entry: "src/main.js",
      title: "Weather App", // Change the title here
    },
  },
});
