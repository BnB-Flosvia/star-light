const path = require("path")

module.exports = {
  stories: ["../stories/**/*.stories.js"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      src: path.resolve(__dirname, "..", "src"),
    }

    return config
  },
}