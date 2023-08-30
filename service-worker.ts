/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable max-len */

/// <reference lib="es2017" />
/// <reference lib="WebWorker" />
import { ExpirationPlugin } from "workbox-expiration"
import {
  matchPrecache,
  cleanupOutdatedCaches,
  precacheAndRoute
} from "workbox-precaching"
import {
  googleFontsCache,
  imageCache,
  staticResourceCache
} from "workbox-recipes"
import {
  registerRoute,
  setCatchHandler,
  setDefaultHandler
} from "workbox-routing"
import { StaleWhileRevalidate } from "workbox-strategies"

// export {}

declare const self: ServiceWorkerGlobalScope

// optionally disable debug logging
// @ts-expect-error - type missing
self.__WB_DISABLE_DEV_LOGS = false

// optionally disable debug logging
// @ts-expect-error - type missing
self.__WB_DISABLE_DEV_LOGS = false

// must include following lines when using inject manifest module from workbox
// https://developers.google.com/web/tools/workbox/guides/precache-files/workbox-build#add_an_injection_point
const WB_MANIFEST = self.__WB_MANIFEST

cleanupOutdatedCaches()

precacheAndRoute(WB_MANIFEST)

staticResourceCache()

imageCache()

googleFontsCache()
/**
 * Next.js dynamic data (json)
 *  */
registerRoute(
  /\/_next\/data\/.+\/.+\.json$/i,
  new StaleWhileRevalidate({
    cacheName: "next-data",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 120,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
        purgeOnQuotaError: true
      })
    ]
  })
)

addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})
