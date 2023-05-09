import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"
import { MobileView } from "react-device-detect"
import { isMobile } from "@hooks/useGlobal"

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
      {isMobile ? (
        <MobileView>
          <NotificationListMobile />
        </MobileView>
      ) : (
        <NotificationList />
      )}
    </Box>
  )
}

Notification.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      {isMobile ? (
        <MobileView>{page}</MobileView>
      ) : (
        <ProfileLayout>{page}</ProfileLayout>
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
