/**
 * @type {import('next').NextConfig}
 */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

const { i18n } = require("./next-i18next.config")

const nextConfig = {
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    })

    return config
  },
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nakamoto-prod-new.s3.eu-central-1.amazonaws.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "nakamoto-s3.s3.ap-southeast-1.amazonaws.com",
        port: "",
        pathname: "/**"
      }
    ]
  }
}

module.exports = withBundleAnalyzer({ ...nextConfig })
