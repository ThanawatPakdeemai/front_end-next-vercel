import React, { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import GameDeveloperTemplate from "@components/templates/GameDeveloperTemplate"

const GameDeveloperPage = dynamic(
  () => import("@feature/page/GameDeveloperPage")
)

const GameDeveloper = () => <GameDeveloperPage />

GameDeveloper.getLayout = function getLayout(page: ReactElement) {
  return <GameDeveloperTemplate>{page}</GameDeveloperTemplate>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  // const mode = process.env.NEXT_PUBLIC_MODE
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
    // redirect: {
    //   destination: mode === "production" ? "/" : "/game-developer"
    // }
  }
}

export default GameDeveloper
