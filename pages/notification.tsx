import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import NotificationList from "@feature/notification/components/organisms/NotificationList"
import { Box } from "@mui/material"
import ProfileLayout from "@components/templates/ProfileLayout"

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
