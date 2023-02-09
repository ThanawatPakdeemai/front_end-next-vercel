import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import NotificationList from "@feature/notification/components/templates/notificationList/notificationList"
import ProfileLayout from "@components/template/ProfileLayout"

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
