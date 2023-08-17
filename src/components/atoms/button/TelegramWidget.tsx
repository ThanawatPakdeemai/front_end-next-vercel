/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef } from "react"

export interface TelegramUser {
  id: number
  first_name: string
  last_name: string
  username: string
  photo_url: string
  auth_date: number
  hash: string
}

export interface TelegramButtonPropArg {
  botName: string
  widgetVersion?: string
  usePic?: boolean
  className?: string
  cornerRadius?: number
  requestAccess?: boolean
  lang?: string
  dataOnAuth: (user: TelegramUser) => void
  dataAuthUrl?: string
  buttonSize?: "large" | "medium" | "small"
  children?: React.ReactNode
}

const TelegramWidget: React.FC<TelegramButtonPropArg> = ({
  botName,
  widgetVersion = 19,
  dataOnAuth,
  dataAuthUrl,
  buttonSize = "large",
  className,
  cornerRadius,
  requestAccess = true,
  lang = "en",
  usePic = false,
  children
}) => {
  const telegramRef = useRef<any>(null)
  const _window = window as any

  useEffect(() => {
    if (!!dataAuthUrl === !!dataOnAuth) {
      throw new Error(
        "One of this props should be defined: dataAuthUrl (Redirect URL), dataOnAuth (callback fn) should be defined."
      )
    }

    if (dataOnAuth) {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      _window.TelegramLoginWidgetCb = dataOnAuth
    }

    const script = document.createElement("script")
    script.src = `https://telegram.org/js/telegram-widget.js?${widgetVersion}`
    script.async = true

    const attributes = {
      "data-telegram-login": botName,
      "data-size": buttonSize,
      "data-radius": cornerRadius,
      "data-request-access": requestAccess ? "write" : undefined,
      "data-userpic": usePic,
      "data-lang": lang,
      "data-auth-url": dataAuthUrl,
      "data-onauth": "TelegramLoginWidgetCb(user)"
    }

    for (const [k, v] of Object.entries(attributes)) {
      v !== undefined && script.setAttribute(k, `${v}`)
    }

    telegramRef.current!.appendChild(script)

    return () => {
      if (telegramRef.current) {
        telegramRef.current.innerHTML = ""
      }
      if (_window.TelegramLoginWidgetCb) {
        delete _window.TelegramLoginWidgetCb
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <button
      aria-label="telegram-button"
      ref={telegramRef}
      className="position-relative overflow-hidden"
      type="button"
    >
      {children}
    </button>
  )
}

export default TelegramWidget
