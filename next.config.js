/**
 * @type {import('next').NextConfig}
 */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

// eslint-disable-next-line no-var
var path = require("path")
// eslint-disable-next-line no-var
var SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin")

const PUBLIC_PATH = "https://front-end-next-vercel.vercel.app/"

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
}
module.exports = {
  experimental: {
    nextScriptWorkers: true
  },
  entry: {
    main: path.resolve(__dirname, "src/index")
  },

  output: {
    path: path.resolve(__dirname, "src/bundles/"),
    filename: "sw.js",
    publicPath: PUBLIC_PATH
  },

  plugins: [
    new SWPrecacheWebpackPlugin({
      cacheId: "my-project-name",
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: "service-worker.js",
      minify: true,
      navigateFallback: `${PUBLIC_PATH}index.html`,
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
    })
  ]
}

module.exports = withBundleAnalyzer({ ...nextConfig })
