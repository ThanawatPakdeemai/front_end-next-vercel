import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"
import { BrowserView, MobileView } from "react-device-detect"
import CONFIGS from "@configs/index"

const NotificationList = dynamic(
  () => import("@feature/notification/components/organisms/NotificationList"),
  {
    suspense: true,
    ssr: false
  }
)
const NotificationListMobile = dynamic(
  () =>
    import(
      "@src/mobile/features/notification/components/organisms/NotificationListMobile"
    ),
  {
    suspense: true,
    ssr: false
  }
)
const ProfileLayout = dynamic(
  () => import("@components/templates/ProfileLayout"),
  {
    suspense: true,
    ssr: false
  }
)

export default function Notification() {
  return (
    <Box
      component="article"
      className="h-full w-full"
    >
      <BrowserView>
        <NotificationList />
      </BrowserView>
      {CONFIGS.DISPLAY_MOBILE_MODE === "true" && (
        <MobileView>
          <NotificationListMobile />
        </MobileView>
      )}
    </Box>
  )
}

Notification.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <BrowserView>
        <ProfileLayout>{page}</ProfileLayout>
      </BrowserView>
      {CONFIGS.DISPLAY_MOBILE_MODE === "true" && (
        <MobileView>{page}</MobileView>
      )}
    </>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
      // Will be passed to the page component as props
    }
  }
}
