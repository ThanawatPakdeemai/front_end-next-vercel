import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"

const NotificationList = dynamic(
  () => import("@feature/notification/components/organisms/NotificationList"),
  {
    suspense: true
  }
)
const ProfileLayout = dynamic(
  () => import("@components/templates/ProfileLayout"),
  {
    suspense: true
  }
)

export default function Notification() {
  return (
    <Box
      component="article"
      className="h-full w-full"
    >
      <NotificationList />
    </Box>
  )
}

Notification.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
      // Will be passed to the page component as props
    }
  }
}
