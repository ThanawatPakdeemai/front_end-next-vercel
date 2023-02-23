import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { ReactElement } from "react"
import dynamic from "next/dynamic"

const ProfileContent = dynamic(
  () => import("@components/molecules/profile/ProfileContent")
)
const ProfileLayout = dynamic(
  () => import("@components/templates/ProfileLayout")
)
const GameStatOverview = dynamic(
  () => import("@feature/playerProfile/components/organisms/GameStatOverview")
)

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
