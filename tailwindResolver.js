// eslint-disable-next-line import/no-extraneous-dependencies
const resolveConfig = require("tailwindcss/resolveConfig")
const tailwindConfig = require("./tailwind.config")

module.exports = resolveConfig(tailwindConfig)
