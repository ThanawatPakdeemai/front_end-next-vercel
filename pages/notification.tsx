import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import NotificationList from "@feature/notification/components/organisms/NotificationList"
import ProfileLayout from "@components/template/ProfileLayout"
import { Box } from "@mui/material"

export default function PartnerGames() {
  return (
    <Box
      component="article"
      className="h-full w-full"
    >
      <NotificationList />
    </Box>
  )
}

PartnerGames.getLayout = function getLayout(page: ReactElement) {
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
