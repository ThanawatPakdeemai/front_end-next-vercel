import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import NotificationList from "@feature/notification/components/templates/notificationList/notificationList"
import GamePageLayout from "@components/template/GamePageLayout"

export default function PartnerGames() {
  return (
    <>
      <article className="h-full w-full">
        <NotificationList />
      </article>
    </>
  )
}

PartnerGames.getLayout = function getLayout(page: ReactElement) {
  return <GamePageLayout>{page}</GamePageLayout>
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
      // Will be passed to the page component as props
    }
  }
}
