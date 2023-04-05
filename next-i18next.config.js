const path = require("path")

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "cn"],
    localePath: path.resolve("./public/locales")
  },
  reloadOnPrerender: process.env.NEXT_PUBLIC_MODE === "development"
}
