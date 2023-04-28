import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"
import { BrowserView, MobileView } from "react-device-detect"

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
      <MobileView>
        <NotificationListMobile />
      </MobileView>
    </Box>
  )
}

Notification.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <BrowserView>
        <ProfileLayout>{page}</ProfileLayout>
      </BrowserView>
      <MobileView>{page}</MobileView>
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
