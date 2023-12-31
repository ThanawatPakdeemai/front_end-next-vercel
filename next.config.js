/**
 * @type {import('next').NextConfig}
 */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NEXT_PUBLIC_MODE === "development",
  sw: "sw.js",
  // Caching strategies
  runtimeCaching: [
    {
      urlPattern: /\/api/, // Example API route pattern
      handler: "CacheFirst", // Use cache first strategy
      options: {
        cacheName: "api-cache" // Name for this cache
      }
    }
    // Add more caching strategies as needed
  ]
})

// eslint-disable-next-line import/no-extraneous-dependencies
// const withTM = require("next-transpile-modules")(["three"])

const { i18n } = require("./next-i18next.config")

const nextConfig = {
  // if true api will call twice
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
        hostname: "c.tenor.com",
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
        hostname: "nakamoto-prod-new.s3.eu-central-1.amazonaws.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "nakamoto-prod-s3.s3.eu-central-1.amazonaws.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "nakamoto-s3.s3.ap-southeast-1.amazonaws.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com",
        pathname: "/**"
      }
    ]
  },
  distDir: process.env.BUILD_DIR || ".next"
}
module.exports = {
  experimental: {
    nextScriptWorkers: true
  }
}

module.exports = withBundleAnalyzer(
  withPWA({
    ...nextConfig
  })
)
