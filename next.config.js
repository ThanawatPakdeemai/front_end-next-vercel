/**
 * @type {import('next').NextConfig}
 */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

// eslint-disable-next-line import/no-extraneous-dependencies
// const withTM = require("next-transpile-modules")(["three"])

const runtimeCaching = require("next-pwa/cache")
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  buildExcludes: [/middleware-manifest.json$/],
  dynamicStartUrlRedirect: "/"
})

const { i18n } = require("./next-i18next.config")

const nextConfig = withPWA({
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
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "nakamoto-s3.s3.ap-southeast-1.amazonaws.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "c.tenor.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "nakamoto-prod.s3.eu-central-1.amazonaws.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "nakamoto-prod-s3.s3.eu-central-1.amazonaws.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "cdn.pic.in.th",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "ipfs.io",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "nakamoto-prod-s3.s3.eu-central-1.amazonaws.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "ipfs.io",
        pathname: "/**"
      }
    ]
    // domains: ["nakamoto-prod-new.s3.eu-central-1.amazonaws.com"]
  },
  distDir: process.env.BUILD_DIR || ".next"
})

module.exports = withBundleAnalyzer({ ...nextConfig })
