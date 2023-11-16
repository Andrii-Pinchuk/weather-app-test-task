const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/weather-app-test-task/" : "/",
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import './src/assets/styles/utils/_variables.scss';
          @import './src/assets/styles/utils/_mixins.scss';
        `,
      },
    },
  },
  pages: {
    index: {
      entry: "src/main.js",
      title: "Weather App",
    },
  },
});
