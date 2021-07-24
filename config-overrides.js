const {
  override,
  addWebpackAlias,
  addDecoratorsLegacy,
  disableEsLint,
} = require("customize-cra")
const path = require("path")

module.exports = override(
  addWebpackAlias({
    src: path.resolve("./src/"),
  }),
  disableEsLint(),
  addDecoratorsLegacy()
)
