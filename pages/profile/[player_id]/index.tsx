import ProfileContent from "@components/molecules/profile/ProfileContent"
import ProfileLayout from "@components/template/ProfileLayout"
import GameStatOverview from "@feature/playerProfile/components/organisms/GameStatOverview"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { ReactElement } from "react"

const ProfilePage = () => (
  <article className="h-full w-full">
    <ProfileContent />
    <GameStatOverview />
  </article>
)

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}

export default ProfilePage
