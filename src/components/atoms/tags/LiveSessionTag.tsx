import Script from "next/script"
import React from "react"

const LiveSessionTag = () => (
  <>
    <Script
      id="livesession"
      dangerouslySetInnerHTML={{
        __html: `
      !function(w, d, t, u) { if (w.__ls) return; var f = w.__ls = function() { f.push ? f.push.apply(f, arguments) : f.store.push(arguments)}; if (!w.__ls) w.__ls = f; f.store = []; f.v = "1.0"; var ls = d.createElement(t); ls.async = true; ls.src = u; var s = d.getElementsByTagName(t)[0]; s.parentNode.insertBefore(ls, s); }(window, document, 'script', ('https:' == window.location.protocol ? 'https://' : 'http://') + 'cdn.livesession.io/track.js'); __ls("init", "7050e404.2dbe2fb6"); __ls("newPageView")
      `
      }}
    />
  </>
)

export default LiveSessionTag

export const scriptLiveSessionTagHead = () => (
  <script
    id="livesession"
    dangerouslySetInnerHTML={{
      __html: `
      !function(w, d, t, u) { if (w.__ls) return; var f = w.__ls = function() { f.push ? f.push.apply(f, arguments) : f.store.push(arguments)}; if (!w.__ls) w.__ls = f; f.store = []; f.v = "1.0"; var ls = d.createElement(t); ls.async = true; ls.src = u; var s = d.getElementsByTagName(t)[0]; s.parentNode.insertBefore(ls, s); }(window, document, 'script', ('https:' == window.location.protocol ? 'https://' : 'http://') + 'cdn.livesession.io/track.js'); __ls("init", "7050e404.2dbe2fb6"); __ls("newPageView")
      `
    }}
  />
)
