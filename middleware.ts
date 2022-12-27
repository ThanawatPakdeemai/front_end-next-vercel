import { NextResponse } from "next/server"
import type { NextFetchEvent, NextRequest } from "next/server"

export function middleware(req: NextRequest, event: NextFetchEvent) {
  event.waitUntil(
    fetch("https://my-analytics-platform.com", {
      method: "POST",
      body: JSON.stringify({ pathname: req.nextUrl.pathname })
    })
  )

  return NextResponse.next()
}
