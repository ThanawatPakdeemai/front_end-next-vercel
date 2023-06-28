import TelegramIcon from "@components/icons/SocialIcon/TelegramIcon"
import useSyncProfile from "@mobile/features/game/containers/hooks/useSyncProfile"
import { Box } from "@mui/material"
import Script from "next/script"
import React from "react"

const ButtonTelegram = () => {
  const { handleSyncTelegramId } = useSyncProfile()

  return (
    <Box
      id="login-telegram"
      component="div"
    >
      <Box
        component="button"
        id="button-click"
        onClick={handleSyncTelegramId}
        className="btn tgme_widget_login_button mx-auto flex items-center justify-center gap-1 bg-[#54a9eb] text-base"
        sx={{
          padding: "6px 18px 6px 6px",
          borderRadius: "20px",
          fontFamily: `'Roboto', sans-serif`,
          color: "#fff",
          marginTop: "auto",
          width: "100%"
        }}
      >
        <i className="tgme_widget_login_button_icon">
          <TelegramIcon
            width={30}
            height={30}
          />
        </i>
        <span className="whitespace-nowrap">Sync with Telegram</span>
      </Box>
      <Script
        async
        src="https://telegram.org/js/telegram-widget.js?22"
        data-telegram-login="NakaGameBot"
        data-size="large"
        data-onauth="onTelegramAuth(user)"
        data-request-access="write"
        strategy="lazyOnload"
      />
      <Script id="show-banner">
        {`function onTelegramAuth(params) { localStorage.setItem('telegram-params', JSON.stringify(params)); document.getElementById("button-click").click(); console.log('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');} 
              `}
      </Script>
    </Box>
  )
}

export default ButtonTelegram
