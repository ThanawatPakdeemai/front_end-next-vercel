/**
 * @type {import('next').NextConfig}
 */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

const { i18n } = require("./next-i18next.config")

const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    })

    return config
  },
  i18n,
  images: {
    domains: ["nakamoto-prod-new.s3.eu-central-1.amazonaws.com"]
  }
}

module.exports = withBundleAnalyzer({ ...nextConfig })
